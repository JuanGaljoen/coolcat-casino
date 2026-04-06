import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SlotReview } from '../types';

const SANITY_API_VERSION = '2024-01-01';

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET ?? 'production',
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// ─── GROQ Queries ─────────────────────────────────────────────────────────────

export async function getSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(`*[_type == "slotReview" && defined(slug.current)]{ slug }`);
}

export async function getSlotBySlug(slug: string): Promise<SlotReview | null> {
  return client.fetch(
    `*[_type == "slotReview" && slug.current == $slug][0]{
      _id, title, slug, provider, rtp, volatility,
      minBet, maxBet, maxWin, rating, verdict,
      heroImage{ asset, alt },
      pros, cons, body, affiliateUrl,
      publishedAt, updatedAt, featured
    }`,
    { slug }
  );
}

export async function getFeaturedSlots(limit: number = 6): Promise<SlotReview[]> {
  return client.fetch(
    `*[_type == "slotReview" && featured == true] | order(rating desc) [0..$limit]{
      _id, title, slug, provider, rtp, volatility,
      rating, verdict, heroImage{ asset, alt }, affiliateUrl
    }`,
    { limit: limit - 1 }
  );
}

export async function getAllSlots(): Promise<SlotReview[]> {
  return client.fetch(
    `*[_type == "slotReview"] | order(rating desc){
      _id, title, slug, provider, rtp, volatility,
      minBet, maxBet, maxWin, rating, verdict,
      heroImage{ asset, alt }, affiliateUrl, publishedAt, updatedAt, featured
    }`
  );
}
