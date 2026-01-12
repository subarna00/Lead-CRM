"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Phone, Mail, Calendar, FileText, CheckCircle2, Circle, Search } from "lucide-react"
import { mockActivities, mockLeads } from "@/lib/mock-data"
import type { Activity, ActivityType } from "@/lib/types"
import { CreateActivityDialog } from "@/components/create-activity-dialog"
import { cn } from "@/lib/utils"

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<ActivityType | "all">("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending">("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateActivity = (newActivity: Activity) => {
    setActivities([newActivity, ...activities])
  }

  const handleCompleteActivity = (activityId: string) => {
    setActivities(
      activities.map((activity) =>
        activity.id === activityId ? { ...activity, completedAt: new Date(), updatedAt: new Date() } : activity,
      ),
    )
  }

  const filteredActivities = activities.filter((activity) => {
    const lead = mockLeads.find((l) => l.id === activity.leadId)
    const matchesSearch =
      activity.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead?.lastName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || activity.type === typeFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && activity.completedAt) ||
      (statusFilter === "pending" && !activity.completedAt)

    return matchesSearch && matchesType && matchesStatus
  })

  const upcomingActivities = filteredActivities
    .filter((a) => !a.completedAt && a.dueDate && new Date(a.dueDate) >= new Date())
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())

  const overdueActivities = filteredActivities
    .filter((a) => !a.completedAt && a.dueDate && new Date(a.dueDate) < new Date())
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())

  const completedActivities = filteredActivities
    .filter((a) => a.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())

  const allActivities = filteredActivities.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Activities</h1>
            <p className="text-muted-foreground">Track and manage all interactions with your leads</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as ActivityType | "all")}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="email">Emails</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="note">Notes</SelectItem>
                <SelectItem value="task">Tasks</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as "all" | "completed" | "pending")}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Activity Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              All{" "}
              <Badge variant="secondary" className="ml-2">
                {allActivities.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              Upcoming{" "}
              <Badge variant="secondary" className="ml-2">
                {upcomingActivities.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="overdue">
              Overdue{" "}
              <Badge variant="secondary" className="ml-2">
                {overdueActivities.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed{" "}
              <Badge variant="secondary" className="ml-2">
                {completedActivities.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ActivityList activities={allActivities} onComplete={handleCompleteActivity} />
          </TabsContent>
          <TabsContent value="upcoming">
            <ActivityList activities={upcomingActivities} onComplete={handleCompleteActivity} />
          </TabsContent>
          <TabsContent value="overdue">
            <ActivityList activities={overdueActivities} onComplete={handleCompleteActivity} />
          </TabsContent>
          <TabsContent value="completed">
            <ActivityList activities={completedActivities} onComplete={handleCompleteActivity} />
          </TabsContent>
        </Tabs>
      </div>

      <CreateActivityDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateActivity={handleCreateActivity}
      />
    </>
  )
}

function ActivityList({
  activities,
  onComplete,
}: {
  activities: Activity[]
  onComplete: (id: string) => void
}) {
  if (activities.length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center text-muted-foreground">
          <p>No activities found</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => {
        const lead = mockLeads.find((l) => l.id === activity.leadId)
        return <ActivityCard key={activity.id} activity={activity} lead={lead} onComplete={onComplete} />
      })}
    </div>
  )
}

function ActivityCard({
  activity,
  lead,
  onComplete,
}: {
  activity: Activity
  lead?: (typeof mockLeads)[0]
  onComplete: (id: string) => void
}) {
  const getActivityIcon = (type: ActivityType) => {
    const icons = {
      call: Phone,
      email: Mail,
      meeting: Calendar,
      note: FileText,
      task: CheckCircle2,
    }
    const Icon = icons[type]
    return <Icon className="h-5 w-5" />
  }

  const getActivityColor = (type: ActivityType) => {
    const colors = {
      call: "text-blue-500 bg-blue-500/10",
      email: "text-purple-500 bg-purple-500/10",
      meeting: "text-primary bg-primary/10",
      note: "text-yellow-500 bg-yellow-500/10",
      task: "text-orange-500 bg-orange-500/10",
    }
    return colors[type]
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "bg-red-500/10 text-red-500 border-red-500/20",
      medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      low: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    }
    return colors[priority as keyof typeof colors] || colors.low
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isOverdue = activity.dueDate && !activity.completedAt && new Date(activity.dueDate) < new Date()

  return (
    <Card className={cn("p-4 hover:border-primary/50 transition-colors", isOverdue && "border-red-500/50")}>
      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
            getActivityColor(activity.type),
          )}
        >
          {getActivityIcon(activity.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold mb-1">{activity.subject}</h3>
              {lead && (
                <p className="text-sm text-muted-foreground">
                  {lead.firstName} {lead.lastName} • {lead.company}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={cn("border capitalize", getPriorityColor(activity.priority))}>
                {activity.priority}
              </Badge>
              {!activity.completedAt && (
                <Button size="sm" variant="ghost" onClick={() => onComplete(activity.id)}>
                  <Circle className="h-4 w-4" />
                </Button>
              )}
              {activity.completedAt && <CheckCircle2 className="h-5 w-5 text-primary" />}
            </div>
          </div>

          {activity.description && (
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{activity.description}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Badge variant="secondary" className="capitalize">
              {activity.type}
            </Badge>
            {activity.dueDate && (
              <div className={cn("flex items-center gap-1", isOverdue && "text-red-500")}>
                <Calendar className="h-3 w-3" />
                {formatDate(activity.dueDate)}
                {isOverdue && <span className="font-medium">(Overdue)</span>}
              </div>
            )}
            {activity.completedAt && (
              <div className="flex items-center gap-1 text-primary">
                <CheckCircle2 className="h-3 w-3" />
                Completed {formatDate(activity.completedAt)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
