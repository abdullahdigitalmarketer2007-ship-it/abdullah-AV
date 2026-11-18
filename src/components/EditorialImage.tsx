import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  aspectClass?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  fallbackTitle?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  aspectClass = 'aspect-video',
  className = '',
  imgClassName = 'w-full h-full object-cover',
  priority = false,
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#EEF2F7] via-[#F8FAFC] to-[#E6F4F1] dark:from-[#111B2E] dark:via-[#0F172A] dark:to-[#0F2928] ${aspectClass} ${className}`}
    >
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onError={() => setHasError(true)}
          className={imgClassName}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-[#52627A] dark:text-[#94A3B8]">
          <Compass className="h-7 w-7 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
          {fallbackTitle ? (
            <span className="text-sm font-medium text-[#142033] dark:text-[#F1F5F9]">
              {fallbackTitle}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
};
