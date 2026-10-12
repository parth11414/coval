# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience confirmed by the user: engineers finding projects, people, and recent work. Team leads are a secondary audience suggested by the existing metrics but not confirmed as primary.

## Product Purpose

The product helps engineers find projects, people, and recent work across a connected team. Its current dashboard brings team profiles, repository information, collaboration relationships, activity, and messages into one workspace.

## Positioning

Inferred from the existing product: relate engineering output to the people, repositories, and teams behind it, rather than showing repository activity alone. No unique market claim has been confirmed.

## Operating Context

The current experience is a web dashboard for an Atlas Labs workspace. Users can move among overview, people, projects, network, activity, messages, and individual profiles.

## Capabilities and Constraints

- The current experience uses seeded demo data; it does not fetch live dashboard data.
- Sign-in is supported through Google and GitHub OAuth. Credential-based sign-in does not work, despite credential fields currently appearing in the sign-in UI.
- Keep the existing dashboard routes and their local interactions working during the redesign.
- Do not imply that seeded metrics, presence, repository status, or activity are live or verified.
- Existing implementation uses Next.js 16.4 and React 19.3.

## Brand Commitments

- Product name: COVAL Solutions.
- Existing COVAL logo assets are in `public/coval-logo-light.png` and `public/coval-logo-dark.png`.
- No additional visual or voice commitments were confirmed.

## Evidence on Hand

- The project contains seeded people, projects, collaboration, activity, and conversation data in `app/data/dashboard-data.js`.
- No live data source, verified engineering metrics, or customer evidence is available in this project.

## Product Principles

- Make relationships between people, projects, and engineering work easy to follow.
- Keep navigation and common team tasks quick to scan and reach.
- Label seeded content clearly so it is not mistaken for current operational data.
- Preserve meaningful local interactions without implying unavailable live capabilities.
