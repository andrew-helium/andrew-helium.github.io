export type VibePlatform = 'Claude' | 'Lovable' | 'v0' | 'Bolt' | 'Other';

export type PreviewStyle =
  | 'waveform'
  | 'network'
  | 'canvas'
  | 'dashboard'
  | 'spatial'
  | 'notebook';

export interface VibeProject {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: VibePlatform;
  author: string;
  category: string;
  promptNotes?: string;
  createdAt: string;
  previewStyle: PreviewStyle;
  featured?: boolean;
  isUserAdded?: boolean;
}

export function detectPlatformFromUrl(url: string): {
  platform: VibePlatform | null;
  suggestedTitle: string | null;
} {
  const trimmed = url.trim();
  if (!trimmed) {
    return { platform: null, suggestedTitle: null };
  }

  const lower = trimmed.toLowerCase();
  let platform: VibePlatform | null = null;

  if (lower.includes('claude.ai') || lower.includes('claude.site')) {
    platform = 'Claude';
  } else if (lower.includes('lovable.app') || lower.includes('lovable.dev') || lower.includes('gptengineer.app')) {
    platform = 'Lovable';
  } else if (lower.includes('v0.dev') || lower.includes('v0.app')) {
    platform = 'v0';
  } else if (lower.includes('bolt.new') || lower.includes('stackblitz.com')) {
    platform = 'Bolt';
  }

  let suggestedTitle: string | null = null;
  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    const hostParts = parsed.hostname.split('.');
    if (
      hostParts.length >= 3 &&
      (parsed.hostname.endsWith('lovable.app') || parsed.hostname.endsWith('vercel.app'))
    ) {
      const subdomain = hostParts[0];
      if (subdomain && subdomain !== 'www' && subdomain !== 'preview') {
        suggestedTitle = subdomain
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }
    }

    if (!suggestedTitle && parsed.pathname && parsed.pathname !== '/') {
      const segments = parsed.pathname.split('/').filter(Boolean);
      const lastSegment = segments[segments.length - 1];
      if (lastSegment && lastSegment.length > 3 && !/^[0-9a-f-]{16,}$/i.test(lastSegment)) {
        suggestedTitle = lastSegment
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }
    }
  } catch {
    // Ignore invalid URL during typing
  }

  return { platform, suggestedTitle };
}
