# CoolCat Casino — Claude Code context

## Project overview
Affiliate marketing site for slot machine reviews. Built with Astro + Sanity + Vercel.
Primary goal: SEO-first, fast-loading, editorial affiliate site that ranks for slot review keywords.

## Tech stack
- **Framework:** Astro (static output, SSG)
- **CMS:** Sanity v3 (content lake, GROQ queries)
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel (astro adapter)
- **Images:** Astro built-in <Image /> component + Sanity image pipeline
- **Package manager:** pnpm

## Design system
- **Aesthetic:** Minimal, editorial, content-first. Think Wirecutter meets a clean tech blog.
- **Colours:** White base. Single accent — use CSS variable `--color-accent` (default: #E5622A, a warm amber-orange). Neutral grays for UI chrome.
- **Typography:** System font stack for body (`font-sans`). No decorative display fonts.
- **Spacing:** Generous whitespace. 8px base unit. Max content width 740px for article pages, 1100px for listing/comparison pages.
- **No dark mode** (keep it simple for v1).
- **No animations** beyond subtle hover states (opacity/underline). Speed over flair.

## Sanity schema — slot review
Each slot machine document has these fields. Always use these exact field names:

```
slotReview {
  title: string           // "Book of Dead"
  slug: slug              // auto-generated from title
  provider: string        // "Play'n GO"
  rtp: number             // 96.21 (stored as float, displayed as "96.21%")
  volatility: "low" | "medium" | "high" | "very-high"
  minBet: number          // 0.10
  maxBet: number          // 100
  maxWin: number          // multiplier e.g. 5000 (displayed as "5,000x")
  rating: number          // 1–5, one decimal e.g. 4.5
  verdict: string         // one-sentence summary for meta description + card subtitle
  heroImage: image        // Sanity image with alt text
  pros: array of string
  cons: array of string
  body: portableText      // full review content
  affiliateUrl: string    // tracked outbound link
  publishedAt: datetime
  updatedAt: datetime
  featured: boolean
}
```

## Content conventions
- Every page must have a hand-written `` pulled from `verdict` field. Never auto-generate it.
- Use `updatedAt` (not `publishedAt`) in the visible "Last updated" timestamp on review pages — Google values freshness signals.
- All affiliate links must have `rel="nofollow noopener sponsored"` and `target="_blank"`.
- Affiliate disclosure banner must appear above the fold on every review page. Text: "This page contains affiliate links. We may earn a commission at no extra cost to you."
- JSON-LD structured data (Review schema) on every slot review page — use `rating`, `rtp`, and `provider` fields.

## SEO rules — enforce these always
- `