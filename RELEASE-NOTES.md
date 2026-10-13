# TripSphere – Live Services Update v3

## City-independent live discovery

- Event discovery is no longer hardcoded to Indore.
- TripSphere now queries city-specific AllEvents pages (`events`, `upcoming`, and city pages) plus BookMyShow city event pages.
- Event links are resolved to event detail pages and JSON-LD event records are filtered against the traveller's actual trip dates.
- Supported event types include concerts, stand-up/comedy, music, theatre/performances, exhibitions, festivals and workshops.
- If a provider blocks server-side extraction, TripSphere keeps the event section useful with a direct city-specific live event directory rather than an empty/error state. No event name/date is fabricated in this fallback.

## City-independent rail discovery

- Expanded station-name/code resolution across major Indian cities and railway stations.
- Added a second public railway schedule provider for trains between supported stations.
- Existing live availability provider remains available as a second provider.
- When seat inventory is unavailable, scheduled trains can still be shown and the user can continue to the live booking/search provider.
- Unknown station names are handled with a polished live search card and Google route search rather than a broken empty-state message.
- TripSphere never invents seat counts or fares.

## Checkout

- The realistic local checkout/payment-flow UI remains restored.
- It supports UPI, card, wallet and net banking screens, order summary, confirmation state and booking ID generation.
- It is a test checkout unless real merchant/payment-gateway credentials are connected; no real charge is represented as completed.

## Deployment

Works with both Vercel-style `/api/*` handlers and Netlify Functions.

## v4 — Event Discovery + My Trips Management

- Reworked Live Experiences into an in-app discovery browser with category chips, date filters, and event search.
- Added live category queries for music, comedy/stand-up, arts, exhibitions, dance/parties, festivals, sports, theatre, workshops, food & drink, business, family, performances and more.
- Search is performed through the TripSphere event API and displayed inside TripSphere; the UI no longer sends users to Google to search for events.
- Event results are filtered to the user's trip dates and can be narrowed to today/weekend in the UI.
- Added professional My Trips management: Select Trips mode, per-trip selection, delete selected trips, and individual delete controls with confirmation.
- Added `deleteTrip` and `deleteTrips` to TripStore.

## All Events aggregate fix
- Fixed the All events view so it aggregates city feeds, category feeds, BookMyShow, and broad live keyword searches.
- The All events view no longer becomes empty just because one provider/category page is sparse.
- Added a city-directory fallback card when public providers temporarily return no individual listings.
- Category-specific and search behavior remains city-independent.
