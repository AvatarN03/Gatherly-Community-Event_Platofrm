export const formatDate = (
    date: string | Date,
    options?: Intl.DateTimeFormatOptions
) => {
    return new Date(date).toLocaleDateString(
        "en-IN",
        options ?? {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );
};

export const formatLabel = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
};

export const formatDistanceToNow = (date: string | Date) => {
  const targetDate = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }

  return "just now";
};