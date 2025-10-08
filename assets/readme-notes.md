# Quick Setup

1. Open `index.html` directly in your browser or serve the folder with a simple static server (`python -m http.server`).
2. Update `scripts/data.js` with your real content, links, and thumbnail paths.
3. Keep SVG assets in `/assets`. Replace the placeholder rig, bit, strata, and thumbnail artwork as desired.

# Manual Test Checklist

- [ ] Navigation links scroll smoothly and highlight the active section.
- [ ] `Drill` button animates the drill string through the strata; `Reset` returns to the surface.
- [ ] With `prefers-reduced-motion` enabled, the hero loads in a static drilled state and layer badges fade in.
- [ ] Projects grid renders 6–8 tiles, adapts to breakpoints (≥1100px: 3 columns, 700–1099px: 2 columns, <700px: 1 column).
- [ ] Clicking a project tile opens the modal, focus is trapped, `Esc` and overlay click close it.
- [ ] Theme toggle switches between light and dark, persists on reload, and respects system preference on first load.
- [ ] Copy Email button copies the address from `SITE_DATA.email` and shows the toast message.
- [ ] Footer "Last updated" automatically shows the current date.
- [ ] All interactive elements have visible focus outlines and pass keyboard-only navigation.
- [ ] Lighthouse scores: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥90.
