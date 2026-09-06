import { restFetch } from "@/lib/rest";

export interface PageViewRow {
  path: string;
  referrer: string | null;
  device: string | null;
  visitor_id: string;
  created_at: string;
}

export interface LiveStats {
  fetchedAt: string;
  rangeStart: string;
  rangeEnd: string;
  visitors: number;
  pageviews: number;
  pageviewsPerVisit: number;
  visitorsToday: number;
  daily: { date: string; visitors: number; pageviews: number }[];
  pages: { label: string; value: number }[];
  sources: { label: string; value: number }[];
  devices: { label: string; value: number }[];
}

const DAYS = 30;

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

function topCounts(
  rows: PageViewRow[],
  pick: (r: PageViewRow) => string,
  unique: boolean,
): { label: string; value: number }[] {
  const map = new Map<string, Set<string> | number>();
  for (const row of rows) {
    const key = pick(row) || "Unknown";
    if (unique) {
      const set = (map.get(key) as Set<string>) ?? new Set<string>();
      set.add(row.visitor_id);
      map.set(key, set);
    } else {
      map.set(key, ((map.get(key) as number) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([label, v]) => ({ label, value: unique ? (v as Set<string>).size : (v as number) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
}

const BOT_PROBE_PATHS = new Set(["/imprint", "/impressum", "/contact", "/about", "/"]);
const RAPID_FIRE_MS = 5000;
const RAPID_FIRE_THRESHOLD = 10;

function filterBotRows(rows: PageViewRow[]): PageViewRow[] {
  const byVisitor = new Map<string, PageViewRow[]>();
  for (const row of rows) {
    const list = byVisitor.get(row.visitor_id) ?? [];
    list.push(row);
    byVisitor.set(row.visitor_id, list);
  }

  const botVisitors = new Set<string>();
  for (const [visitorId, hits] of byVisitor.entries()) {
    // No localStorage support is a strong bot/incognito-automation signal.
    if (visitorId === "anonymous") {
      botVisitors.add(visitorId);
      continue;
    }

    // Visitors hitting many pages within a few seconds are almost certainly bots.
    if (hits.length >= RAPID_FIRE_THRESHOLD) {
      const sorted = hits.slice().sort((a, b) => a.created_at.localeCompare(b.created_at));
      let rapid = 0;
      for (let i = 1; i < sorted.length; i++) {
        const t1 = new Date(sorted[i - 1].created_at).getTime();
        const t2 = new Date(sorted[i].created_at).getTime();
        if (t2 - t1 <= RAPID_FIRE_MS) rapid++;
      }
      if (rapid >= RAPID_FIRE_THRESHOLD - 1) {
        botVisitors.add(visitorId);
        continue;
      }
    }

    // Visitors that only sweep common probe pages are likely crawlers.
    const uniquePaths = new Set(hits.map((h) => h.path));
    if (uniquePaths.size >= 3 && [...uniquePaths].every((p) => BOT_PROBE_PATHS.has(p))) {
      botVisitors.add(visitorId);
    }
  }

  return rows.filter((r) => !botVisitors.has(r.visitor_id));
}

export async function fetchLiveStats(): Promise<LiveStats> {
  const now = new Date();
  const start = new Date(now.getTime() - DAYS * 24 * 60 * 60 * 1000);

  const query =
    `page_views?select=path,referrer,device,visitor_id,created_at` +
    `&created_at=gte.${encodeURIComponent(start.toISOString())}` +
    `&order=created_at.asc&limit=50000`;

  const res = await restFetch(query);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const rawRows = ((await res.json()) ?? []) as PageViewRow[];
  const rows = filterBotRows(rawRows);

  const dailyMap = new Map<string, { visitors: Set<string>; pageviews: number }>();
  for (let i = 0; i < DAYS; i++) {
    const d = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    dailyMap.set(d.toISOString().slice(0, 10), { visitors: new Set(), pageviews: 0 });
  }
  const todayKey = now.toISOString().slice(0, 10);
  dailyMap.set(todayKey, dailyMap.get(todayKey) ?? { visitors: new Set(), pageviews: 0 });

  const allVisitors = new Set<string>();
  for (const row of rows) {
    allVisitors.add(row.visitor_id);
    const key = dayKey(row.created_at);
    const bucket = dailyMap.get(key) ?? { visitors: new Set<string>(), pageviews: 0 };
    bucket.visitors.add(row.visitor_id);
    bucket.pageviews += 1;
    dailyMap.set(key, bucket);
  }

  const daily = [...dailyMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, b]) => ({ date, visitors: b.visitors.size, pageviews: b.pageviews }));

  const visitors = allVisitors.size;
  const pageviews = rows.length;

  return {
    fetchedAt: now.toISOString(),
    rangeStart: start.toISOString().slice(0, 10),
    rangeEnd: todayKey,
    visitors,
    pageviews,
    pageviewsPerVisit: visitors ? pageviews / visitors : 0,
    visitorsToday: dailyMap.get(todayKey)?.visitors.size ?? 0,
    daily,
    pages: topCounts(rows, (r) => r.path, false),
    sources: topCounts(rows, (r) => r.referrer ?? "Direct", true),
    devices: topCounts(rows, (r) => r.device ?? "Unknown", true),
  };
}

/** UTC-stable short date, so SSR and client render identically. */
export function formatDayUTC(dateKey: string): string {
  const [, m, d] = dateKey.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[(m ?? 1) - 1]} ${d}`;
}

export function formatTimeUTC(iso: string): string {
  return `${iso.slice(11, 16)} UTC`;
}
