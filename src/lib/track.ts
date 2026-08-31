import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

console.log("track module loaded");
const VISITOR_KEY = "ch_visitor_id";
export const PRIVATE_STATS_PATH = "/cvh-9f42x-metrics";

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
  if (typeof window === "undefined") return "Unknown";
  return window.innerWidth < 768 ? "Mobile" : "Desktop";
}

function getReferrer(): string {
  if (typeof document === "undefined" || !document.referrer) return "Direct";
  try {
    const host = new URL(document.referrer).hostname;
    if (host === window.location.hostname) return "Internal";
    return host.replace(/^www\./, "");
  } catch {
    return "Direct";
  }
}

/** Records a pageview whenever the route path changes (browser only). */
export function usePageviewTracking() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname.startsWith(PRIVATE_STATS_PATH)) return;

    console.log("track: recording", pathname);
    void supabase.from("page_views").insert({
      path: pathname,
      referrer: getReferrer(),
      device: getDevice(),
      visitor_id: getVisitorId(),
    });
  }, [pathname]);
}
