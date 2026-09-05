import type { LucideIcon } from "lucide-react";
import type { SORT_OPTIONS } from "../constant";


export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

export interface NavSection {
  key: string;
  icon: LucideIcon;
  title: string;
  href?: string;
  subItems: NavItem[];
}

export interface NavItem {
  title: string;
  path: string;
  end?: boolean;
  icon: LucideIcon;
}

export type SortBy = typeof SORT_OPTIONS[number]["value"];


// LocationPicker types


export type LatLng = [number, number];

export interface LocationData {
  address: string;
  lat: number;
  lng: number;
}

export interface LocationPickerProps {
  id:string
  onLocationChange: (location: LocationData) => void;
  initialAddress?: string;
  initialLat?: number;
  initialLng?: number;
  disabled?: boolean;
}

export interface SearchResult {
  lat: string;
  lon: string;
  display_name: string;
}

export interface NominatimAddress {
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  city?: string;
  town?: string;
  village?: string;
  state?: string;
}


export type MutateObjectResponse = {
  id?: string;
  message?: string;
  error?: string;
  slug?: string;
}


export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";