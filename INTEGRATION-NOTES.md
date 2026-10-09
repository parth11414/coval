# COVAL authentication integration notes

This version preserves the existing dashboard components and adds a root login page that serves the existing COVAL login HTML from `public/coval-login.html`.

## Routes
- `/` — existing COVAL login UI, with Google and GitHub OAuth buttons.
- `/dashboard` — existing dashboard, gated by a Supabase session check.

## Supabase configuration expected
- Project URL: `https://zriirrxmkfggyhoagtov.supabase.co`
- Google and GitHub providers enabled in Supabase.
- Site URL: `https://coval-xyz.vercel.app`
- Allowed redirects should include `https://coval-xyz.vercel.app/**`.
- Provider callback URLs should use `https://zriirrxmkfggyhoagtov.supabase.co/auth/v1/callback`.

The Supabase publishable key is intentionally used in browser code; it is not a service-role key. Never add a service-role key to frontend code.

## Before deploying
1. Run `npm install` and `npm run build` locally or let Vercel install dependencies and build.
2. Deploy this folder as the project root for the existing `coval-dashboard` Vercel project.
3. Test Google and GitHub login in a private/incognito window. Ensure each provider is configured with its Client ID and Client Secret in Supabase.
4. Verify `/dashboard` redirects to `/` when signed out and that Sign out returns to `/`.

The login page keeps the original interface. Its old demo-only username/password form now prompts the user to use Google or GitHub; password sign-in is not implemented in this integration.
