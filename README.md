# FitTrack — Frontend Only
A lightweight calorie + fitness tracker inspired by MyFitnessPal + Apple Health rings.

- Pure HTML/CSS/JS (no frameworks, no canvas). Charts are **SVG**.
- Data persists in `localStorage`.
- Features: daily rings (calories/exercise/steps), food & activity logging, macro goals, 14-day history with SVG line chart, mock Apple Health import.

## Run
Just open `index.html` in a modern browser.

## Files
- `index.html` — shell & navigation
- `style.css` — minimal but polished styling
- `app.js` — app logic, routing, SVG charts, modals
- `data/foods.json` — small mock food db

## Notes
- All charts are SVG (no canvas).
- Replace `data/foods.json` with your own dataset or wire this up to an API.
