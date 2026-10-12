---
name: COVAL Solutions
description: A shared engineering fieldbook for finding projects, people, and recent work.
colors:
  sidebar: "#202a33"
  sidebar-ink: "#f0f2ec"
  sidebar-muted: "#b8c0bf"
  page: "#e9ece8"
  paper: "#f8f9f5"
  paper-raised: "#fffefa"
  paper-muted: "#f0f2ed"
  line: "#d1d7d1"
  line-strong: "#aab5ad"
  ink: "#222c32"
  ink-soft: "#4c5a61"
  ink-faint: "#65737a"
  blue: "#345d7a"
  blue-soft: "#e5edf1"
  copper: "#a75d3d"
  copper-soft: "#f3e7dc"
  green: "#53745f"
  danger: "#9b4639"
  dark-sidebar: "#131b22"
  dark-page: "#1d262c"
  dark-paper: "#273238"
  dark-paper-raised: "#303c42"
  dark-ink: "#f2f3ed"
  dark-blue: "#9bc2d8"
  dark-copper: "#e4a17c"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(27px, 3vw, 38px)"
    fontWeight: 620
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  mark: "8px"
  avatar: "50%"
  square: "0"
spacing:
  rail: "252px"
  content-gutter: "clamp(20px, 3vw, 42px)"
  section-gap: "28px"
  row-gap: "12px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "#ffffff"
    rounded: "{rounded.square}"
    padding: "7px 12px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "color-mix(in srgb, var(--blue) 88%, black)"
    textColor: "#ffffff"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "7px 12px"
    height: "36px"
  record-tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.square}"
    padding: "2px 6px"
---

# Design System: COVAL Solutions

## Overview

**Creative North Star: “Engineer’s Fieldbook”**

COVAL is a shared engineer’s fieldbook: project entries, contributor notes, and work records point to related records. Cool paper, blue-black ink, ruled separators, and measured copper index marks make a dense workspace feel legible and composed. The interface uses its own structure—page tabs, numbered entries, margin references, and linked records—rather than a decorative notebook illustration.

The dashboard serves engineers finding projects, people, and recent work across Atlas Labs. The overview leads with recent project entries and nearby contributors; the persistent index keeps the other destinations at hand. People, project, network, activity, conversation, profile, and preference views share this record-and-reference language. All content is seeded demo data: presence, metrics, repository states, activity, and messages must not appear live or verified. Google and GitHub sign-in remain supported.

**Key Characteristics:**
- Cool paper and precise blue-black reading ink
- Copper index marks, visible tabs, and ruled record spacing
- Workmanlike sans typography with compact monospaced metadata
- Direct links between people, projects, and recent work
- Persistent demo labeling across the workspace

## Colors

The palette pairs cool neutral paper with blue navigation ink and restrained copper reference marks; the dark theme shifts those roles to accessible lighter inks on deep slate surfaces.

### Primary
- **Fieldbook Blue** ({colors.blue}): Links, active project states, and primary actions; it identifies useful routes and references.
- **Index Copper** ({colors.copper}): Numbering, demo stamps, active navigation marks, and keyboard focus; use as a precise locator rather than a broad fill.
- **Work Green** ({colors.green}): Supporting status states.

### Neutral
- **Slate Rail** ({colors.sidebar}): Persistent navigation field.
- **Cool Page** ({colors.page}): Workspace canvas around record sheets.
- **Reading Paper** ({colors.paper}): Standard content surface.
- **Raised Paper** ({colors.paper-raised}): Slightly lifted or foreground record surface.
- **Muted Paper** ({colors.paper-muted}): Inset controls and quiet regions.
- **Rule Line** ({colors.line}): Row dividers and quiet boundaries.
- **Strong Rule** ({colors.line-strong}): Section boundaries and stronger control edges.
- **Blue-Black Ink** ({colors.ink}): Primary reading text.
- **Soft Ink** ({colors.ink-soft}): Supporting descriptions.
- **Faint Ink** ({colors.ink-faint}): Metadata and secondary labels.

### Named Rules
**The Demo Signal Rule.** Seeded states always carry explicit sample or demo context. Never style demo activity as verified operational telemetry.

## Typography

**Display Font:** Inter (with system sans-serif fallbacks)  
**Body Font:** Inter (with system sans-serif fallbacks)  
**Label/Mono Font:** ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace

**Character:** Workmanlike and compact, with a clear reading hierarchy. Monospaced numerals and repository paths act as field annotations while names and descriptions remain in the sans family.

### Hierarchy
- **Display** (weight 620, responsive 27–38px, line-height 1.12): Page titles; keep a readable measure and tight leading.
- **Headline** (weight 620, 18px, line-height 1.28): Section names and ledger headings.
- **Title** (weight 650, 15px): Project entries and record names.
- **Body** (weight 400, 14px, line-height 1.55): Standard reading text; supporting record copy is smaller, around 12px.
- **Label** (weight 600, 10px, letter spacing .045em): Index captions, counts, timestamps, paths, and compact measures; use tabular numerals where values align.

### Named Rules
**The Metadata Rule.** Use mono for identifiers, timestamps, repository paths, and measures; use the UI sans for names and explanatory prose.

## Layout

The desktop shell uses a fixed 252px left index beside a flexible main area. A sticky top strip carries current section, global search, the demo workspace stamp, recent work, and theme control. Main content is centered within a 1480px outer measure and a 1320px page measure, with responsive side gutters. The overview opens with a wide recent-work ledger and a narrow contributor margin, followed by project references; it does not lead with metric cards.

Each route keeps the same page heading, section rules, content spacing, and reference controls while adapting its own record pattern: searchable people and project indexes, linked network references, a chronological activity log, a conversation workspace, and profile records. At widths below 900px, the rail becomes a drawer and multi-column spreads collapse; chat list and detail panes become overlays. Preserve usable horizontal scrolling for tab strips and comparison tables rather than compressing their labels.

## Elevation & Depth

Depth is restrained and mostly structural: paper tones, fine rules, and layering separate the canvas, record sheets, and inset controls. A single broad soft shadow distinguishes transient overlays and drawers. Keep the reading surfaces calm; reserve elevation for dialogs, mobile detail panels, and toasts.

### Shadow Vocabulary
- **Overlay shadow** (`0 12px 32px rgb(24 34 38 / 12%)`): Search, settings, and record dialogs; in dark theme use the deeper black shadow defined by the theme.

### Named Rules
**The Paper-First Rule.** Use tone and rules to organize resting content; use shadow only when a layer floats above the fieldbook.

## Shapes

The interface is predominantly square-cornered, like a precisely ruled working document. Controls, cards, tags, and tabs use crisp edges; the brand mark alone has a small softened corner, while contributor avatars are circular. Borders and separators define record boundaries. Keep decoration subordinate to the data and its cross-references.

## Components

Components should feel precise, quiet, and easy to scan; copper and blue states identify action or location.

### Buttons and links
- **Shape:** Square corners, thin ruled border.
- **Primary:** Blue fill, white text, compact 7px by 12px padding, 36px minimum height.
- **Hover / Focus:** Border and fill shift on hover; visible focus uses a 3px copper outline with 3px offset.
- **Secondary / Ghost:** Paper or transparent backgrounds with strong rule borders or no border; keep labels direct and compact.
- Text links use blue and underline on hover; cross-references may shift to copper.

### Navigation and tabs
- Persistent navigation is a dark slate rail with muted labels. The active destination receives a copper index edge and restrained copper tint.
- Project and team references use small rotated copper index marks and mono counts where useful.
- On mobile, navigation opens as a drawer; retain a clearly labeled close affordance and active route.

### Record sheets, chips, and fields
- Content sheets use paper fills and fine neutral borders; ledgers use row rules instead of floating-card decoration.
- Compact tags and sample measures are outlined, square, and restrained. Make sample/demo status explicit.
- Search and form controls use paper surfaces, clear borders, and copper caret/focus cues.
- Avatars are circular, with muted categorical fills; initials remain legible in both themes.

### Dialogs and messages
- Search, settings, and record dialogs use layered paper surfaces with a strong heading, bounded content, and clear dismiss actions.
- Conversation records preserve participant and work references. Demo messages should retain their sample-workspace context; no live delivery or presence should be implied.

## Do's and Don'ts

- Do keep Google and GitHub authentication paths recognizable.
- Do preserve the existing hash-route destinations and local search, filter, tab, and chat interactions.
- Do connect people, projects, and work with direct cross-references.
- Do mark seeded records and metrics as demo data wherever they are presented.
- Don't add live-fetching or imply that presence, repository health, metrics, or activity is verified.
- Don't replace the work-ledger overview with a generic analytics-card wall.
- Don't use copper as a large-area background or rely on color alone to communicate a status.


