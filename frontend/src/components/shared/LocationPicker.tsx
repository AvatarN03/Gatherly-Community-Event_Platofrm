import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin,  Loader2, Search, MapPinHouse } from "lucide-react";
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  FieldClass,
  LOCATION_ZOOM,
  MIN_SEARCH_LENGTH,
  SEARCH_DEBOUNCE_MS,
} from "../../constant.ts";
import type { LocationPickerProps, LatLng, SearchResult } from "../../types";
import { forwardGeocode, reverseGeocode } from "../../lib/geocoding.ts";

// @ts-expect-error - _getIconUrl is a private Leaflet property that must be removed
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const blueIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ============================================================
// Small map sub-components
// ============================================================

/** Pans/zooms the map whenever `position` changes. */
function FlyToPosition({ position }: { position: LatLng }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, LOCATION_ZOOM);
  }, [position, map]);
  return null;
}

/** Registers a click listener on the map. */
function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (latlng: L.LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

/** Draggable pin marker. `disabled` is now passed in explicitly (was a bug before). */
function DraggableMarker({
  position,
  onDragEnd,
  disabled,
}: {
  position: LatLng;
  onDragEnd: (latlng: L.LatLng) => void;
  disabled: boolean;
}) {
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) onDragEnd(marker.getLatLng());
      },
    }),
    [onDragEnd],
  );

  return (
    <Marker
      draggable={!disabled}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={blueIcon}
    />
  );
}

const LocationPicker = ({
  id,
  onLocationChange,
  initialAddress = "",
  initialLat,
  initialLng,
  disabled = false,
}: LocationPickerProps) => {
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState<LatLng | null>(
    initialLat != null && initialLng != null ? [initialLat, initialLng] : null,
  );
  const [address, setAddress] = useState(initialAddress);
  const [isLocating, setIsLocating] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchAbortRef = useRef<AbortController | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close the search dropdown when clicking outside of it.
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced place search as the user types.
  // Aborts any in-flight request when a newer keystroke supersedes it,
  // so a slow older response can't overwrite fresher results.
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!searchQuery || searchQuery.length < MIN_SEARCH_LENGTH) {
      setSearchResults([]);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      searchAbortRef.current?.abort();
      const controller = new AbortController();
      searchAbortRef.current = controller;

      setIsSearching(true);
      const results = await forwardGeocode(searchQuery, controller.signal);
      setSearchResults(results);
      setShowResults(true);
      setIsSearching(false);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery]);

  /** Single place that updates position + address state and notifies the parent form. */
  const updateLocation = useCallback(
    async (lat: number, lng: number, addr?: string) => {
      setPosition([lat, lng]);
      const resolvedAddress = addr ?? (await reverseGeocode(lat, lng));
      setAddress(resolvedAddress);
      onLocationChange({ address: resolvedAddress, lat, lng });
    },
    [onLocationChange],
  );

  const handleMapClick = useCallback(
    (latlng: L.LatLng) => {
      if (disabled) return;
      updateLocation(latlng.lat, latlng.lng);
    },
    [disabled, updateLocation],
  );

  const handleMarkerDrag = useCallback(
    (latlng: L.LatLng) => {
      updateLocation(latlng.lat, latlng.lng);
    },
    [updateLocation],
  );

  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateLocation(pos.coords.latitude, pos.coords.longitude);
        setIsLocating(false);
      },
      () => setIsLocating(false),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [updateLocation]);

  const handleSearchSelect = useCallback(
    (result: SearchResult) => {
      updateLocation(
        parseFloat(result.lat),
        parseFloat(result.lon),
        result.display_name,
      );
      setSearchQuery("");
      setShowResults(false);
    },
    [updateLocation],
  );

  // Auto-detect the user's location on first mount if none was provided.
  useEffect(() => {
    if (!position) handleDetectLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div ref={searchContainerRef} className="relative">
        <div className="flex gap-2">
          <div className={FieldClass.formClass}>
            <Search className="w-4 h-4 " />
            <input
              type="text"
              id={id}
              disabled={disabled}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
              placeholder="Search for a place... min(3 chars)"
              className={FieldClass.inputClass}
            />
            {isSearching && (
              <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
            )}
          </div>
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={disabled || isLocating}
            className="flex items-center px-2 md:w-24 p-.5  border border-teal-600/50  bg-teal-300 text-teal-950  text-xs rounded-md disabled:opacity-50 cursor-pointer active:scale-90"
            title="Use my current location"
          >
            {isLocating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MapPinHouse className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {isLocating ? "Detecting..." : "Location"}
            </span>
          </button>
        </div>

        {/* Search results dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-1000 top-full mt-1 w-full bg-teal-100 rounded-xl  border border-gray-200  overflow-y-auto">
            {searchResults.map((result, i) => (
              <button
                key={i}
                type="button"
                className="w-full text-left px-2 py-2 text-sm hover:bg-teal-200  border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors"
                onClick={() => handleSearchSelect(result)}
              >
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-teal-800 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2 text-[12px]">{result.display_name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setShowMap((prev) => !prev)}
        disabled={disabled}
        className="self-start cursor-pointer rounded-md border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700 transition-colors hover:bg-teal-100 disabled:opacity-50"
      >
        {showMap ? "Hide map" : "Show map"}
      </button>

      {showMap && (
        <div
          className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg"
          style={{ height: "280px" }}
        >
          <MapContainer
            center={position || DEFAULT_CENTER}
            zoom={position ? LOCATION_ZOOM : DEFAULT_ZOOM}
            scrollWheelZoom={!disabled}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onMapClick={handleMapClick} />
            {position && (
              <>
                <FlyToPosition position={position} />
                <DraggableMarker
                  position={position}
                  onDragEnd={handleMarkerDrag}
                  disabled={disabled}
                />
              </>
            )}
          </MapContainer>
          {!position && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10 pointer-events-none">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg text-center">
                <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Click on the map to place a pin
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  or use the search / auto-detect above
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Address display */}
      {address && (
        <div className="flex items-center gap-3 p-2 rounded-xl bg-cyan-200 border border-teal-600 shadow-sm">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-600/10 shrink-0">
            <MapPin className="w-4 h-4 text-teal-800" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold tracking-wide uppercase text-teal-800">
              Selected Location
            </p>
            <p className="text-sm font-medium text-teal-900 wrap-break-words leading-snug mt-0.5">
              {address}
            </p>
            {position && (
              <p className="text-xs text-teal-700 mt-1 font-mono tracking-tight">
                {position[0].toFixed(6)}, {position[1].toFixed(6)}
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default LocationPicker;
