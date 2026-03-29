import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../lib/chartSetup";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import {
  BarChart3,
  RefreshCw,
  LayoutGrid,
  SquareChartGantt,
  FolderKanban,
  Activity,
  CheckCircle2,
  PauseCircle,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { projectApi } from "../api/project.api";
import type { Project, ProjectStatus, ProjectType } from "../types/project";
import { PROJECT_STATUSES, PROJECT_TYPES } from "../types/project";
import { format, startOfMonth, subMonths, eachMonthOfInterval } from "date-fns";
import { usePreferencesStore } from "../store/preferencesStore";

type AnalyticsTab = "overview" | "timeline";

const accent = "#F59E0B";

const STATUS_CHART_COLORS: Record<ProjectStatus, string> = {
  PLANNING: "rgba(59, 130, 246, 0.85)",
  IN_PROGRESS: "rgba(234, 179, 8, 0.9)",
  ON_HOLD: "rgba(249, 115, 22, 0.85)",
  COMPLETED: "rgba(34, 197, 94, 0.85)",
  CANCELLED: "rgba(239, 68, 68, 0.75)",
};

const TYPE_CHART_COLORS = [
  "rgba(245, 158, 11, 0.85)",
  "rgba(56, 189, 248, 0.85)",
  "rgba(167, 139, 250, 0.85)",
  "rgba(52, 211, 153, 0.85)",
  "rgba(251, 113, 133, 0.85)",
];

function truncateLabel(name: string, max = 36): string {
  if (name.length <= max) return name;
  return `${name.slice(0, max - 1)}…`;
}

function computeStats(projects: Project[]) {
  const total = projects.length;
  const active = projects.filter(
    (p) => p.status === "IN_PROGRESS" || p.status === "PLANNING",
  ).length;
  const completed = projects.filter((p) => p.status === "COMPLETED").length;
  const suspended = projects.filter((p) => p.status === "ON_HOLD").length;
  return { total, active, completed, suspended };
}

const POLL_MS = 45_000;

const AnalyticsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<AnalyticsTab>("overview");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const theme = usePreferencesStore((s) => s.theme);
  const isDark = theme === "dark";

  const chartTheme = useMemo(() => {
    if (isDark) {
      return {
        tick: "#9ca3af",
        grid: "rgba(64, 64, 64, 0.45)",
        doughnutBorder: "#1a1a1a",
        pointBorder: "#1a1a1a",
        tooltip: {
          backgroundColor: "#262626",
          titleColor: "#fafafa",
          bodyColor: "#d4d4d4",
          borderColor: "#404040",
          borderWidth: 1,
        } as const,
      };
    }
    return {
      tick: "#57534e",
      grid: "rgba(120, 113, 108, 0.22)",
      doughnutBorder: "#ffffff",
      pointBorder: "#ffffff",
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#1c1917",
        bodyColor: "#57534e",
        borderColor: "#e7e5e4",
        borderWidth: 1,
      } as const,
    };
  }, [isDark]);

  const load = useCallback(async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    else setRefreshing(true);
    setError(null);
    try {
      const res = await projectApi.getProjects({ page: 1, limit: 1000 });
      setProjects(res.projects);
      setLastUpdated(new Date());
    } catch (e) {
      console.error(e);
      setError("Could not load project analytics. Try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load(false);
  }, [load]);

  useEffect(() => {
    const id = window.setInterval(() => void load(true), POLL_MS);
    return () => window.clearInterval(id);
  }, [load]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") void load(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [load]);

  const stats = useMemo(() => computeStats(projects), [projects]);

  const statusChartData = useMemo(() => {
    const counts = new Map<ProjectStatus, number>();
    for (const s of PROJECT_STATUSES) counts.set(s.value, 0);
    for (const p of projects) {
      counts.set(p.status, (counts.get(p.status) ?? 0) + 1);
    }
    const entries = PROJECT_STATUSES.filter((s) => (counts.get(s.value) ?? 0) > 0);
    return {
      labels: entries.map((s) => s.label),
      datasets: [
        {
          data: entries.map((s) => counts.get(s.value) ?? 0),
          backgroundColor: entries.map((s) => STATUS_CHART_COLORS[s.value]),
          borderColor: chartTheme.doughnutBorder,
          borderWidth: 2,
        },
      ],
    };
  }, [projects, chartTheme.doughnutBorder]);

  const typeChartData = useMemo(() => {
    const counts = new Map<ProjectType, number>();
    for (const t of PROJECT_TYPES) counts.set(t.value, 0);
    for (const p of projects) {
      counts.set(p.type, (counts.get(p.type) ?? 0) + 1);
    }
    return {
      labels: PROJECT_TYPES.map((t) => t.label),
      datasets: [
        {
          label: "Projects",
          data: PROJECT_TYPES.map((t) => counts.get(t.value) ?? 0),
          backgroundColor: PROJECT_TYPES.map((_, i) => TYPE_CHART_COLORS[i % TYPE_CHART_COLORS.length]),
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  }, [projects]);

  const monthlyCreatedData = useMemo(() => {
    const end = startOfMonth(new Date());
    const start = subMonths(end, 11);
    const months = eachMonthOfInterval({ start, end });
    const labels = months.map((m) => format(m, "MMM yyyy"));
    const counts = months.map((m) => {
      const y = m.getFullYear();
      const mo = m.getMonth();
      return projects.filter((p) => {
        const d = new Date(p.createdAt);
        return d.getFullYear() === y && d.getMonth() === mo;
      }).length;
    });
    return {
      labels,
      datasets: [
        {
          label: "New projects",
          data: counts,
          fill: true,
          tension: 0.35,
          borderColor: accent,
          backgroundColor: "rgba(245, 158, 11, 0.12)",
          pointBackgroundColor: accent,
          pointBorderColor: chartTheme.pointBorder,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [projects, chartTheme.pointBorder]);

  const budgetChartData = useMemo(() => {
    const withBudget = projects
      .filter((p) => p.budget != null && p.budget > 0)
      .sort((a, b) => (b.budget ?? 0) - (a.budget ?? 0))
      .slice(0, 10);
    return {
      labels: withBudget.map((p) => truncateLabel(p.name, 28)),
      datasets: [
        {
          label: "Budget (USD)",
          data: withBudget.map((p) => p.budget ?? 0),
          backgroundColor: "rgba(245, 158, 11, 0.55)",
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    };
  }, [projects]);

  const capacityByTypeData = useMemo(() => {
    const sums = new Map<ProjectType, number>();
    for (const t of PROJECT_TYPES) sums.set(t.value, 0);
    for (const p of projects) {
      if (p.capacity != null && p.capacity > 0) {
        sums.set(p.type, (sums.get(p.type) ?? 0) + p.capacity);
      }
    }
    const activeTypes = PROJECT_TYPES.filter((t) => (sums.get(t.value) ?? 0) > 0);
    return {
      labels: activeTypes.map((t) => t.label),
      datasets: [
        {
          label: "Capacity (MW)",
          data: activeTypes.map((t) => sums.get(t.value) ?? 0),
          backgroundColor: activeTypes.map(
            (_, i) => TYPE_CHART_COLORS[(i + 2) % TYPE_CHART_COLORS.length],
          ),
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  }, [projects]);

  const ganttChartData = useMemo(() => {
    const sorted = [...projects].sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
    const now = Date.now();
    return {
      labels: sorted.map((p) => truncateLabel(p.name, 40)),
      datasets: [
        {
          label: "Schedule",
          data: sorted.map((p) => {
            const start = new Date(p.startDate).getTime();
            const end = p.endDate
              ? new Date(p.endDate).getTime()
              : Math.max(start + 86400000, now);
            return [start, end] as [number, number];
          }),
          backgroundColor: sorted.map((p) => STATUS_CHART_COLORS[p.status]),
          borderRadius: 4,
          borderSkipped: false,
          barThickness: 18,
        },
      ],
    };
  }, [projects]);

  const doughnutOptions = useMemo(
    (): ChartOptions<"doughnut"> => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "62%",
      plugins: {
        legend: {
          position: "right",
          labels: { color: chartTheme.tick, boxWidth: 14, padding: 12 },
        },
        tooltip: chartTheme.tooltip,
      },
    }),
    [chartTheme],
  );

  const barOptions = useMemo(
    (): ChartOptions<"bar"> => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: chartTheme.tick, font: { size: 12 } },
        },
        tooltip: chartTheme.tooltip,
      },
      scales: {
        x: {
          ticks: { color: chartTheme.tick, maxRotation: 45, minRotation: 0 },
          grid: { color: chartTheme.grid },
        },
        y: {
          beginAtZero: true,
          ticks: { color: chartTheme.tick, precision: 0 },
          grid: { color: chartTheme.grid },
        },
      },
    }),
    [chartTheme],
  );

  const lineOptions = useMemo(
    (): ChartOptions<"line"> => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: chartTheme.tick, font: { size: 12 } },
        },
        tooltip: chartTheme.tooltip,
      },
      scales: {
        x: {
          ticks: { color: chartTheme.tick },
          grid: { color: chartTheme.grid },
        },
        y: {
          beginAtZero: true,
          ticks: { color: chartTheme.tick, precision: 0 },
          grid: { color: chartTheme.grid },
        },
      },
    }),
    [chartTheme],
  );

  const budgetHorizontalOptions = useMemo(
    (): ChartOptions<"bar"> => ({
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      plugins: {
        legend: {
          labels: { color: chartTheme.tick, font: { size: 12 } },
        },
        tooltip: {
          ...chartTheme.tooltip,
          callbacks: {
            label: (ctx) => {
              const v = ctx.raw as number;
              return ` ${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(v)}`;
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: chartTheme.tick,
            callback: (value) =>
              new Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(Number(value)),
          },
          grid: { color: chartTheme.grid },
        },
        y: {
          ticks: { color: chartTheme.tick },
          grid: { display: false },
        },
      },
    }),
    [chartTheme],
  );

  const ganttOptions = useMemo(
    (): ChartOptions<"bar"> => ({
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      plugins: {
        legend: { display: false },
        tooltip: {
          ...chartTheme.tooltip,
          callbacks: {
            label: (ctx) => {
              const raw = ctx.raw as [number, number];
              if (!Array.isArray(raw) || raw.length < 2) return "";
              const a = new Date(raw[0]);
              const b = new Date(raw[1]);
              return ` ${format(a, "MMM d, yyyy")} → ${format(b, "MMM d, yyyy")}`;
            },
          },
        },
      },
      scales: {
        x: {
          type: "time",
          time: { unit: "month" },
          ticks: { color: chartTheme.tick, maxTicksLimit: 10 },
          grid: { color: chartTheme.grid },
        },
        y: {
          ticks: { color: chartTheme.tick, autoSkip: false, font: { size: 11 } },
          grid: { display: false },
        },
      },
    }),
    [chartTheme],
  );

  const chartKey = lastUpdated?.getTime() ?? 0;

  const statCards = [
    {
      label: "Total projects",
      value: stats.total,
      icon: FolderKanban,
      accentClass: "text-stone-600 dark:text-gray-200",
      iconBg: "bg-stone-200/90 dark:bg-[#404040]/60",
    },
    {
      label: "Active",
      value: stats.active,
      sub: "Planning & in progress",
      icon: Activity,
      accentClass: "text-amber-700 dark:text-yellow-400",
      iconBg: "bg-amber-500/15",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      accentClass: "text-emerald-700 dark:text-green-400",
      iconBg: "bg-green-500/15",
    },
    {
      label: "Suspended",
      value: stats.suspended,
      sub: "On hold",
      icon: PauseCircle,
      accentClass: "text-orange-700 dark:text-orange-400",
      iconBg: "bg-orange-500/15",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-gray-50 flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-[#F59E0B]" />
            Analytics
          </h1>
          <p className="text-sm text-zinc-500 dark:text-gray-400 mt-1">
            Organization-wide project insights — updates every{" "}
            {POLL_MS / 1000}s and when you return to this tab
          </p>
          {lastUpdated && (
            <p className="mt-2 text-xs text-zinc-500 dark:text-gray-500">
              Last synced {format(lastUpdated, "MMM d, yyyy · h:mm:ss a")}
              {refreshing && (
                <span className="ml-2 text-[#F59E0B]">Refreshing…</span>
              )}
            </p>
          )}
        </div>
        <Button
          variant="secondary"
          size="md"
          onClick={() => void load(true)}
          disabled={refreshing || loading}
          className="shrink-0"
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {error && (
        <Card padding="md" className="border-red-500/40 bg-red-500/5">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} padding="md" className="relative overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-gray-500">{s.label}</p>
                  <p className="mt-1 text-3xl font-semibold tabular-nums text-zinc-900 dark:text-gray-50">
                    {loading ? "—" : s.value}
                  </p>
                  {s.sub && (
                    <p className="mt-1 text-xs text-zinc-500 dark:text-gray-500">{s.sub}</p>
                  )}
                </div>
                <div
                  className={`p-2.5 rounded-xl ${s.iconBg} ${s.accentClass}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-zinc-500 dark:text-gray-500">View</p>
        <div
          className="inline-flex w-full rounded-xl border border-[#e7e2dc] bg-white p-1 dark:border-[#404040] dark:bg-[#0f0f0f] sm:w-auto"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "overview"}
            onClick={() => setTab("overview")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              tab === "overview"
                ? "bg-[#F59E0B]/15 text-[#F59E0B] shadow-sm"
                : "text-zinc-500 dark:text-gray-400 hover:text-zinc-700 dark:text-gray-200"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Overview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "timeline"}
            onClick={() => setTab("timeline")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              tab === "timeline"
                ? "bg-[#F59E0B]/15 text-[#F59E0B] shadow-sm"
                : "text-zinc-500 dark:text-gray-400 hover:text-zinc-700 dark:text-gray-200"
            }`}
          >
            <SquareChartGantt className="w-4 h-4" />
            Timeline
          </button>
        </div>
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card padding="lg">
            <h2 className="text-lg font-medium text-zinc-800 dark:text-gray-100 mb-1">
              Status distribution
            </h2>
            <p className="text-xs text-zinc-500 dark:text-gray-500 mb-4">
              How projects are spread across lifecycle stages
            </p>
            <div className="h-[280px] flex items-center justify-center">
              {!loading && projects.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-gray-500">No project data yet</p>
              ) : (
                <Doughnut
                  key={`status-${chartKey}`}
                  data={statusChartData}
                  options={doughnutOptions}
                />
              )}
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="text-lg font-medium text-zinc-800 dark:text-gray-100 mb-1">
              Projects by energy type
            </h2>
            <p className="text-xs text-zinc-500 dark:text-gray-500 mb-4">
              Count of active portfolio mix
            </p>
            <div className="h-[280px]">
              {!loading && projects.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-zinc-500 dark:text-gray-500">
                  No project data yet
                </div>
              ) : (
                <Bar
                  key={`type-${chartKey}`}
                  data={typeChartData}
                  options={barOptions}
                />
              )}
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="text-lg font-medium text-zinc-800 dark:text-gray-100 mb-1">
              New projects (12 months)
            </h2>
            <p className="text-xs text-zinc-500 dark:text-gray-500 mb-4">
              Created date trend for planning load
            </p>
            <div className="h-[260px]">
              {!loading && projects.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-zinc-500 dark:text-gray-500">
                  No project data yet
                </div>
              ) : (
                <Line
                  key={`line-${chartKey}`}
                  data={monthlyCreatedData}
                  options={lineOptions}
                />
              )}
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="text-lg font-medium text-zinc-800 dark:text-gray-100 mb-1">
              Top budgets
            </h2>
            <p className="text-xs text-zinc-500 dark:text-gray-500 mb-4">
              Up to ten largest budget allocations
            </p>
            <div className="h-[280px]">
              {!loading && budgetChartData.labels.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-zinc-500 dark:text-gray-500">
                  No budget figures recorded
                </div>
              ) : (
                <Bar
                  key={`budget-${chartKey}`}
                  data={budgetChartData}
                  options={budgetHorizontalOptions}
                />
              )}
            </div>
          </Card>

          <Card padding="lg" className="lg:col-span-2">
            <h2 className="text-lg font-medium text-zinc-800 dark:text-gray-100 mb-1">
              Installed capacity by type
            </h2>
            <p className="text-xs text-zinc-500 dark:text-gray-500 mb-4">
              Sum of capacity (MW) where specified
            </p>
            <div className="h-[240px]">
              {!loading && capacityByTypeData.labels.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-zinc-500 dark:text-gray-500">
                  No capacity data recorded
                </div>
              ) : (
                <Bar
                  key={`cap-${chartKey}`}
                  data={capacityByTypeData}
                  options={barOptions}
                />
              )}
            </div>
          </Card>
        </div>
      )}

      {tab === "timeline" && (
        <Card padding="lg">
          <h2 className="text-lg font-medium text-zinc-800 dark:text-gray-100 mb-1">
            Project timeline (Gantt)
          </h2>
          <p className="text-xs text-zinc-500 dark:text-gray-500 mb-4">
            Start and end dates; open-ended projects run to today. Colors match
            status.
          </p>
          <div
            className="w-full overflow-x-auto"
            style={{
              minHeight: Math.min(720, Math.max(320, projects.length * 32 + 80)),
            }}
          >
            {!loading && projects.length === 0 ? (
              <div className="h-[200px] flex items-center justify-center text-sm text-zinc-500 dark:text-gray-500">
                No project data yet
              </div>
            ) : (
              <div
                className="min-w-[640px]"
                style={{ height: Math.min(680, Math.max(280, projects.length * 32 + 64)) }}
              >
                <Bar
                  key={`gantt-${chartKey}`}
                  data={ganttChartData}
                  options={ganttOptions}
                />
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsPage;
