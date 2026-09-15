# Project Memory

Date: 2026-09-14

Current focus:
- Completed the full-stack Create Community flow refinement (2026-09-15).
- Next: Run Prisma migration (`npx prisma migrate dev --name add-community-settings`), then manually test the create flow end-to-end.
- Future: Refine the Edit Community page to match the same sectioned layout, card details on the list page, and eventually add a proper markdown editor (TipTap or similar) to replace the plain textarea.

Previous focus:
- Navbar, community topbar, community routes, edit community page (see Done section).

Process notes:
- Keep edits scoped to the community list page unless the user asks for broader UI work.
- Always use semantic color tokens from `frontend/src/index.css` — never hardcode colors.
- Design reference images live in `frontend/public/designs/`.
- Use Lucide React for all icons. Use `morphicons/react` only for the mobile hamburger/X toggle.
- Community routes:
  - `communities/:slug/chat`
  - `communities/:slug/notice`
  - `communities/:slug/members`
  - `communities/:slug/edit`
- Update this file whenever a notable UI or dependency decision is made so later agents can recover the current direction quickly.

Done:
- Installed `morphicons` and `lucide` in `frontend`.
- Updated the navbar layout and auth button styling.
- Swapped the mobile menu button to a morphing icon.
- Added community notice edit/request pages and wired them into the community top bar.
- Added chat, notice, members, and edit/delete community navigation targets.
- Reworked the edit community page to use the create-page field stack with prefilled data.
- **Community list page UI refinement (2026-09-14)**:
  - Redesigned `CommunityCard` — image section with category badge overlay, community icon overlay, description, stats footer, Join button.
  - Updated `CommunityHeader` — removed pill buttons, replaced sort text with `ArrowUpDown` icon.
  - Updated `CardSkeleton` — mirrors new card structure with semantic token colors.
  - Updated `CommunityGrid` — semantic tokens for empty/footer states.
- **Create Community full-stack refinement (2026-09-15)**:
  - Prisma schema: added `isPrivate` (Boolean, default false), `requireApproval` (Boolean, default true) to Community model.
  - Backend `validate.ts`: now returns Zod field-level errors (not just generic "Validation failed").
  - Backend `schemas-validate.ts`: added `isPrivate`, `requireApproval` with FormData string→boolean coercion. Description switched from Slate JSON to plain text (max 500 chars).
  - Backend `communityController.ts`: uses new fields in create/update, fixed `@ts-ignore` error handling, removed debug logs.
  - Backend `communityRoute.ts`: removed debug middleware from PUT, fixed middleware order (validate before ImageKit upload).
  - Backend `uploadImage.ts`: removed debug console.log statements.
  - Frontend `communityApi.ts`: typed `createCommunity` return (`CreateCommunityResponse`), typed `getCommunityBySlug`, removed console.log.
  - Frontend `useCommunityMutations.ts`: fixed double toast (removed `onSuccess: toast.success()` since page uses `toast.promise()`).
  - Frontend `constant.ts`: `FieldClass` updated from hardcoded teal to semantic tokens.
  - Frontend `Field.tsx`: label color changed to semantic `text-foreground`.
  - Frontend `ImageUpload.tsx`: all colors updated to semantic tokens.
  - Frontend `createCommunity.tsx`: complete UI overhaul — 4 sections (Banner, Basic Info, Settings, Tags), live preview sidebar (desktop-only), Privacy Public/Private toggle cards, Membership Approval switch, character counter on description, removed Slate RichTextEditor in favor of plain textarea, removed unused `useUser` guard and duplicate `previewUrl`.
