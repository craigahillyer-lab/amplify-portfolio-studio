import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Users, Eye, MousePointerClick, Calendar, RefreshCw, Sun } from "lucide-react";
import { fetchLiveStats, formatDayUTC, formatTimeUTC } from "@/lib/live-analytics";

export const Route = createFileRoute("/cvh-9f42x-metrics")({
  head: () => ({
    meta: [
      { title: "Private Metrics — Craig Hillyer" },
      { name: "description", content: "Private live traffic dashboard for Craig Hillyer's portfolio." },
      { property: "og:title", content: "Private Metrics" },
      { property: "og:description", content: "Private live traffic dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "googlebot", content: "noindex, nofollow" },
    ],
  }),
  component: MetricsPage,
});

function MetricsPage() {
  const { data, isLoading, isError, error, isFetching, dataUpdatedAt, refetch } = useQuery({
    queryKey: ["live-stats"],
    queryFn: fetchLiveStats,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  });

  const activeDays = (data?.daily ?? []).filter((d) => d.pageviews > 0);
  const maxViews = Math.max(...activeDays.map((d) => d.pageviews), 1);

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              / Private
            </div>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Live site traffic
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Last 30 days · auto-refreshes every 30 seconds
              {data ? ` · updated ${formatTimeUTC(new Date(dataUpdatedAt).toISOString())}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => void refetch()}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Portfolio
            </Link>
          </div>
        </div>

        {isError && (
          <div role="alert" className="mb-8 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
            Couldn't load traffic data: {(error as Error).message}
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Users className="h-5 w-5 text-primary" />} label="Visitors" value={data ? data.visitors.toLocaleString() : "—"} />
          <StatCard icon={<Eye className="h-5 w-5 text-primary" />} label="Pageviews" value={data ? data.pageviews.toLocaleString() : "—"} />
          <StatCard icon={<MousePointerClick className="h-5 w-5 text-primary" />} label="Pages / visit" value={data ? data.pageviewsPerVisit.toFixed(2) : "—"} />
          <StatCard icon={<Sun className="h-5 w-5 text-primary" />} label="Visitors today" value={data ? data.visitorsToday.toLocaleString() : "—"} />
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6 backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-medium tracking-tight">Daily traffic</h2>
          </div>

          {isLoading ? (
            <div className="h-56 animate-pulse rounded-lg bg-secondary/60" />
          ) : activeDays.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No visits recorded yet. Data starts collecting from now on.
            </p>
          ) : (
            <div className="flex h-56 items-stretch justify-center gap-2 overflow-x-auto md:gap-4">
              {activeDays.map((day) => {
                const height = `${Math.max(6, (day.pageviews / maxViews) * 100)}%`;
                return (
                  <div key={day.date} className="group flex h-full w-14 shrink-0 flex-col items-center md:w-20">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-md bg-primary/80 transition-all group-hover:bg-primary"
                        style={{ height }}
                        title={`${day.visitors} visitors · ${day.pageviews} pageviews`}
                      />
                    </div>
                    <div className="mt-3 shrink-0 text-center">
                      <div className="text-xs font-medium text-foreground">{day.pageviews}</div>
                      <div className="font-mono text-[10px] text-primary">{day.visitors} uniq</div>
                      <div className="text-[10px] text-muted-foreground">{formatDayUTC(day.date)}</div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {data && activeDays.length > 0 && (
            <div className="mt-6 text-center text-xs text-muted-foreground">
              Bars show pageviews · {activeDays.length} active days since {formatDayUTC(data.rangeStart)}
            </div>
          )}
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <BreakdownCard title="Top pages" rows={data?.pages ?? []} />
          <BreakdownCard title="Traffic sources" rows={data?.sources ?? []} />
          <BreakdownCard title="Devices" rows={data?.devices ?? []} />
        </section>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Private page — unlisted and hidden from search engines. Visits to this page are not tracked.
        </p>
      </div>
    </main>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5 backdrop-blur-sm transition-colors hover:bg-secondary/60">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-3 font-display text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function BreakdownCard({ title, rows }: { title: string; rows: { label: string; value: number }[] }) {
  const total = rows.reduce((sum, r) => sum + r.value, 0) || 1;
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-6 backdrop-blur-sm">
      <h3 className="mb-4 font-display text-lg font-medium tracking-tight">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => {
            const pct = Math.round((row.value / total) * 100);
            return (
              <div key={row.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="truncate pr-4 font-medium text-foreground">{row.label}</span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {row.value.toLocaleString()} · {pct}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
