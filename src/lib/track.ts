import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { restFetch } from "@/lib/rest";

const VISITOR_KEY = "ch_visitor_id";
export const PRIVATE_STATS_PATH = "/cvh-9f42x-metrics";

const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scrape/i,
  /headless/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
  /phantomjs/i,
  /slimerjs/i,
  /datadog/i,
  /uptimerobot/i,
  /pingdom/i,
  /semrush/i,
  /ahrefs/i,
  /moz/i,
  /googlebot/i,
  /bingbot/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandex/i,
];

function isBot(): boolean {
  if (typeof window === "undefined") return false;
  if ((navigator as unknown as { webdriver?: boolean }).webdriver) return true;
  const ua = navigator.userAgent ?? "";
  if (!ua || ua.length < 20) return true;
  if (BOT_PATTERNS.some((re) => re.test(ua))) return true;
  return false;
}

function getVisitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
    return id;
  } catch {
    return "anonymous";
  }
}

function getDevice(): string {
  return window.innerWidth < 768 ? "Mobile" : "Desktop";
}

function getReferrer(): string {
  if (!document.referrer) return "Direct";
  try {
    const host = new URL(document.referrer).hostname;
    if (host === window.location.hostname) return "Internal";
    return host.replace(/^www\./, "");
  } catch {
    return "Direct";
  }
}

const OWNER_KEY = "ch_owner";

/** Records a pageview whenever the route path changes (browser only). */
export function usePageviewTracking() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Visiting the private dashboard marks this browser as the owner: never tracked again.
    if (pathname.toLowerCase().startsWith(PRIVATE_STATS_PATH)) {
      try {
        localStorage.setItem(OWNER_KEY, "1");
      } catch {
        /* ignore */
      }
      return;
    }

    try {
      if (localStorage.getItem(OWNER_KEY) === "1") return;
    } catch {
      /* ignore */
    }

    // Skip known bots and headless clients.
    if (isBot()) return;

    void restFetch("page_views", {
      method: "POST",
      body: JSON.stringify({
        path: pathname,
        referrer: getReferrer(),
        device: getDevice(),
        visitor_id: getVisitorId(),
      }),
    }).catch(() => {});
  }, [pathname]);
}

