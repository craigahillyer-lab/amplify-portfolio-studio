import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Users, Eye, Clock, MousePointerClick, Calendar } from "lucide-react";
import { latestAnalytics, formatDuration, formatDate } from "@/lib/analytics";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Private Stats — Craig Hillyer" },
      { name: "description", content: "Private analytics dashboard for Craig Hillyer's portfolio." },
      { property: "og:title", content: "Private Stats — Craig Hillyer" },
      { property: "og:description", content: "Private analytics dashboard for Craig Hillyer's portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: StatsPage,
});

function StatsPage() {
  const data = latestAnalytics;
  const maxVisitors = Math.max(...data.daily.map((d) => d.visitors), 1);
  const activeDays = data.daily.filter((d) => d.visitors > 0);

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              / Private
            </div>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Site analytics
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {formatDate(data.period.start)} — {formatDate(data.period.end)} · snapshot from{" "}
              {new Date(data.generatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 self-start rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Users className="h-5 w-5 text-primary" />}
            label="Visitors"
            value={data.totals.visitors.toLocaleString()}
          />
          <StatCard
            icon={<Eye className="h-5 w-5 text-primary" />}
            label="Pageviews"
            value={data.totals.pageviews.toLocaleString()}
          />
          <StatCard
            icon={<MousePointerClick className="h-5 w-5 text-primary" />}
            label="Pages / visit"
            value={data.totals.pageviewsPerVisit.toFixed(2)}
          />
          <StatCard
            icon={<Clock className="h-5 w-5 text-primary" />}
            label="Avg. session"
            value={formatDuration(data.totals.sessionDurationSeconds)}
          />
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6 backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-medium tracking-tight">Daily traffic</h2>
          </div>
          <div className="flex h-48 items-end justify-center gap-3 md:gap-6">
            {activeDays.map((day) => {
              const height = `${Math.max(20, (day.visitors / maxVisitors) * 100)}%`;
              return (
                <div key={day.date} className="group relative flex w-16 flex-col items-center gap-3 md:w-24">
                  <div className="flex h-full w-full items-end">
                    <div
                      className="w-full rounded-t-md bg-primary/80 transition-all group-hover:bg-primary"
                      style={{ height }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium text-foreground">
                      {day.visitors}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {formatDate(day.date)}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -top-10 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs text-card-foreground shadow-sm group-hover:block">
                    {day.visitors} visitors · {day.pageviews} pageviews
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            {activeDays.length} active days in {formatDate(data.period.start)} — {formatDate(data.period.end)}
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <BreakdownCard title="Top pages" rows={data.pages.map((p) => ({ label: p.path, value: p.views }))} />
          <BreakdownCard title="Traffic sources" rows={data.sources.map((s) => ({ label: s.source, value: s.visitors }))} />
          <BreakdownCard title="Devices" rows={data.devices.map((d) => ({ label: d.device, value: d.visitors }))} />
          <BreakdownCard title="Countries" rows={data.countries.map((c) => ({ label: c.country, value: c.visitors }))} />
        </section>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          This page is not linked publicly. Data is pulled from Lovable native analytics.
        </p>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
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
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
