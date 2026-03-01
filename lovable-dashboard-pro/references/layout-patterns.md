# Dashboard Layout Patterns Reference

## Overview Dashboard Grid

```
┌─────────┬─────────────────────────────────────────┐
│         │  Breadcrumbs    Search ⌘K    🔔  👤     │
│         ├──────┬──────┬──────┬──────────────────────┤
│  SIDE   │ KPI  │ KPI  │ KPI  │ KPI                 │
│  BAR    ├──────┴──────┴──────┴──────────────────────┤
│         │                    │                      │
│  Nav    │  Line Chart        │  Donut/Pie Chart     │
│  Items  │  (60%)             │  (40%)               │
│         │                    │                      │
│         ├────────────────────┴──────────────────────┤
│         │                                          │
│         │  Data Table (full width)                  │
│         │  Sortable | Filterable | Paginated        │
│         │                                          │
└─────────┴──────────────────────────────────────────┘
```

## Analytical Dashboard Grid

```
┌─────────┬──────────────────────────────────────────┐
│         │  Filter Bar: Date | Status | Category    │
│         ├──────────────┬──────────┬─────────────────┤
│  SIDE   │              │          │                 │
│  BAR    │  Area Chart  │ Bar Chart│  Heatmap        │
│         │  (large)     │ (medium) │  (medium)       │
│  Nav    │              │          │                 │
│  Items  ├──────────────┴──────────┼─────────────────┤
│         │                        │  Drill-down     │
│         │  Comparison Table      │  Detail Panel   │
│         │                        │  (sidebar)      │
└─────────┴────────────────────────┴─────────────────┘
```

## Operational Dashboard Grid

```
┌──┬──────────────────────────────────────────────────┐
│  │  ⚠️ System Status: All Systems Operational  🔄   │
│  ├──────────────┬──────────────┬─────────────────────┤
│  │  CPU: 45%    │  MEM: 72%    │  Conn: 1,247       │
│  │  ▁▂▃▄▅▆▇    │  ████░░░░    │  ▁▂▃▄▅▆▇           │
│  ├──────────────┴──────────────┼─────────────────────┤
│  │                            │  Event Log          │
│  │  Request Latency           │  12:04 ✅ Deploy    │
│  │  p50 / p95 / p99           │  12:01 ⚠️ Latency  │
│  │  (real-time chart)         │  11:58 ✅ Health    │
│  │                            │  11:55 ❌ Error     │
└──┴────────────────────────────┴─────────────────────┘
```

## Responsive Breakpoints

```tsx
// CSS Grid implementation
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* KPI Cards */}
</div>

<div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
  <div className="lg:col-span-3">{/* Primary chart */}</div>
  <div className="lg:col-span-2">{/* Secondary chart */}</div>
</div>
```

## KPI Card Structure

```tsx
<Card className="p-5 hover:-translate-y-0.5 transition-transform">
  <div className="flex items-center justify-between mb-2">
    <span className="text-xs uppercase tracking-wider text-muted-foreground">
      Total Revenue
    </span>
    <DollarSign className="h-4 w-4 text-muted-foreground" />
  </div>
  <div className="text-2xl font-bold tabular-nums">$45,231</div>
  <div className="flex items-center gap-1 mt-1">
    <TrendingUp className="h-3 w-3 text-green-500" />
    <span className="text-xs text-green-500">+20.1%</span>
    <span className="text-xs text-muted-foreground">vs last month</span>
  </div>
  {/* Optional sparkline */}
</Card>
```

## Recharts Configuration Patterns

### Line Chart
```tsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" opacity={0.08} />
    <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
    <YAxis fontSize={12} tickLine={false} axisLine={false} />
    <Tooltip
      contentStyle={{
        backgroundColor: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '8px',
      }}
    />
    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
  </LineChart>
</ResponsiveContainer>
```

### Bar Chart
```tsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" opacity={0.08} />
    <XAxis dataKey="name" fontSize={12} />
    <YAxis fontSize={12} />
    <Tooltip />
    <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
```

## Skeleton Loading Pattern

```tsx
function WidgetSkeleton({ type }: { type: 'kpi' | 'chart' | 'table' }) {
  if (type === 'kpi') return (
    <Card className="p-5 animate-pulse">
      <div className="h-3 w-24 bg-muted rounded mb-4" />
      <div className="h-8 w-32 bg-muted rounded mb-2" />
      <div className="h-3 w-20 bg-muted rounded" />
    </Card>
  )
  if (type === 'chart') return (
    <Card className="p-5 animate-pulse">
      <div className="h-4 w-32 bg-muted rounded mb-4" />
      <div className="h-[300px] bg-muted rounded" />
    </Card>
  )
  // table skeleton with rows...
}
```

## Domain-Specific Widget Suggestions

| Domain               | Recommended Widgets                                      |
|----------------------|----------------------------------------------------------|
| marketing_analytics  | Traffic chart, conversion funnel, campaign table, source pie |
| financial_reporting  | Revenue line, P&L bar, expense breakdown, forecast area  |
| project_management   | Sprint burndown, task status board, velocity chart       |
| devops_monitoring    | Latency timeseries, error rate, deployment log, uptime   |
| crm                  | Pipeline funnel, deal value, activity timeline, contacts |
| healthcare           | Patient flow, bed occupancy, wait times, alerts          |
| sales                | Revenue forecast, deal pipeline, rep leaderboard, quota  |
| hr                   | Headcount trend, attrition rate, hiring funnel, surveys  |
