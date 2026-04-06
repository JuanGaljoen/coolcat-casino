import type { PortableTextBlock } from '@portabletext/types';

export type Volatility = 'low' | 'medium' | 'high' | 'very-high';

export const VOLATILITY_LABELS: Record<Volatility, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  'very-high': 'Very High',
};

export interface SlotReview {
  _id: string;
  title: string;
  slug: { current: string };
  provider: string;
  rtp: number;
  volatility: Volatility;
  minBet: number;
  maxBet: number;
  maxWin: number;
  rating: number;
  verdict: string;
  heroImage: { asset: { _ref: string }; alt?: string };
  pros: string[];
  cons: string[];
  body: PortableTextBlock[];
  affiliateUrl: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
}
