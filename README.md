# The Dietrich Files

The Dietrich Files is a static, frontend-only multimedia archive. The current application uses plain HTML, CSS, and browser JavaScript; it does not currently use React, Vite, Express, MongoDB, or another application framework.

## Current architecture

```text
index.html              sealed entrance
gallery/index.html      artwork gallery
music/index.html        track list and native audio player
film/index.html         local video player
data/catalog.js         structured media metadata
js/gallery.js           Gallery rendering and lightbox interaction
js/music.js             Track rendering, selection, and audio playback
app.js                  shared navigation and temporary Film behavior
styles.css              shared visual design and responsive layout
assets/                 media files used during development
```

The Gallery is data-driven. Artwork records live in `data/catalog.js`, and `js/gallery.js` renders those records into the existing 40-position gallery wall. Empty positions remain visible until matching artwork records are added.

Music is data-driven. Track records live in `data/catalog.js`, and `js/music.js` renders the track list and manages selected-track playback through the native audio element. Film still uses a temporary browser-selected file; its media is not uploaded or persisted.

## Running locally

Serve the repository with any static HTTP server and open the root URL. ES modules require HTTP rather than opening the HTML files directly from disk.

## Media storage

Metadata belongs in `data/catalog.js` during the frontend-only phase. Media files belong under `assets/` during development. Large production audio, video, and full-resolution artwork should eventually use dedicated file or object storage rather than database records or Git history.

## Incremental roadmap

1. Data-driven Gallery
2. Data-driven track list and selected-track audio state — complete
3. Data-driven Film gallery and selected-film player
4. Backend and database when persistent content management is required
5. External media storage and optional administration tools
