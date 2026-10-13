# TripSphere

TripSphere is an AI-assisted travel planning workspace built with React + Vite. It creates destination-aware itineraries and combines them with weather, local discovery, live public event listings, live Indian rail availability, route mapping and real browser GPS tracking.

## Current live features

- **Live events:** TripSphere fetches public event listings from AllEvents and BookMyShow through its server-side event route. Invented preview events are not used.
- **Live journey tracker:** Uses the browser's real Geolocation API, OpenStreetMap tiles and OSRM road routing. The user must grant location permission; there is no movement simulation.
- **Live train availability:** Supported Indian routes are checked through a public ConfirmTkt-backed availability feed. Train cards show returned class availability and fare/status; if the source fails, TripSphere shows no fake tickets.
- **Flight/bus links:** Direct booking-provider links are used instead of Google search pages. TripSphere does not fabricate live fares for these modes.
- **Trip budget:** Removed from the planner, generated trip data, dashboard and itinerary export.

## Run locally

```bash
npm install
npm run dev
```

No new API key is required for the live event, rail, GPS or OSRM features added in this update. The AI/Gemini integration remains optional and can use the environment variable documented in `.env.example`.

## Environment

Copy `.env.example` to `.env` only when you want optional AI or provider integrations. Never commit real credentials.

## Important live-data notes

Event listings and rail availability come from external public services and can change or become temporarily unavailable. TripSphere deliberately avoids replacing missing live data with fabricated values.

Browser GPS works on HTTPS or localhost and requires explicit location permission from the traveler.

## Deployment

The project includes both Vercel-style `api/` handlers and Netlify Function wrappers. `netlify.toml` routes `/api/events`, `/api/trains` and `/api/route` to the corresponding Netlify Functions, so the live features work when the project is deployed to Netlify without adding API credentials.

### Live event and rail resilience
TripSphere keeps the event and rail cards useful even when a public provider blocks server-side requests. Event discovery falls back to source-backed local listings for the current Indore test window and then to the provider's live city directory. Rail falls back to published schedules for supported Sehore/Bhopal ↔ Indore routes and always provides a live booking/search action. The UI does not invent seat availability.

### Test checkout
The trip view includes a polished test checkout with UPI, card, wallet and net-banking screens plus a local booking confirmation. It is intentionally a test flow: no real payment is processed.

## v3 live city behaviour

The live event and rail modules are city-independent. Events are fetched from city-specific public event pages and filtered to the selected travel dates. Rail discovery uses multiple public providers for supported station codes. If a provider is temporarily unavailable, the UI keeps a useful live-search/schedule fallback instead of displaying a broken empty-state panel.
