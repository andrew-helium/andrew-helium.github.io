# Living Lab — Vibe-Coded Research Showcase

Living Lab is a lightweight, static-ready research lab home page designed for seamless deployment on GitHub Pages (including root/main branch setups). It provides a playful creative studio showcase where lab members and visitors can import, browse, and export projects built with vibe-coding platforms like Claude and Lovable.

### User Review & Critical Decisions

> [!IMPORTANT]
> The choices below reflect your confirmed preferences from our clarification step and ensure the site works out-of-the-box on GitHub Pages without requiring a backend server.

- **Confirmed Decision 1 — URL & Metadata Project Import**: Users import projects via a quick modal or inline form by pasting a shareable project URL (e.g., Claude Artifact link, Lovable app URL, Bolt, v0, or custom URL), selecting the vibe-coding tool, and adding a title, author, and short description. Smart URL detection automatically pre-selects the platform when a Claude or Lovable URL is pasted.
- **Confirmed Decision 2 — Local Storage + Repository JSON Export/Import**: Newly added projects save immediately to browser `localStorage` so users can test adding and curating right away. Because GitHub Pages serves static files from your branch, a "Sync / Export JSON" utility lets anyone download the updated project list (or copy the JSON snippet) to commit directly to the repository's static data seed.
- **Confirmed Decision 3 — Playful Creative Studio Aesthetic**: Soft rounded cards, warm neutral canvas, expressive typography (`Bricolage Grotesque` + `Plus Jakarta Sans`), and vibrant studio accents (`#2563EB` electric cobalt and `#E11D48` coral rose) while keeping the layout clean and simple.
- **Confirmed Decision 4 — GitHub Pages Branch & Root Compatibility**: Configured with relative asset paths (`base: './'`) and clean hash/tab state so the app works reliably whether served from a root domain (`username.github.io`) or a project subpath (`username.github.io/living-lab/`).

---

### 1. Overview & Core Concept

- **What It Does**: Serves as the home page for the **Living Lab** research group, centering on an interactive showcase of vibe-coded experiments, prototypes, and tools created by lab members.
- **Target Audience / Persona**: Lab researchers, students, and visitors who rapidly prototype ideas using AI vibe-coding tools (Claude Artifacts, Lovable, v0, Cursor) and want a frictionless place to share and explore them.
- **Key Value**: Bridges rapid AI prototyping with an academic research lab presence—allowing one-click project submission from shareable links and static-friendly persistence ready for GitHub Pages testing.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Explore the Showcase (Home View)**: Visitors land on a welcoming hero banner introducing *Living Lab* alongside an interactive filter bar (`All Projects`, `Claude`, `Lovable`, `Other Tools`) and search input.
  2. **Import a Vibe-Coded Project**: Clicking **"Import Project"** opens a streamlined import dialog. Pasting a link from `claude.site` / `claude.ai` or `lovable.app` / `lovable.dev` automatically detects the source platform and populates default metadata fields. Submitting immediately adds the card to the showcase grid.
  3. **Inspect or Launch a Project**: Clicking any project card opens a clean detail modal showing full description, author credits, creation date, prompt/vibe notes, and a primary **"Open Live Project"** action.
  4. **Export / Sync for GitHub Pages**: Clicking **"Export JSON"** in the showcase toolbar copies or downloads the current project collection as a clean JSON structure so the maintainer can commit permanent additions to the repo branch.
  5. **Preview Upcoming Lab Sections**: Clicking **Publications** or **Team** in the top navigation bar switches to a clean, lightweight "Coming Soon" preview state with a quick return button to the active Home showcase.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Playful creative studio meets research lab—approachable, tactile, and uncluttered.
  - *Color Palette & Mood* (60-30-10 Discipline):
    - **60% Dominant Canvas**: Warm alabaster studio paper (`#FAF9F6`) with high-contrast ink (`#18181B`).
    - **30% Structural Surfaces**: Crisp white elevated project cards (`#FFFFFF`) with soft `rounded-2xl` corners and subtle hairline borders (`#E4E4E7`).
    - **10% Accent Budget**: Electric Cobalt (`#2563EB`) for primary actions and active states, paired with subtle semantic platform indicators for Claude (warm amber-terracotta text accent) and Lovable (vibrant rose text accent).
  - *Typography & Hierarchy*:
    - **Display / Headings**: `Bricolage Grotesque` (600/700 weight, tight tracking, `text-wrap: balance`) for an expressive, creative research identity.
    - **Body & UI Controls**: `Plus Jakarta Sans` (400/500/600 weight) for crisp legibility across descriptions and forms.
    - **Monospace Metadata**: `JetBrains Mono` (`tabular-nums`) for project counts, timestamps, and JSON export previews.
  - *Component Styling & Layout*:
    - Strict 3-zone top bar contract: Brand title on the left (`Living Lab`), navigation tabs in the center (`Projects`, `Publications`, `Team`), and a single primary CTA on the right (`Import Project`).
    - Unboxed metadata with middle-dot (`·`) typographic separators on project cards (tool name · author · date) to avoid visual clutter.

- **Interactive Feedback & Motion**:
  - Fast, responsive card hover elevation (`150ms` transform transition).
  - Instant URL platform detection feedback when pasting links in the import modal.
  - Confirmation toast when a project is imported, deleted, or exported to JSON.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Static-First Architecture for GitHub Pages**
  - *Chosen Approach*: Configure Vite with relative base paths (`base: './'`) and self-contained client state, avoiding server-only API dependencies.
  - *Why*: GitHub Pages hosts static files from a repository branch (`main` or `gh-pages`), often under a `/repo-name/` subpath. Relative asset resolution ensures scripts and styles load properly without broken path errors.
  - *Alternatives Considered*: Server-backed Express storage—rejected because GitHub Pages only serves static assets and cannot run a Node.js server.

- **Decision 2: Hybrid Seed Data + `localStorage` + JSON Export**
  - *Chosen Approach*: Ship the page with a curated set of realistic sample vibe-coded lab projects merged with browser `localStorage`, plus a 1-click JSON export/reset modal.
  - *Why*: Lets you immediately test adding, deleting, and filtering projects in the browser while providing a clear path to persist community submissions into the repository source code.
  - *Alternatives Considered*: Third-party cloud database—rejected to keep the setup zero-config and focused purely on testing the GitHub Pages workflow.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:
```
┌─────────────────────────────────────────────────────────────────────────┐
│                       Living Lab Web Application                        │
│                 (Static-Ready Vite Bundle · base: './')                 │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
┌───────────────────┐     ┌───────────────────┐     ┌─────────────────────┐
│   Top Navigation  │     │  Home Showcase    │     │  Import & Sync      │
│   Bar (3-Zone)    │     │  View             │     │  Modals             │
├───────────────────┤     ├───────────────────┤     ├─────────────────────┤
│ • Brand Wordmark  │     │ • Studio Hero     │     │ • URL Auto-Detector │
│ • Nav Tabs:       │     │ • Tool Filter Bar │     │   (Claude/Lovable)  │
│   - Projects      │     │   & Search Input  │     │ • Project Form      │
│   - Publications  │     │ • 3-Col Bento /   │     │ • JSON Export /     │
│     (Coming Soon) │     │   Card Grid       │     │   Reset Utility     │
│   - Team          │     │ • Project Detail  │     └──────────┬──────────┘
│     (Coming Soon) │     │   Lightbox Modal  │                │
│ • "Import Project"│     └─────────┬─────────┘                │
└───────────────────┘               │                          │
                                    ▼                          ▼
                        ┌─────────────────────────────────────────┐
                        │     Client Project Store (State)        │
                        │  Initial Seed Projects + localStorage   │
                        └─────────────────────────────────────────┘
```

- **Data Model & State**:
  - `VibeProject`:
    - `id`: Unique identifier string
    - `title`: Project title
    - `description`: Brief summary of what the vibe-coded project does and why it was built
    - `url`: Live URL to the project (e.g., Claude Artifact link, Lovable deployed URL, GitHub link)
    - `platform`: `'Claude' | 'Lovable' | 'v0' | 'Bolt' | 'Other'`
    - `author`: Creator or researcher name
    - `category`: Research topic or domain (e.g., `'Interactive Simulation'`, `'Data Visualization'`, `'Field Tool'`)
    - `promptNotes`: Optional snippet of the vibe prompt or key insight
    - `createdAt`: Formatted date string (`YYYY-MM-DD`)
    - `coverStyle`: Curated visual gradient/artwork identifier for resilient card thumbnails

- **Interactive Component & State Mapping**:
  - **URL Smart Parser**: Watches the URL field in the Import Modal; if the string matches `claude.ai` or `claude.site`, selects `Claude`; if `lovable.dev` or `lovable.app`, selects `Lovable`; if `v0.dev`, selects `v0`; if `bolt.new`, selects `Bolt`.
  - **Filter & Search Controller**: Filters the active project list in real time by platform tab (`All`, `Claude`, `Lovable`, `Other`) and text query across title, author, and description.
  - **Tab Router**: Switches cleanly between the active `Projects` home view and lightweight `Publications (Coming Soon)` and `Team (Coming Soon)` placeholder views without page reloads, ensuring 100% compatibility with GitHub Pages static hosting.
