import type {NominatimAddress, SearchResult} from "../types";


/** Reverse geocode: lat/lng -> a short, human-readable address. */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`,
            { headers: { 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        if (!data?.display_name) return '';

        const addr: NominatimAddress = data.address || {};
        const parts = [
            addr.road,
            addr.neighbourhood || addr.suburb,
            addr.city || addr.town || addr.village,
            addr.state,
        ].filter(Boolean);

        return parts.length >= 2 ? parts.join(', ') : data.display_name;
    } catch {
        return '';
    }
}

/** Forward geocode: free-text query -> candidate places (restricted to India). */
export async function forwardGeocode(query: string, signal?: AbortSignal): Promise<SearchResult[]> {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=in`,
            { headers: { 'Accept-Language': 'en' }, signal }
        );
        return await res.json();
    } catch {
        return [];
    }
}