# Project Memory

Date: 2026-09-05

Current focus:
- Updating the public/non-login navbar in `frontend/src/components/NonLoginNavbar.tsx`.
- Desktop auth actions now sit on the right of the logo.
- Sign In and Sign Up use Lucide icons and a green/emerald visual tone.
- `morphicons` is installed in `frontend` and is now used for the mobile menu toggle animation.
- Community top-bar menu actions are now route-backed under the active community slug.
- Community navigation now points to dedicated pages for `chat`, `notice`, and `members`.
- Edit Community now reuses the Create Community form structure and starts with the current community data prefilled.

Process notes:
- Keep edits scoped to the navbar file unless the user asks for broader UI work.
- Use Lucide React for standard button and nav icons.
- Use `morphicons/react` only where icon morphing adds value, currently the mobile hamburger/X toggle.
- Community routes now include:
  - `communities/:slug/chat`
  - `communities/:slug/notice`
  - `communities/:slug/members`
  - `communities/:slug/edit/community/edit`
- The old `request/community/notice` menu path was removed from the top bar.
- Edit page keeps the slug visible as a read-only field.
- Update this file whenever a notable UI or dependency decision is made so later agents can recover the current direction quickly.

Done:
- Installed `morphicons` and `lucide` in `frontend`.
- Updated the navbar layout and auth button styling.
- Swapped the mobile menu button to a morphing icon.
- Added community notice edit/request pages and wired them into the community top bar.
- Added chat, notice, members, and edit/delete community navigation targets.
- Reworked the edit community page to use the create-page field stack with prefilled data.
