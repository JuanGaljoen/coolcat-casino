export interface SlotReview {
  _id: string;
  title: string;
  slug: { current: string };
  provider: string;
  rtp: number;
  volatility: 'low' | 'medium' | 'high' | 'very-high';
  minBet: number;
  maxBet: number;
  maxWin: number;
  rating: number;
  verdict: string;
  heroImage: { asset: { _ref: string }; alt?: string };
  pros: string[];
  cons: string[];
  body: unknown; // Portable Text blocks
  affiliateUrl: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
}
