"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Mail, CalendarIcon, MessageSquare, Clock, CheckCircle2 } from "lucide-react"
import { mockActivities } from "@/lib/mock-data"
import type { Activity } from "@/lib/types"
import { format } from "date-fns"

interface ActivitiesTabProps {
  leadId: string
}

export function ActivitiesTab({ leadId }: ActivitiesTabProps) {
  const [activities] = useState<Activity[]>(
    mockActivities
      .filter((activity) => activity.leadId === leadId)
      .sort((a, b) => {
        const dateA = a.completedAt || a.dueDate || a.createdAt
        const dateB = b.completedAt || b.dueDate || b.createdAt
        return dateB.getTime() - dateA.getTime()
      }),
  )

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "meeting":
        return <CalendarIcon className="h-4 w-4" />
      case "note":
        return <MessageSquare className="h-4 w-4" />
      case "task":
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "call":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "email":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "meeting":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "note":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "task":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
    }
  }

  const getPriorityColor = (priority: Activity["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "low":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const completedActivities = activities.filter((a) => a.completedAt)
  const upcomingActivities = activities.filter((a) => !a.completedAt && a.dueDate && a.dueDate > new Date())
  const overdueActivities = activities.filter((a) => !a.completedAt && a.dueDate && a.dueDate <= new Date())

  const renderActivity = (activity: Activity) => (
    <Card key={activity.id} className="p-4">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg border ${getActivityColor(activity.type)}`}>
          {getActivityIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-medium">{activity.subject}</h4>
            <Badge variant="outline" className={`border ${getPriorityColor(activity.priority)}`}>
              {activity.priority}
            </Badge>
          </div>
          {activity.description && <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {activity.completedAt
                ? `Completed ${format(activity.completedAt, "MMM d, yyyy 'at' h:mm a")}`
                : activity.dueDate
                  ? `Due ${format(activity.dueDate, "MMM d, yyyy 'at' h:mm a")}`
                  : format(activity.createdAt, "MMM d, yyyy 'at' h:mm a")}
            </span>
            {activity.completedAt ? (
              <Badge variant="outline" className="border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            ) : activity.dueDate && activity.dueDate <= new Date() ? (
              <Badge variant="outline" className="border bg-red-500/10 text-red-500 border-red-500/20">
                Overdue
              </Badge>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All ({activities.length})</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming ({upcomingActivities.length})</TabsTrigger>
        <TabsTrigger value="overdue">Overdue ({overdueActivities.length})</TabsTrigger>
        <TabsTrigger value="completed">Completed ({completedActivities.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-6 space-y-4">
        {activities.length === 0 ? (
          <Card className="p-12">
            <div className="text-center text-muted-foreground">No activities yet</div>
          </Card>
        ) : (
          activities.map(renderActivity)
        )}
      </TabsContent>

      <TabsContent value="upcoming" className="mt-6 space-y-4">
        {upcomingActivities.length === 0 ? (
          <Card className="p-12">
            <div className="text-center text-muted-foreground">No upcoming activities</div>
          </Card>
        ) : (
          upcomingActivities.map(renderActivity)
        )}
      </TabsContent>

      <TabsContent value="overdue" className="mt-6 space-y-4">
        {overdueActivities.length === 0 ? (
          <Card className="p-12">
            <div className="text-center text-muted-foreground">No overdue activities</div>
          </Card>
        ) : (
          overdueActivities.map(renderActivity)
        )}
      </TabsContent>

      <TabsContent value="completed" className="mt-6 space-y-4">
        {completedActivities.length === 0 ? (
          <Card className="p-12">
            <div className="text-center text-muted-foreground">No completed activities</div>
          </Card>
        ) : (
          completedActivities.map(renderActivity)
        )}
      </TabsContent>
    </Tabs>
  )
}
