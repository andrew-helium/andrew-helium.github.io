import React from 'react';
import { PreviewStyle, VibePlatform } from '../types/project';

interface ProjectPreviewArtProps {
  style: PreviewStyle;
  platform: VibePlatform;
  className?: string;
}

export const ProjectPreviewArt: React.FC<ProjectPreviewArtProps> = ({
  style,
  platform,
  className = '',
}) => {
  const accentStroke =
    platform === 'Claude'
      ? '#D97757'
      : platform === 'Lovable'
      ? '#E11D48'
      : '#2563EB';

  const bgGradient =
    style === 'spatial'
      ? 'from-blue-50/90 via-indigo-50/50 to-amber-50/60'
      : style === 'waveform'
      ? 'from-orange-50/90 via-amber-50/50 to-rose-50/50'
      : style === 'canvas'
      ? 'from-rose-50/80 via-pink-50/40 to-amber-50/60'
      : style === 'network'
      ? 'from-emerald-50/80 via-teal-50/40 to-amber-50/50'
      : style === 'dashboard'
      ? 'from-sky-50/80 via-blue-50/40 to-slate-50/70'
      : 'from-amber-50/80 via-orange-50/40 to-stone-100/70';

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${bgGradient} flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      {/* Subtle studio dot grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
         xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`dots-${style}-${platform}`}
            x="0"
            y="0"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#A1A1AA" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${style}-${platform})`} />
      </svg>

      {style === 'spatial' && (
        <svg viewBox="0 0 320 180" className="relative z-10 w-full h-full p-5">
          <rect
            x="24"
            y="20"
            width="272"
            height="140"
            rx="12"
            fill="#FFFFFF"
            fillOpacity="0.88"
            stroke="#E4E4E7"
            strokeWidth="1.5"
          />
          {/* Topographic thermal contours */}
          <ellipse
            cx="135"
            cy="92"
            rx="76"
            ry="44"
            fill="#DBEAFE"
            fillOpacity="0.6"
            stroke="#3B82F6"
            strokeWidth="1.25"
            strokeDasharray="4 3"
          />
          <ellipse
            cx="142"
            cy="92"
            rx="50"
            ry="29"
            fill="#FDE68A"
            fillOpacity="0.65"
            stroke="#F59E0B"
            strokeWidth="1.25"
          />
          <ellipse
            cx="148"
            cy="92"
            rx="24"
            ry="15"
            fill="#FECDD3"
            fillOpacity="0.85"
            stroke={accentStroke}
            strokeWidth="1.5"
          />
          <circle cx="148" cy="92" r="4" fill={accentStroke} />
          <circle cx="94" cy="74" r="3.5" fill="#2563EB" />
          <circle cx="225" cy="64" r="3.5" fill="#10B981" />
          <rect x="218" y="106" width="60" height="36" rx="6" fill="#F4F4F5" />
          <line x1="226" y1="118" x2="264" y2="118" stroke="#52525B" strokeWidth="2" strokeLinecap="round" />
          <line x1="226" y1="129" x2="252" y2="129" stroke={accentStroke} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {style === 'waveform' && (
        <svg viewBox="0 0 320 180" className="relative z-10 w-full h-full p-5">
          <rect
            x="24"
            y="20"
            width="272"
            height="140"
            rx="12"
            fill="#FFFFFF"
            fillOpacity="0.9"
            stroke="#E4E4E7"
            strokeWidth="1.5"
          />
          {/* Spectrogram harmonic bars */}
          {[
            28, 48, 36, 72, 94, 64, 42, 86, 102, 74, 52, 38, 66, 88, 58, 34, 46,
            26,
          ].map((h, i) => (
            <rect
              key={i}
              x={44 + i * 13}
              y={92 - h / 2}
              width="7"
              height={h}
              rx="3.5"
              fill={i % 4 === 0 ? accentStroke : i % 2 === 0 ? '#F59E0B' : '#E4E4E7'}
              fillOpacity={i % 4 === 0 ? '0.9' : '0.75'}
            />
          ))}
          <line
            x1="152"
            y1="30"
            x2="152"
            y2="150"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
      )}

      {style === 'canvas' && (
        <svg viewBox="0 0 320 180" className="relative z-10 w-full h-full p-5">
          <rect
            x="24"
            y="20"
            width="272"
            height="140"
            rx="12"
            fill="#FFFFFF"
            fillOpacity="0.9"
            stroke="#E4E4E7"
            strokeWidth="1.5"
          />
          {/* Street grid & participatory blocks */}
          <path
            d="M 48 92 Q 120 55, 175 92 T 272 78"
            fill="none"
            stroke={accentStroke}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect x="64" y="42" width="52" height="28" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.2" />
          <rect x="192" y="106" width="64" height="32" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
          <circle cx="118" cy="76" r="7" fill="#10B981" fillOpacity="0.25" stroke="#10B981" strokeWidth="1.5" />
          <circle cx="175" cy="92" r="7" fill={accentStroke} />
          <circle cx="238" cy="84" r="6" fill="#2563EB" />
        </svg>
      )}

      {style === 'network' && (
        <svg viewBox="0 0 320 180" className="relative z-10 w-full h-full p-5">
          <rect
            x="24"
            y="20"
            width="272"
            height="140"
            rx="12"
            fill="#FFFFFF"
            fillOpacity="0.9"
            stroke="#E4E4E7"
            strokeWidth="1.5"
          />
          <g stroke="#CBD5E1" strokeWidth="1.75">
            <line x1="160" y1="90" x2="96" y2="54" />
            <line x1="160" y1="90" x2="224" y2="58" />
            <line x1="160" y1="90" x2="108" y2="128" />
            <line x1="160" y1="90" x2="216" y2="126" />
            <line x1="96" y1="54" x2="62" y2="82" />
            <line x1="224" y1="58" x2="258" y2="92" />
          </g>
          <circle cx="160" cy="90" r="11" fill={accentStroke} />
          <circle cx="96" cy="54" r="7" fill="#10B981" />
          <circle cx="224" cy="58" r="8" fill="#2563EB" />
          <circle cx="108" cy="128" r="6.5" fill="#F59E0B" />
          <circle cx="216" cy="126" r="7" fill="#10B981" />
          <circle cx="62" cy="82" r="5" fill="#64748B" />
          <circle cx="258" cy="92" r="5" fill="#64748B" />
        </svg>
      )}

      {style === 'dashboard' && (
        <svg viewBox="0 0 320 180" className="relative z-10 w-full h-full p-5">
          <rect
            x="24"
            y="20"
            width="272"
            height="140"
            rx="12"
            fill="#FFFFFF"
            fillOpacity="0.9"
            stroke="#E4E4E7"
            strokeWidth="1.5"
          />
          <rect x="42" y="38" width="110" height="46" rx="8" fill="#F4F4F5" />
          <rect x="54" y="50" width="48" height="6" rx="3" fill={accentStroke} />
          <rect x="54" y="64" width="76" height="6" rx="3" fill="#D4D4D8" />

          <rect x="166" y="38" width="112" height="46" rx="8" fill="#EFF6FF" />
          <rect x="178" y="50" width="56" height="6" rx="3" fill="#2563EB" />
          <rect x="178" y="64" width="84" height="6" rx="3" fill="#BFDBFE" />

          <rect x="42" y="96" width="236" height="46" rx="8" fill="#FAFAFA" stroke="#E4E4E7" />
          <rect x="56" y="114" width="145" height="10" rx="5" fill="#10B981" fillOpacity="0.8" />
          <circle cx="252" cy="119" r="8" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
        </svg>
      )}

      {style === 'notebook' && (
        <svg viewBox="0 0 320 180" className="relative z-10 w-full h-full p-5">
          <rect
            x="24"
            y="20"
            width="272"
            height="140"
            rx="12"
            fill="#FFFFFF"
            fillOpacity="0.9"
            stroke="#E4E4E7"
            strokeWidth="1.5"
          />
          <rect x="44" y="40" width="70" height="96" rx="8" fill="#FEF3C7" stroke="#FDE68A" />
          <line x1="56" y1="58" x2="98" y2="58" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="56" y1="72" x2="90" y2="72" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

          <rect x="125" y="40" width="70" height="96" rx="8" fill="#FCE7F3" stroke="#FBCFE8" />
          <line x1="137" y1="58" x2="179" y2="58" stroke={accentStroke} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="137" y1="72" x2="170" y2="72" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />

          <rect x="206" y="40" width="70" height="96" rx="8" fill="#DBEAFE" stroke="#BFDBFE" />
          <line x1="218" y1="58" x2="260" y2="58" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="218" y1="72" x2="250" y2="72" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};
