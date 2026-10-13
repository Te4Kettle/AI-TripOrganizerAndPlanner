# Optional Google Maps setup

TripSphere no longer requires Google Places autocomplete for the core planner.

The destination search uses geocoding, and local discovery uses OpenStreetMap/Overpass. The route view also has a built-in visual fallback and Google Maps deep links.

If you already have a Google Maps JavaScript API key, you can place it in:

```env
VITE_GOOGLE_PLACE_API_KEY=your_google_maps_key
```

The core trip generator, destination search, day-by-day itinerary and local discovery do not stop working when this key is absent.
