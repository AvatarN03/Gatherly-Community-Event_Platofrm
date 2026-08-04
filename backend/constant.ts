
// user plan limits
export const PLAN_LIMITS = {
  FREE: {
    communities: 5,
    eventsPerCommunity: 10,
  },
  PRO: {
    communities: 15,
    eventsPerCommunity: 25,
  }
} as const;


// community categories
// export const CATEGORIES = [
//   "General",
//   "Technology",
//   "Education",
//   "Health",
//   "Sports",
//   "Arts",
//   "Business",
//   "Environment",
//   "Food",
//   "Gaming",
//   "Music",
//   "Travel",
//   "Others",
// ] as const;


// event categories
export type EventCategory = (typeof CATEGORIES)[number];

export const EVENT_SUBCATEGORIES: Record<EventCategory, readonly string[]> = {
  General: ["Meetup", "Networking", "Workshop", "Others"],
  Technology: ["Hackathon", "Conference", "Webinar", "CodeSprint", "Others"],
  Education: ["Seminar", "Bootcamp", "Tutoring", "Quiz", "Others"],
  Health: ["Yoga", "MentalHealth", "Nutrition", "Wellness", "Others"],
  Sports: ["Tournament", "Training", "Marathon", "FriendlyMatch", "Others"],
  Arts: ["Exhibition", "Performance", "Workshop", "FilmScreening", "Others"],
  Business: ["Pitch", "Panel", "Networking", "TradeShow", "Others"],
  Environment: ["Cleanup", "Plantation", "Awareness", "Recycling", "Others"],
  Food: ["FoodFestival", "CookingClass", "Tasting", "Bakeoff", "Others"],
  Gaming: ["LAN", "Esports", "BoardGames", "GameJam", "Others"],
  Music: ["Concert", "OpenMic", "JamSession", "MusicWorkshop", "Others"],
  Travel: ["GroupTrip", "Hiking", "CityTour", "Camping", "Others"],
  Others: ["Social", "Charity", "Others"],
};
