# Gatherly UI Design System

This document is the source of truth for Gatherly’s frontend visual language. The current implementation is content-first, warm, accessible, and community-oriented, based on the supplied design reference.

## Typography

- Primary typeface: `Inter`, loaded at weights 400, 500, 600, and 700.
- Body copy uses regular or medium weight with generous line height.
- Headings use semibold weight, tight tracking, and clear hierarchy rather than oversized decorative type.
- The Gatherly wordmark uses a teal mark with a navy Inter wordmark.

## Color tokens

Light mode:

- Background: `#F8FAFC`
- Surface/card: `#FFFFFF`
- Primary text: `#0F172A`
- Secondary text: `#475569` / `#64748B`
- Primary action: `#0D9488`
- Primary hover: `#0F766E`
- Secondary action/accent: `#CCFBF1`
- Border: `#DBE5EE`
- Success accent: `#10B981`

Dark mode is automatic through `prefers-color-scheme: dark`. It uses deep teal surfaces (`#081F26`, `#0D2D34`), light slate text, teal primary actions, and higher-contrast borders. There is intentionally no theme switcher; the browser/OS preference is the source of truth.

## Components and layout

- Content max width: approximately `1400px` for marketing surfaces and navigation.
- Base spacing follows a 4px rhythm. Marketing sections use generous horizontal and vertical padding.
- Corners are restrained: use `rounded-md` for controls and `rounded-xl` only for larger feature surfaces.
- Navigation links are text-first: no filled hover pills; use primary teal text and a thin underline on hover.
- Primary actions are filled teal with white/light text; secondary actions use a border and subtle accent surface.
- Use quiet borders and restrained shadows for separation. Avoid excessive gradients, glassmorphism, and nested cards.

## Frontend application

- React + Vite source lives in `frontend/src`.
- Global tokens and Tailwind v4 theme mappings live in `frontend/src/index.css`.
- shadcn configuration is in `frontend/components.json`; shared class composition lives in `frontend/src/lib/utils.ts`.
- Marketing components live in `frontend/src/components/marketing`.
- The non-authenticated navigation is `frontend/src/components/NonLoginNavbar.tsx`.
- The Clerk provider follows the same system theme in `frontend/src/provider/SystemThemeClerkProvider.tsx`.

When adding UI, use the semantic tokens (`bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary-foreground`) before introducing new color values.
