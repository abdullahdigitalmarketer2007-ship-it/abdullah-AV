import React, { useEffect, useRef, useState } from 'react';
import { Bot, Loader2, RotateCcw, Send, X } from 'lucide-react';
import type { StoreStrings } from '../data/storeStrings';
import type { ChatMessage, Product, StoreLanguage, StoreProfile } from '../types/store';

interface AiChatAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: StoreLanguage;
  strings: StoreStrings['ai'];
  profile: StoreProfile;
  focusedProduct: Product | null;
  onClearFocusedProduct: () => void;
  pendingPrompt: string | null;
  onConsumePendingPrompt: () => void;
}

function renderFormattedText(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={lineIdx} className={lineIdx > 0 ? 'mt-1.5 block' : 'block'}>
        {parts.map((part, partIdx) => {
          if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
            return (
              <strong key={partIdx} className="font-semibold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <React.Fragment key={partIdx}>{part}</React.Fragment>;
        })}
      </span>
    );
  });
}

export const AiChatAssistant: React.FC<AiChatAssistantProps> = ({
  open,
  onOpenChange,
  language,
  strings,
  profile,
  focusedProduct,
  onClearFocusedProduct,
  pendingPrompt,
  onConsumePendingPrompt,
}) => {
  const storeName = language === 'bn' ? profile.storeNameBn : profile.storeNameEn;
  const ownerName = language === 'bn' ? profile.ownerNameBn : profile.ownerNameEn;

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'model',
      text: strings.welcomeMessage(storeName, ownerName),
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const scrollEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Refresh welcome message if chat hasn't started yet and language/profile updates
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [
          {
            id: 'welcome',
            role: 'model',
            text: strings.welcomeMessage(storeName, ownerName),
          },
        ];
      }
      return prev;
    });
  }, [storeName, ownerName, strings]);

  useEffect(() => {
    if (open) {
      scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open, messages]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || isStreaming) return;

    const productContextTitle = focusedProduct
      ? language === 'bn'
        ? focusedProduct.nameBn
        : focusedProduct.nameEn
      : undefined;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      productRefName: productContextTitle,
    };

    const assistantMsgId = `m-${Date.now() + 1}`;
    const historySnapshot = messages
      .filter((m) => m.id !== 'welcome' && !m.isError)
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantMsgId, role: 'model', text: '' },
    ]);
    setInput('');
    setIsStreaming(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historySnapshot,
          focusedProductId: focusedProduct?.id,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!response.ok || !contentType.includes('text/event-stream')) {
        const errPayload = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        const msg = errPayload?.message || `AI assistant error (${response.status})`;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMsgId ? { ...m, text: msg, isError: true } : m))
        );
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? { ...m, text: 'Stream unavailable from server.', isError: true }
              : m
          )
        );
        return;
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() || '';

        for (const evt of events) {
          const line = evt.trim();
          if (!line.startsWith('data:')) continue;
          const jsonStr = line.slice(5).trim();
          if (!jsonStr) continue;
          try {
            const parsed = JSON.parse(jsonStr) as {
              chunk?: string;
              done?: boolean;
              error?: string;
            };
            if (parsed.error) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId ? { ...m, text: parsed.error as string, isError: true } : m
                )
              );
              return;
            }
            if (parsed.chunk) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId ? { ...m, text: m.text + parsed.chunk } : m
                )
              );
            }
          } catch {
            // Ignore malformed keepalive fragments
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                text: 'Connection error while reaching the AI assistant. Please try again.',
                isError: true,
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  // Trigger automated question when user clicks "Ask AI" from a product or store card
  useEffect(() => {
    if (open && pendingPrompt && !isStreaming) {
      const promptToSend = pendingPrompt;
      onConsumePendingPrompt();
      void sendMessage(promptToSend);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pendingPrompt]);

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: strings.welcomeMessage(storeName, ownerName),
      },
    ]);
  };

  return (
    <>
      {/* Compact Floating Launcher Button (Well within 15% mobile height cap) */}
      {!open ? (
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          aria-label={strings.fabLabel}
          className="fixed bottom-5 right-5 z-40 inline-flex h-12 items-center gap-2 rounded-xl bg-[#1D4ED8] px-4 text-sm font-semibold text-white shadow-lg transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#1E40AF] cursor-pointer"
        >
          <Bot className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="whitespace-nowrap">{strings.fabLabel}</span>
        </button>
      ) : null}

      {/* Expandable Live AI Chat Window */}
      {open ? (
        <aside
          role="dialog"
          aria-modal="false"
          aria-labelledby="ai-assistant-title"
          className="fixed bottom-4 right-4 z-50 flex h-[min(600px,82vh)] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-2xl dark:border-[#1E293B] dark:bg-[#111B2E]"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3.5 dark:border-[#1E293B] dark:bg-[#0F172A]">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1D4ED8] text-white">
                <Bot className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <h2
                  id="ai-assistant-title"
                  className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]"
                >
                  {strings.title}
                </h2>
                <p className="text-[11px] text-[#52627A] dark:text-[#94A3B8]">{strings.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                title={strings.clearChat}
                aria-label={strings.clearChat}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#52627A] hover:bg-[#E2E8F0]/60 hover:text-[#142033] dark:text-[#94A3B8] dark:hover:bg-[#1E293B] dark:hover:text-[#F1F5F9] cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label={strings.close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#52627A] hover:bg-[#E2E8F0]/60 hover:text-[#142033] dark:text-[#94A3B8] dark:hover:bg-[#1E293B] dark:hover:text-[#F1F5F9] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Focused Product Context Indicator */}
          {focusedProduct ? (
            <div className="flex items-center justify-between gap-2 border-b border-[#E2E8F0] bg-[#1D4ED8]/5 px-4 py-2 text-xs dark:border-[#1E293B] dark:bg-[#60A5FA]/10">
              <p className="truncate text-[#142033] dark:text-[#F1F5F9]">
                <span className="font-semibold text-[#1D4ED8] dark:text-[#60A5FA]">
                  {strings.focusedBanner}{' '}
                </span>
                <span>{language === 'bn' ? focusedProduct.nameBn : focusedProduct.nameEn}</span>
              </p>
              <button
                type="button"
                onClick={onClearFocusedProduct}
                className="shrink-0 font-semibold text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9] cursor-pointer"
              >
                {strings.clearFocus}
              </button>
            </div>
          ) : null}

          {/* Message Feed */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#1D4ED8] text-white'
                        : msg.isError
                        ? 'border border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300'
                        : 'border border-[#E2E8F0] bg-[#F8FAFC] text-[#142033] dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#F1F5F9]'
                    }`}
                  >
                    {msg.text ? (
                      renderFormattedText(msg.text)
                    ) : (
                      <span className="inline-flex items-center gap-2 text-xs text-[#52627A] dark:text-[#94A3B8]">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>{strings.thinkingLabel}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Starter Suggestions (shown cleanly at start) */}
            {messages.length <= 1 && !isStreaming ? (
              <div className="pt-2">
                <div className="flex flex-col gap-1.5">
                  {strings.starterQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void sendMessage(q)}
                      className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-left text-xs font-medium text-[#142033] transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8] cursor-pointer dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div ref={scrollEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage(input);
            }}
            className="flex items-center gap-2 border-t border-[#E2E8F0] bg-[#F8FAFC] p-3 dark:border-[#1E293B] dark:bg-[#0F172A]"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              disabled={isStreaming}
              onChange={(e) => setInput(e.target.value)}
              placeholder={strings.inputPlaceholder}
              aria-label={strings.inputPlaceholder}
              className="min-h-[42px] flex-1 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 text-sm text-[#142033] placeholder:text-[#52627A] focus:border-[#1D4ED8] focus:outline-none disabled:opacity-60 dark:border-[#334155] dark:bg-[#111B2E] dark:text-[#F1F5F9] dark:placeholder:text-[#94A3B8] dark:focus:border-[#60A5FA]"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              aria-label={strings.sendLabel}
              className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[#1D4ED8] text-white transition-colors hover:bg-[#1E40AF] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isStreaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        </aside>
      ) : null}
    </>
  );
};
