import React from 'react';

interface BrandMarkProps {
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ className = 'w-7 h-7' }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-[7px] dark:ring-1 dark:ring-white/15 ${className}`}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="#142033" />
      <circle cx="13.5" cy="13.5" r="5.5" stroke="#FFFFFF" strokeWidth="2.1" />
      <path
        d="M17.8 17.8L23.5 23.5"
        stroke="#0F766E"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M20.5 9.5H24.5V13.5"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24.5" cy="9.5" r="1.5" fill="#0F766E" />
    </svg>
  );
};
