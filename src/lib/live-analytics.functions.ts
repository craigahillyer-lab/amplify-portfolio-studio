import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  buildLiveStats,
  type EventRow,
  type LiveStats,
  type PageViewRow,
} from "@/lib/live-analytics";

export const fetchLiveStatsFn = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ token: z.string().min(1).max(100) }).parse(data))
  .handler(async ({ data }): Promise<LiveStats> => {
    const expected = process.env["METRICS_TOKEN"] ?? "cvh-9f42x";
    if (data.token !== expected) {
      throw new Error("Unauthorized");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const DAYS = 30;
    const start = new Date(Date.now() - DAYS * 24 * 60 * 60 * 1000).toISOString();

    const [views, events] = await Promise.all([
      supabaseAdmin
        .from("page_views")
        .select("path,referrer,device,visitor_id,created_at")
        .gte("created_at", start)
        .order("created_at", { ascending: true })
        .limit(50000),
      supabaseAdmin
        .from("events")
        .select("event_name,visitor_id,created_at")
        .gte("created_at", start)
        .order("created_at", { ascending: true })
        .limit(50000),
    ]);

    if (views.error) throw new Error("Failed to load traffic data");
    if (events.error) throw new Error("Failed to load event data");

    return buildLiveStats(
      (views.data ?? []) as PageViewRow[],
      (events.data ?? []) as EventRow[],
    );
  });
