import React from 'react';

interface LogoProps {
  className?: string;
  theme?: 'light' | 'dark';
  instituteName?: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  theme = 'light',
  instituteName = 'AL-FAHAD IT',
  subtitle = 'COMPUTER TRAINING INSTITUTE',
  size = 'md',
}) => {
  const isDark = theme === 'dark';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
  };

  const titleSizes = {
    sm: 'text-base font-extrabold tracking-tight',
    md: 'text-lg sm:text-xl font-black tracking-tight',
    lg: 'text-2xl sm:text-3xl font-black tracking-tight',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] sm:text-[11px] tracking-wider font-semibold',
    lg: 'text-xs tracking-widest font-bold',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Geometric Quartered Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <div className="w-full h-full rounded-full overflow-hidden grid grid-cols-2 grid-rows-2 gap-[1.5px] p-[1px] bg-transparent">
          {/* Top Left: Lime Green quarter */}
          <div className="bg-[#76c013] rounded-tl-full shadow-inner" />
          {/* Top Right: Dark quadrant */}
          <div className={`${isDark ? 'bg-white' : 'bg-[#111827]'} rounded-tr-full`} />
          {/* Bottom Left: Lime Green quarter */}
          <div className="bg-[#76c013] rounded-bl-full" />
          {/* Bottom Right: Dark / Green accent */}
          <div className="bg-[#1f2937] rounded-br-full" />
        </div>
        {/* Subtle center ring divider */}
        <div className="absolute inset-0 rounded-full border border-lime-500/20 pointer-events-none" />
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`${titleSizes[size]} font-english ${
            isDark ? 'text-white' : 'text-[#76c013]'
          } transition-colors uppercase`}
        >
          {instituteName.includes(' ') ? (
            <>
              <span className={isDark ? 'text-white' : 'text-[#1e293b]'}>
                {instituteName.split(' ')[0]}{' '}
              </span>
              <span className="text-[#76c013]">{instituteName.split(' ').slice(1).join(' ')}</span>
            </>
          ) : (
            instituteName
          )}
        </span>
        <span
          className={`${subSizes[size]} font-english uppercase ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          } mt-0.5 tracking-wider`}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
};
