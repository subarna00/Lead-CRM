"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Calendar, TrendingUp, Users, DollarSign } from "lucide-react"
import { mockLeads, mockActivities } from "@/lib/mock-data"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("30")
  const [reportType, setReportType] = useState("overview")

  // Sample data for different report types
  const leadsOverTimeData = [
    { date: "Week 1", new: 12, qualified: 8, lost: 2 },
    { date: "Week 2", new: 15, qualified: 10, lost: 3 },
    { date: "Week 3", new: 18, qualified: 12, lost: 4 },
    { date: "Week 4", new: 14, qualified: 9, lost: 2 },
  ]

  const revenueData = [
    { month: "Aug", revenue: 85000, target: 100000 },
    { month: "Sep", revenue: 98000, target: 100000 },
    { month: "Oct", revenue: 72000, target: 100000 },
    { month: "Nov", revenue: 110000, target: 100000 },
    { month: "Dec", revenue: 135000, target: 120000 },
    { month: "Jan", revenue: 65000, target: 120000 },
  ]

  const salesRepPerformance = [
    { name: "Sarah Johnson", deals: 15, revenue: 185000 },
    { name: "Mike Chen", deals: 12, revenue: 142000 },
    { name: "Emily Rodriguez", deals: 10, revenue: 128000 },
  ]

  return (
    <>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights into your sales performance</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Report Type Selector */}
        <Card className="p-4">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Sales Overview</SelectItem>
              <SelectItem value="leads">Lead Performance</SelectItem>
              <SelectItem value="revenue">Revenue Analysis</SelectItem>
              <SelectItem value="team">Team Performance</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{mockLeads.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">36%</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$485k</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Activities</p>
                <p className="text-2xl font-bold">{mockActivities.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads Over Time */}
          <Card className="p-6">
            <h3 className="font-semibold mb-6">Leads Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={leadsOverTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="new" stroke="hsl(var(--chart-1))" strokeWidth={2} name="New Leads" />
                  <Line
                    type="monotone"
                    dataKey="qualified"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Qualified"
                  />
                  <Line type="monotone" dataKey="lost" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Lost" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Revenue Analysis */}
          <Card className="p-6">
            <h3 className="font-semibold mb-6">Revenue vs Target</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
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
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Revenue" />
                  <Bar dataKey="target" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Team Performance Table */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Sales Rep Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sales Rep</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Deals Closed</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Avg Deal Size</th>
                </tr>
              </thead>
              <tbody>
                {salesRepPerformance.map((rep) => (
                  <tr key={rep.name} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 font-medium">{rep.name}</td>
                    <td className="py-3 px-4">{rep.deals}</td>
                    <td className="py-3 px-4">${(rep.revenue / 1000).toFixed(0)}k</td>
                    <td className="py-3 px-4">${(rep.revenue / rep.deals / 1000).toFixed(1)}k</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}
