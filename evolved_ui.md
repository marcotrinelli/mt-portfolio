# Evolved UI: the portfolio as a generated interface

Plan and ideas for step 2 of the redesign. Step 1 (the static card refresh) ships first and stays the canonical page.

## Goal

The page recomposes itself around what the visitor came for. An agent acts as the layout engine, not as a chat window: it picks components from a fixed catalog, orders them and writes the connecting copy, using only facts already in `src/portfolio.ts` and `src/data/patents.json`.

Non-goals:

- A global "ask my CV" chatbot
- The agent writing HTML, CSS or JS (it emits a declarative description, the client renders its own components)
- Any claim that is not traceable to a record in the content baseline

## Concepts

### 1. Lenses

The visitor states an intent ("hiring for agentic AI", "networking patents", "I played Urban Terror in 2011"), or picks one of a few suggested chips in the hero. The page morphs into a layout built for that intent, using the View Transitions API (fallback is an instant swap).

- Each lens is addressable and shareable: `/?lens=agentic-ai`
- Initial curated set: agentic AI and GenAI, distributed systems and cloud, networking and edge, inventor (patents first), game design and early work, "hiring manager in 60 seconds"
- A lens only reorders, selects and annotates. It never hides the way back to the full page

### 2. Ask the section

Each section gets a small, contextual prompt affordance instead of one global chat. The answer expands inline as components, inside the section.

- Early innovation: "How did deathrun spread?" renders a timeline (2010 first `ut4_deathrun`, other mappers adopt the format, 2012 `ut4_deathrun_space`) plus the trailer embedded in place
- Patents: "How does this work?" renders a step diagram generated from the claims (patents are dense legal text with no visual structure, so the gain is largest here)
- Experience: "What did I ship at Cisco?" renders metric tiles linked to the underlying project and patent records

### 3. Agent-readable portfolio

The same content baseline is exposed to other agents, so a recruiter's assistant can query it directly.

- `llms.txt` at the site root (static, generated at build time)
- An MCP server with read-only tools: `list_projects`, `get_patent`, `compose_lens` (hosted on the same edge function as the live composer)
- An A2A agent card (optional, only if adoption justifies it)

### 4. Visible generation

While a lens streams in, a thin trace shows what the agent is doing ("matched intent to: distributed systems", "selected 4 projects, 3 patents"). It's transparent and doubles as the loading state. Every generated sentence carries a hover reference to its source record.

## Architecture

### Content baseline

A build step exports `content.json` from `portfolio.ts` and `patents.json`, giving every record a stable ID (`project:notification-service`, `patent:12368768`, `exp:cisco-senior`). Today records are keyed by display name, so we need the IDs first.

The baseline is the only source of truth. Prompts include it, validation checks against it.

### Component catalog

The agent can only reference these, by name, with typed props:

| Component | Props | Notes |
| --- | --- | --- |
| `Stack`, `Grid` | `children: id[]`, `columns?` | layout containers |
| `SectionHeading` | `title`, `subtitle?` | |
| `ProjectCard` | `ref: project:*`, `emphasis?` | reuses the step-1 card |
| `PatentCard` | `ref: patent:*` | reuses `PatentCard` |
| `Timeline` | `items: { year, label, ref }[]` | |
| `MetricTile` | `value`, `label`, `ref` | value must appear in the referenced record |
| `MediaEmbed` | `ref` | YouTube lite embed (thumbnail first, iframe on click) |
| `Narrative` | `text`, `refs: id[]` | short connecting copy, first person singular |
| `LensChips` | `lenses: string[]` | suggested follow-ups |

### Wire format

A2UI-shaped: a flat list of components with IDs, parent-child links by ID, and streaming JSONL so the page fills in progressively. Two options:

- Adopt A2UI and its renderer. Interoperable, but the official renderers were Lit, Angular and Flutter, and React was community or in progress (to verify before committing)
- Define our own minimal schema shaped after A2UI v0.8 and map it to our React components. A small catalog, no dependency, and we can migrate to A2UI proper later (current preference)

### Validation (tier-1, deterministic)

Every generated layout passes these checks before rendering:

- Schema validation against the catalog (unknown component or prop: reject)
- Every `ref` resolves in `content.json`
- Every number in `Narrative.text` and `MetricTile.value` appears in a referenced record (catches invented metrics without a judge model)
- Narrative is first person singular (a simple lint for third person pronouns)

A failed layout falls back to the nearest precomputed lens. It never renders partially wrong content.

### Serving tiers

| Tier | Mechanism | Latency | Share of traffic (guess) |
| --- | --- | --- | --- |
| tier-1 | precomputed lenses, static JSON in `public/lenses/` | ~ms | most visitors |
| tier-2 | embedding match of free-text intent to the nearest lens | < 1 s | free-text visitors |
| tier-3 | live LLM composition, streamed | a few seconds | only when nothing matches |

Precomputed lenses are generated offline by a script (`scripts/compose-lenses.js`) with a stronger model, validated, and reviewed by me before commit. Live composition uses a fast model. We pick the exact models at implementation time.

### Hosting

The site stays on GitHub Pages (static). Live features need a small edge function (Cloudflare Worker or similar) for `/api/compose` and the MCP endpoint:

- API key as a Worker secret, never in the bundle
- Per-IP rate limit and a bot check (reCAPTCHA is already a dependency, Turnstile is lighter)
- Cache composed layouts by normalized intent hash
- Hard monthly spend cap, with the Worker degrading to tier-2 when it is reached

### Frontend prerequisites

- React 17 to React 18 (streaming renders and most generative UI renderers assume 18+)
- CRA to Vite (CRA is deprecated, optional but makes the upgrade easier)
- URL state for `?lens=`, `aria-live` announcement when the layout changes, `prefers-reduced-motion` respected by the morph

### SEO, privacy, analytics

- `/` stays the static canonical page. Lens URLs get `rel=canonical` to `/`
- Free-text intents go to an LLM provider, which we disclose in the footer next to the existing analytics notice. No intent text is stored beyond the cache key
- GA4 events: `lens_selected`, `lens_composed` (with tier), `compose_fallback`, `section_ask`

## Phases

1. Content IDs and the `content.json` export
2. Catalog and renderer driven by hand-written lens JSON (fake data, outside-in), plus the lens chips in the hero and the View Transitions morph
3. Offline lens generation script and the tier-1 validator, then replace the hand-written lenses
4. Edge function with tier-2 matching and tier-3 streaming composition, rate limits and spend cap
5. Ask the section, starting with Early innovation and Patents
6. Agent-readable surface: `llms.txt`, then the MCP server

Phases 1 to 3 need no backend and already deliver the lens experience for the curated set.

## Risks

- Free-text layouts will sometimes be weak. The tier-2 fallback covers most cases (unmeasured)
- Cost abuse on a public endpoint. Rate limit, cache and spend cap are mandatory before launch, not after
- Latency of tier-3. Streaming the first components quickly matters more than total time
- A2UI React renderer maturity. It only matters if we adopt A2UI proper
- Maintenance: every new project needs an ID and must pass the validator, and precomputed lenses must be regenerated when content changes (we can hook this into the existing `fetch-patents` flow)
