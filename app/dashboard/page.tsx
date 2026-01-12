"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Users, TrendingUp, DollarSign, Target, Phone, Mail, Calendar, CheckCircle2 } from "lucide-react"
import { mockDashboardMetrics, mockLeads, mockDeals, mockActivities } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function DashboardPage() {
  const metrics = mockDashboardMetrics

  // Lead sources data
  const leadSourceData = [
    { name: "Website", value: 45, color: "hsl(var(--chart-1))" },
    { name: "Referral", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Social Media", value: 15, color: "hsl(var(--chart-3))" },
    { name: "Email", value: 10, color: "hsl(var(--chart-4))" },
    { name: "Other", value: 5, color: "hsl(var(--chart-5))" },
  ]

  // Pipeline performance data
  const pipelineData = [
    { stage: "Lead", count: 85, value: 120000 },
    { stage: "Contact", count: 52, value: 95000 },
    { stage: "Proposal", count: 35, value: 78000 },
    { stage: "Negotiation", count: 18, value: 52000 },
    { stage: "Closed Won", count: 12, value: 42000 },
  ]

  // Monthly trends data
  const monthlyData = [
    { month: "Aug", leads: 45, deals: 8, revenue: 85000 },
    { month: "Sep", leads: 52, deals: 10, revenue: 98000 },
    { month: "Oct", leads: 48, deals: 7, revenue: 72000 },
    { month: "Nov", leads: 55, deals: 12, revenue: 110000 },
    { month: "Dec", leads: 62, deals: 15, revenue: 135000 },
    { month: "Jan", leads: 42, deals: 8, revenue: 65000 },
  ]

  // Activity breakdown
  const activityData = [
    { type: "Calls", count: 125, color: "hsl(var(--chart-1))" },
    { type: "Emails", count: 98, color: "hsl(var(--chart-2))" },
    { type: "Meetings", count: 45, color: "hsl(var(--chart-3))" },
    { type: "Tasks", count: 67, color: "hsl(var(--chart-4))" },
    { type: "Notes", count: 82, color: "hsl(var(--chart-5))" },
  ]

  // Recent leads by status
  const leadsByStatus = {
    new: mockLeads.filter((l) => l.status === "new").length,
    contacted: mockLeads.filter((l) => l.status === "contacted").length,
    qualified: mockLeads.filter((l) => l.status === "qualified").length,
    unqualified: mockLeads.filter((l) => l.status === "unqualified").length,
    lost: mockLeads.filter((l) => l.status === "lost").length,
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your leads today.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Leads"
          value={metrics.totalLeads}
          change="+12%"
          subtitle={`${metrics.leadsThisMonth} this month`}
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          title="Qualified Leads"
          value={metrics.qualifiedLeads}
          change="+8%"
          subtitle={`${metrics.conversionRate}% conversion rate`}
          icon={<Target className="h-5 w-5" />}
        />
        <MetricCard
          title="Pipeline Value"
          value={`$${(metrics.pipelineValue / 1000).toFixed(0)}k`}
          change="+15%"
          subtitle={`${mockDeals.length} active deals`}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          title="Avg Deal Size"
          value={`$${(metrics.averageDealValue / 1000).toFixed(1)}k`}
          change="+5%"
          subtitle={`${metrics.dealsWonThisMonth} deals won`}
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Lead Sources</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pipeline Performance */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Pipeline Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="stage" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Monthly Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Leads"
                />
                <Line
                  type="monotone"
                  dataKey="deals"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Deals"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Activity Breakdown */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Activity Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis type="category" dataKey="type" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Lead Status</h3>
            <Users className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            <StatRow label="New" value={leadsByStatus.new} color="bg-cyan-500" />
            <StatRow label="Contacted" value={leadsByStatus.contacted} color="bg-violet-500" />
            <StatRow label="Qualified" value={leadsByStatus.qualified} color="bg-primary" />
            <StatRow label="Unqualified" value={leadsByStatus.unqualified} color="bg-amber-500" />
            <StatRow label="Lost" value={leadsByStatus.lost} color="bg-destructive" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activities</h3>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            <ActivityStat
              icon={<Phone className="h-4 w-4" />}
              label="Calls"
              value={mockActivities.filter((a) => a.type === "call").length}
            />
            <ActivityStat
              icon={<Mail className="h-4 w-4" />}
              label="Emails"
              value={mockActivities.filter((a) => a.type === "email").length}
            />
            <ActivityStat
              icon={<Calendar className="h-4 w-4" />}
              label="Meetings"
              value={mockActivities.filter((a) => a.type === "meeting").length}
            />
            <ActivityStat
              icon={<CheckCircle2 className="h-4 w-4" />}
              label="Completed"
              value={mockActivities.filter((a) => a.completedAt).length}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Performance</h3>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Conversion Rate</span>
                <span className="font-semibold">{metrics.conversionRate}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${metrics.conversionRate}%` }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Pipeline Health</span>
                <span className="font-semibold">78%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "78%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Activity Rate</span>
                <span className="font-semibold">92%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "92%" }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  subtitle,
  icon,
}: {
  title: string
  value: string | number
  change: string
  subtitle: string
  icon: React.ReactNode
}) {
  const isPositive = change.startsWith("+")
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">{icon}</div>
        <span className={cn("text-sm font-medium", isPositive ? "text-primary" : "text-destructive")}>{change}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </Card>
  )
}

function StatRow({ label, value, color }: { label: string; value: number; color: string }) {
  const total = 247 // Total leads
  const percentage = (value / total) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-sm font-semibold">{value}</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className={cn("h-full", color)} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

function ActivityStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="text-muted-foreground">{icon}</div>
        <span className="text-sm">{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
