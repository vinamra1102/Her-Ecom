# workflow
- Run `npm run typecheck`, `npm run lint`, and `npm run build` after making code changes to verify nothing is broken. Confidence: 0.75
- After completing a set of changes, produce a summary listing every file touched with a one-line reason and the exact commands run to verify. Confidence: 0.75

# architecture
- Use CSS variables for all theming/color values instead of hardcoded hex colors, so future rebrands only require editing one file. Confidence: 0.80
- Do not hand-edit files inside components/ui/* or hooks/use-toast.ts — these vendored shadcn/ui primitives theme themselves entirely through CSS variables. Confidence: 0.80

# fonts
- Load fonts via next/font/google instead of CSS @import to leverage Next.js font self-hosting and optimization. Confidence: 0.75

# images
- Do not set images: { unoptimized: true } in next.config.js unless there is a concrete documented reason (e.g., static export). Confidence: 0.70

# eslint
- Do not set eslint: { ignoreDuringBuilds: true } in next.config.js — run npm run lint and fix issues instead. Confidence: 0.70

# scope
- Visual rebrand only — product catalog, copy, categories, and merchandise content must stay exactly as they are. Confidence: 0.80
