# SYS_ARCHITECT — Systems, HPC & Theory Portfolio

A high-performance, brutalist static portfolio and computational workspace built with **Astro** and **React** (Islands Architecture).

---

## Architecture

- **Engine:** Astro (Static Site Generation / SSG)
- **UI & Islands:** React 19 (Zero-JS static HTML by default, interactive islands where needed)
- **Typography:** JetBrains Mono (monospaced system readouts) & Inter (clean technical documentation)
- **Styling:** Vanilla Brutalist CSS (`src/index.css`) with instant zero-flicker Light/Dark mode

### Route Structure
- `/` (`src/pages/index.astro`): Fullscreen landing sequence
- `/home` (`src/pages/home.astro`): `/sys/benchmark` — Bio, endpoints, and primary focus areas
- `/projects` (`src/pages/projects.astro`): `/bin/projects` — High-performance distributed systems & kernels
- `/notes` (`src/pages/notes/index.astro`): `/lib/notes` — Low-latency systems, algorithms, and technical research
- `/misc` (`src/pages/misc/index.astro`): `/var/misc` — Cultural curation, music, anime, photography, and essays
- `/resume` (`src/pages/resume.astro`): `/etc/profile` — Curriculum Vitae (Raw JSON & Compiled HTML views)

---

## Misc panel Implementation Architecture (reference)

To keep `src/pages/misc/[...slug].astro` clean and maintainable:

1. **Modular Components in `src/components/misc/`**:
   * `PicturesGrid.astro` & `PicturesItem.astro` (with minimal JS lightbox).
   * `MusicGrid.astro` & `MusicItem.astro` (with audio card/player).
   * `VideoGrid.astro` & `VideoItem.astro` (with responsive 16:9 iframe + timestamps).
   * `AnimeArtGrid.astro` & `AnimeArtItem.astro` (with posters, palette strips, status tags).
   * `EssayItem.astro` (centered, distraction-free reading typography).
2. **Controller Routing in `src/pages/misc/[...slug].astro`**:
   * When `isCategory`: dispatch to the matching category archive component based on `category`.
   * When `!isCategory`: dispatch to the matching detail layout component, stripping the technical TOC sidebar where appropriate.
3. **Styles in `src/index.css`**:
   * Reusable utility classes for aspect ratios (`aspect-video`, `aspect-poster`), photo grids, lightboxes, and audio card styling with full light/dark theme support.


## Landing Page Media & Decryption Archive

Because the production `src/pages/index.astro` contains minified, string-encrypted, and mangled hexadecimal code for anti-inspection purposes, the clean human-readable source is preserved in `src/pages/index.astro.bak`.

### Video Pipeline & Re-Obfuscation Workflow

1. **Source Videos**: Place raw `.webm` videos in `raw_media/` (e.g. `raw_media/1.webm`).
2. **Obfuscation Script**: Run `npm run obfuscate` (or `node scripts/obfuscate.js`). It scrambles the video into `public/assets/matrix_cache.bin`.
3. **If Modifying the Landing Script**:
   - Make edits to the human-readable script in `src/pages/index.astro.bak`.
   - Run the obfuscator CLI to update `src/pages/index.astro`:
     ```bash
     npx javascript-obfuscator temp_script.js --compact true --control-flow-flattening true --numbers-to-expressions true --string-array true --string-array-encoding base64 --string-array-threshold 1 --identifier-names-generator hexadecimal
     ```

---

## Development Commands

```bash
# Start local dev server (default port 4321)
npm run dev

# Build production static output in /dist
npm run build

# Preview static production build
npm run preview
```
