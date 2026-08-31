export interface AnalyticsSnapshot {
  generatedAt: string;
  period: { start: string; end: string };
  totals: {
    visitors: number;
    pageviews: number;
    pageviewsPerVisit: number;
    sessionDurationSeconds: number;
    bounceRate: number;
  };
  daily: {
    date: string;
    visitors: number;
    pageviews: number;
    pageviewsPerVisit: number;
    sessionDurationSeconds: number;
    bounceRate: number;
  }[];
  pages: { path: string; views: number }[];
  sources: { source: string; visitors: number }[];
  devices: { device: string; visitors: number }[];
  countries: { country: string; visitors: number }[];
}

export const latestAnalytics: AnalyticsSnapshot = {
  generatedAt: "2026-08-31T19:54:00Z",
  period: { start: "2026-08-01", end: "2026-08-31" },
  totals: {
    visitors: 63,
    pageviews: 150,
    pageviewsPerVisit: 2.38,
    sessionDurationSeconds: 193,
    bounceRate: 63,
  },
  daily: [
    { date: "2026-08-01", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-02", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-03", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-04", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-05", visitors: 2, pageviews: 19, pageviewsPerVisit: 9.5, sessionDurationSeconds: 487, bounceRate: 0 },
    { date: "2026-08-06", visitors: 1, pageviews: 1, pageviewsPerVisit: 1, sessionDurationSeconds: 0, bounceRate: 100 },
    { date: "2026-08-07", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-08", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-09", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-10", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-11", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-12", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-13", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-14", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-15", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-16", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-17", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-18", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-19", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-20", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-21", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-22", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-23", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-24", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-25", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-26", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-27", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-28", visitors: 0, pageviews: 0, pageviewsPerVisit: 0, sessionDurationSeconds: 0, bounceRate: 0 },
    { date: "2026-08-29", visitors: 4, pageviews: 5, pageviewsPerVisit: 1.25, sessionDurationSeconds: 23, bounceRate: 75 },
    { date: "2026-08-30", visitors: 27, pageviews: 47, pageviewsPerVisit: 1.74, sessionDurationSeconds: 230, bounceRate: 70 },
    { date: "2026-08-31", visitors: 29, pageviews: 78, pageviewsPerVisit: 2.69, sessionDurationSeconds: 226, bounceRate: 69 },
  ],
  pages: [
    { path: "/", views: 63 },
    { path: "/contact", views: 2 },
    { path: "/imprint", views: 2 },
    { path: "/about", views: 2 },
    { path: "/impressum", views: 2 },
  ],
  sources: [
    { source: "Direct", visitors: 62 },
    { source: "bing.com", visitors: 1 },
  ],
  devices: [
    { device: "Mobile", visitors: 36 },
    { device: "Desktop", visitors: 27 },
  ],
  countries: [
    { country: "Unknown", visitors: 40 },
    { country: "United States", visitors: 21 },
    { country: "Moldova", visitors: 2 },
  ],
};

export function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.round(totalSeconds % 60);
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
