'use client';

import React from 'react';

interface MilestoneCoverArtProps {
  id: string;
  size?: 'hero' | 'card';
  className?: string;
}

export function MilestoneCoverArt({
  id,
  size = 'hero',
  className = '',
}: MilestoneCoverArtProps) {
  const isHero = size === 'hero';
  const containerClasses = isHero
    ? `relative w-full aspect-[21/9] sm:aspect-[2.5/1] max-h-56 overflow-hidden flex items-center justify-center select-none ${className}`
    : `relative w-full h-24 sm:h-28 overflow-hidden flex items-center justify-center select-none ${className}`;

  const renderArtwork = () => {
    switch (id) {
      case 'sic':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#07132e] via-[#0e2154] to-[#040b1d] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-60" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="sic-hex" width="36" height="36" patternUnits="userSpaceOnUse">
                  <polygon points="18,2 34,11 34,29 18,38 2,29 2,11" stroke="#0077FF" strokeWidth="0.75" strokeOpacity="0.4" fill="none" />
                </pattern>
                <linearGradient id="sic-line" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D2FF" />
                  <stop offset="50%" stopColor="#0066FF" />
                  <stop offset="100%" stopColor="#00F0FF" />
                </linearGradient>
                <radialGradient id="sic-glow-center" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#00D2FF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="600" height="240" fill="url(#sic-hex)" />
              <circle cx="300" cy="120" r="100" fill="url(#sic-glow-center)" />
              <g stroke="url(#sic-line)" strokeWidth="2" strokeLinecap="round">
                <line x1="80" y1="120" x2="180" y2="70" />
                <line x1="80" y1="120" x2="180" y2="170" />
                <line x1="180" y1="70" x2="300" y2="120" strokeWidth="2.5" />
                <line x1="180" y1="170" x2="300" y2="120" strokeWidth="2.5" />
                <line x1="300" y1="120" x2="420" y2="70" strokeWidth="2.5" />
                <line x1="300" y1="120" x2="420" y2="170" strokeWidth="2.5" />
                <line x1="420" y1="70" x2="520" y2="120" />
                <line x1="420" y1="170" x2="520" y2="120" />
                <line x1="180" y1="70" x2="180" y2="170" strokeDasharray="4 4" strokeOpacity="0.6" />
                <line x1="420" y1="70" x2="420" y2="170" strokeDasharray="4 4" strokeOpacity="0.6" />
              </g>
              <circle cx="80" cy="120" r="7" fill="#0077FF" filter="drop-shadow(0 0 6px #0077FF)" />
              <circle cx="180" cy="70" r="9" fill="#00D2FF" filter="drop-shadow(0 0 8px #00D2FF)" />
              <circle cx="180" cy="170" r="9" fill="#00D2FF" filter="drop-shadow(0 0 8px #00D2FF)" />
              <circle cx="300" cy="120" r="14" fill="#00F0FF" filter="drop-shadow(0 0 14px #00F0FF)" />
              <circle cx="300" cy="120" r="24" stroke="#00D2FF" strokeWidth="1.5" strokeDasharray="6 3" strokeOpacity="0.8" />
              <circle cx="420" cy="70" r="9" fill="#00D2FF" filter="drop-shadow(0 0 8px #00D2FF)" />
              <circle cx="420" cy="170" r="9" fill="#00D2FF" filter="drop-shadow(0 0 8px #00D2FF)" />
              <circle cx="520" cy="120" r="7" fill="#0077FF" filter="drop-shadow(0 0 6px #0077FF)" />
            </svg>
          </div>
        );

      case 'gci':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b172a] via-[#132742] to-[#081f1c] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-60" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <g stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.25">
                <line x1="50" y1="40" x2="550" y2="40" />
                <line x1="50" y1="90" x2="550" y2="90" />
                <line x1="50" y1="140" x2="550" y2="140" />
                <line x1="50" y1="190" x2="550" y2="190" />
                <line x1="100" y1="20" x2="100" y2="220" />
                <line x1="200" y1="20" x2="200" y2="220" />
                <line x1="300" y1="20" x2="300" y2="220" />
                <line x1="400" y1="20" x2="400" y2="220" />
                <line x1="500" y1="20" x2="500" y2="220" />
              </g>
              <path d="M40 190 C160 190, 200 50, 300 50 C400 50, 440 190, 560 190" stroke="#10B981" strokeWidth="3" fill="none" filter="drop-shadow(0 0 10px #10B981)" />
              <path d="M80 195 C180 195, 230 85, 300 85 C370 85, 420 195, 520 195" stroke="#38BDF8" strokeWidth="2" strokeDasharray="5 4" fill="none" />
              <g fill="#10B981" opacity="0.8">
                <circle cx="160" cy="150" r="4" />
                <circle cx="210" cy="115" r="4" />
                <circle cx="250" cy="80" r="4" />
                <circle cx="300" cy="50" r="6" filter="drop-shadow(0 0 8px #10B981)" />
                <circle cx="350" cy="80" r="4" />
                <circle cx="390" cy="115" r="4" />
                <circle cx="440" cy="150" r="4" />
              </g>
              <path d="M260 30 L250 30 L250 210 L260 210" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.7" fill="none" />
              <path d="M340 30 L350 30 L350 210 L340 210" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.7" fill="none" />
            </svg>
          </div>
        );

      case 'programming-advices':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#060b14] via-[#0b1322] to-[#041411] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-60" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <rect x="120" y="35" width="360" height="170" rx="12" stroke="#00F0FF" strokeWidth="1.5" strokeOpacity="0.4" fill="#000" fillOpacity="0.3" />
              <circle cx="140" cy="55" r="4" fill="#EF4444" />
              <circle cx="152" cy="55" r="4" fill="#F59E0B" />
              <circle cx="164" cy="55" r="4" fill="#10B981" />
              <line x1="120" y1="70" x2="480" y2="70" stroke="#00F0FF" strokeWidth="0.75" strokeOpacity="0.3" />
              <rect x="145" y="90" width="70" height="6" rx="3" fill="#00F0FF" fillOpacity="0.8" />
              <rect x="225" y="90" width="110" height="6" rx="3" fill="#10B981" fillOpacity="0.6" />
              <rect x="165" y="110" width="90" height="6" rx="3" fill="#38BDF8" fillOpacity="0.7" />
              <rect x="265" y="110" width="140" height="6" rx="3" fill="#A855F7" fillOpacity="0.6" />
              <rect x="165" y="130" width="130" height="6" rx="3" fill="#10B981" fillOpacity="0.7" />
              <rect x="145" y="150" width="50" height="6" rx="3" fill="#00F0FF" fillOpacity="0.8" />
              <path d="M40 120 L100 120 M500 120 L560 120" stroke="#00F0FF" strokeWidth="2" strokeDasharray="4 3" />
            </svg>
          </div>
        );

      case 'napta-award':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#041f15] via-[#073624] to-[#02130d] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-65" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <path d="M300 20 C230 80, 210 160, 300 220 C390 160, 370 80, 300 20 Z" stroke="#10B981" strokeWidth="2.5" fill="#10B981" fillOpacity="0.08" filter="drop-shadow(0 0 10px #10B981)" />
              <line x1="300" y1="20" x2="300" y2="220" stroke="#34D399" strokeWidth="1.5" />
              <path d="M300 70 Q260 100, 240 120 M300 70 Q340 100, 360 120" stroke="#34D399" strokeWidth="1" strokeOpacity="0.7" />
              <path d="M300 120 Q250 145, 235 170 M300 120 Q350 145, 365 170" stroke="#34D399" strokeWidth="1" strokeOpacity="0.7" />
              <path d="M220 50 L200 50 L200 70 M380 50 L400 50 L400 70 M220 190 L200 190 L200 170 M380 190 L400 190 L400 170" stroke="#34D399" strokeWidth="2.5" filter="drop-shadow(0 0 8px #34D399)" />
              <circle cx="300" cy="120" r="50" stroke="#34D399" strokeWidth="1" strokeDasharray="8 6" strokeOpacity="0.6" />
              <circle cx="300" cy="120" r="5" fill="#34D399" />
            </svg>
          </div>
        );

      case 'rawafid-first':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#2e1302] via-[#522507] to-[#1c0a00] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-65" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <circle cx="300" cy="120" r="95" stroke="#F59E0B" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.5" />
              <path d="M210 120 C210 70, 250 40, 300 40 C350 40, 390 70, 390 120 C390 170, 350 200, 300 200 C250 200, 210 170, 210 120 Z" stroke="#FBBF24" strokeWidth="2" fill="#F59E0B" fillOpacity="0.1" filter="drop-shadow(0 0 12px #F59E0B)" />
              <path d="M240 140 Q300 110, 300 170 Q300 110, 360 140" stroke="#FDE68A" strokeWidth="3" fill="none" />
              <path d="M240 125 Q300 95, 300 155 Q300 95, 360 125" stroke="#FBBF24" strokeWidth="2" fill="none" />
              <circle cx="300" cy="85" r="14" fill="#FDE68A" filter="drop-shadow(0 0 10px #FDE68A)" />
              <polygon points="300,74 303,82 311,82 305,87 307,95 300,90 293,95 295,87 289,82 297,82" fill="#78350F" />
            </svg>
          </div>
        );

      case 'academic-first-rank':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#091533] via-[#14285e] to-[#050c20] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-60" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <polygon points="300,35 380,80 380,165 300,210 220,165 220,80" stroke="#FBBF24" strokeWidth="2.5" fill="#3B82F6" fillOpacity="0.1" filter="drop-shadow(0 0 12px #FBBF24)" />
              <polygon points="300,55 360,90 360,155 300,190 240,155 240,90" stroke="#60A5FA" strokeWidth="1" strokeDasharray="5 3" fill="none" />
              <circle cx="300" cy="122" r="28" stroke="#FBBF24" strokeWidth="2" fill="#FBBF24" fillOpacity="0.2" />
              <path d="M290 122 L297 129 L312 114" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );

      case 'ml-spec':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#2b0505] via-[#521111] to-[#170303] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-65" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <g stroke="#EF4444" strokeWidth="1.5">
                <line x1="160" y1="70" x2="260" y2="100" />
                <line x1="160" y1="120" x2="260" y2="100" />
                <line x1="160" y1="170" x2="260" y2="145" />
                <line x1="260" y1="100" x2="360" y2="120" strokeWidth="2" />
                <line x1="260" y1="145" x2="360" y2="120" strokeWidth="2" />
                <line x1="360" y1="120" x2="450" y2="120" strokeWidth="2.5" />
              </g>
              <circle cx="160" cy="70" r="7" fill="#F87171" />
              <circle cx="160" cy="120" r="7" fill="#F87171" />
              <circle cx="160" cy="170" r="7" fill="#F87171" />
              <circle cx="260" cy="100" r="10" fill="#EF4444" />
              <circle cx="260" cy="145" r="10" fill="#EF4444" />
              <circle cx="360" cy="120" r="14" fill="#F97316" filter="drop-shadow(0 0 10px #F97316)" />
              <circle cx="450" cy="120" r="16" fill="#FBBF24" filter="drop-shadow(0 0 12px #FBBF24)" />
            </svg>
          </div>
        );

      case 'fastapi-cert':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#032e26] via-[#06423c] to-[#041a29] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-65" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <circle cx="300" cy="120" r="65" stroke="#00D2B4" strokeWidth="1.5" strokeDasharray="8 4" strokeOpacity="0.5" />
              <polygon points="310,40 270,120 315,120 285,200 350,110 305,110" fill="#00D2B4" filter="drop-shadow(0 0 16px #00D2B4)" />
              <rect x="140" y="85" width="60" height="70" rx="8" stroke="#2496ED" strokeWidth="2" fill="#2496ED" fillOpacity="0.15" />
              <rect x="400" y="85" width="60" height="70" rx="8" stroke="#2496ED" strokeWidth="2" fill="#2496ED" fillOpacity="0.15" />
              <line x1="200" y1="120" x2="260" y2="120" stroke="#00D2B4" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="350" y1="120" x2="400" y2="120" stroke="#00D2B4" strokeWidth="2" strokeDasharray="4 2" />
            </svg>
          </div>
        );

      case 'aws-scholarship':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#131b26] via-[#1f2937] to-[#2e1502] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-60" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <g stroke="#FF9900" strokeWidth="1.75">
                <polygon points="300,45 355,75 355,140 300,170 245,140 245,75" fill="#FF9900" fillOpacity="0.12" filter="drop-shadow(0 0 10px #FF9900)" />
                <polygon points="180,95 220,118 220,165 180,188 140,165 140,118" fill="none" opacity="0.6" />
                <polygon points="420,95 460,118 460,165 420,188 380,165 380,118" fill="none" opacity="0.6" />
                <line x1="220" y1="140" x2="245" y2="120" />
                <line x1="355" y1="120" x2="380" y2="140" />
              </g>
              <circle cx="300" cy="108" r="10" fill="#FF9900" filter="drop-shadow(0 0 12px #FF9900)" />
            </svg>
          </div>
        );

      case 'mckinsey-forward':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#000f24] via-[#001c3d] to-[#020b17] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-60" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <polygon points="300,35 385,120 300,205 215,120" stroke="#60A5FA" strokeWidth="2.5" fill="#3B82F6" fillOpacity="0.12" filter="drop-shadow(0 0 14px #3B82F6)" />
              <polygon points="300,65 355,120 300,175 245,120" stroke="#93C5FD" strokeWidth="1" strokeDasharray="4 3" fill="none" />
              <circle cx="300" cy="120" r="12" fill="#60A5FA" filter="drop-shadow(0 0 8px #60A5FA)" />
              <line x1="130" y1="120" x2="215" y2="120" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="385" y1="120" x2="470" y2="120" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="6 4" />
            </svg>
          </div>
        );

      case 'huawei':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#26040b] via-[#50072b] to-[#130521] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-60" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <circle cx="300" cy="120" r="85" stroke="#F43F5E" strokeWidth="2" strokeDasharray="6 4" filter="drop-shadow(0 0 10px #F43F5E)" />
              <ellipse cx="300" cy="120" rx="85" ry="32" stroke="#EC4899" strokeWidth="1.5" />
              <ellipse cx="300" cy="120" rx="32" ry="85" stroke="#EC4899" strokeWidth="1.5" />
              <circle cx="235" cy="85" r="7" fill="#F43F5E" filter="drop-shadow(0 0 8px #F43F5E)" />
              <circle cx="365" cy="155" r="7" fill="#A855F7" filter="drop-shadow(0 0 8px #A855F7)" />
              <circle cx="300" cy="120" r="9" fill="#FBBF24" filter="drop-shadow(0 0 10px #FBBF24)" />
            </svg>
          </div>
        );

      case 'vol-ai-media':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1f0945] via-[#35126d] to-[#0a0e1c] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-65" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <circle cx="300" cy="120" r="75" stroke="#A855F7" strokeWidth="2" fill="#7C3AED" fillOpacity="0.1" filter="drop-shadow(0 0 12px #A855F7)" />
              <circle cx="300" cy="120" r="48" stroke="#C084FC" strokeWidth="2" strokeDasharray="6 4" />
              <circle cx="300" cy="120" r="22" fill="#A855F7" filter="drop-shadow(0 0 10px #A855F7)" />
              <g stroke="#06B6D4" strokeWidth="2" strokeLinecap="round">
                <line x1="80" y1="120" x2="80" y2="100" />
                <line x1="105" y1="120" x2="105" y2="85" />
                <line x1="130" y1="120" x2="130" y2="110" />
                <line x1="155" y1="120" x2="155" y2="80" />
                <line x1="445" y1="120" x2="445" y2="80" />
                <line x1="470" y1="120" x2="470" y2="110" />
                <line x1="495" y1="120" x2="495" y2="85" />
                <line x1="520" y1="120" x2="520" y2="100" />
              </g>
            </svg>
          </div>
        );

      case 'vol-school-library':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#2e1102] via-[#522405] to-[#140600] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-65" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <path d="M220 150 Q300 120, 300 185 Q300 120, 380 150 L380 90 Q300 60, 300 125 Q300 60, 220 90 Z" stroke="#FBBF24" strokeWidth="2.5" fill="#F59E0B" fillOpacity="0.15" filter="drop-shadow(0 0 12px #F59E0B)" />
              <line x1="300" y1="65" x2="300" y2="185" stroke="#FDE68A" strokeWidth="2" />
              <g stroke="#F59E0B" strokeWidth="2" opacity="0.6">
                <line x1="110" y1="190" x2="110" y2="60" />
                <line x1="135" y1="190" x2="135" y2="50" />
                <line x1="160" y1="190" x2="160" y2="70" />
                <line x1="440" y1="190" x2="440" y2="70" />
                <line x1="465" y1="190" x2="465" y2="50" />
                <line x1="490" y1="190" x2="490" y2="60" />
              </g>
            </svg>
          </div>
        );

      case 'vol-khalouha-ajmal':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#021f1d] via-[#08453f] to-[#021211] flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-65" viewBox="0 0 600 240" fill="none" preserveAspectRatio="xMidYMid slice">
              <path d="M285 190 L285 70 L300 35 L315 70 L315 190 Z" stroke="#14B8A6" strokeWidth="2" fill="#14B8A6" fillOpacity="0.2" filter="drop-shadow(0 0 10px #14B8A6)" />
              <circle cx="300" cy="28" r="5" fill="#FBBF24" filter="drop-shadow(0 0 8px #FBBF24)" />
              <path d="M150 195 Q300 135, 450 195" stroke="#2DD4BF" strokeWidth="2.5" fill="none" />
              <circle cx="300" cy="115" r="45" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.5" />
            </svg>
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-card via-surface to-accent/15 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-accent/20 blur-xl" />
          </div>
        );
    }
  };

  return (
    <div className={containerClasses}>
      {renderArtwork()}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/15 to-transparent pointer-events-none" />
    </div>
  );
}
