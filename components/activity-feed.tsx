"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, CalendarIcon, MessageSquare, CheckCircle2, Clock, ArrowRight } from "lucide-react"
import { mockActivities } from "@/lib/mock-data"
import type { Activity } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface ActivityFeedProps {
  leadId: string
  limit?: number
  showViewAll?: boolean
  onViewAll?: () => void
}

export function ActivityFeed({ leadId, limit = 5, showViewAll = true, onViewAll }: ActivityFeedProps) {
  const activities = mockActivities
    .filter((activity) => activity.leadId === leadId)
    .sort((a, b) => {
      const dateA = a.completedAt || a.dueDate || a.createdAt
      const dateB = b.completedAt || b.dueDate || b.createdAt
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, limit)

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "call":
        return <Phone className="h-3.5 w-3.5" />
      case "email":
        return <Mail className="h-3.5 w-3.5" />
      case "meeting":
        return <CalendarIcon className="h-3.5 w-3.5" />
      case "note":
        return <MessageSquare className="h-3.5 w-3.5" />
      case "task":
        return <CheckCircle2 className="h-3.5 w-3.5" />
    }
  }

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "call":
        return "bg-blue-500/10 text-blue-500"
      case "email":
        return "bg-purple-500/10 text-purple-500"
      case "meeting":
        return "bg-emerald-500/10 text-emerald-500"
      case "note":
        return "bg-yellow-500/10 text-yellow-500"
      case "task":
        return "bg-orange-500/10 text-orange-500"
    }
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Recent Activity</CardTitle>
        {showViewAll && (
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const date = activity.completedAt || activity.dueDate || activity.createdAt
            const isCompleted = !!activity.completedAt
            const isOverdue = !activity.completedAt && activity.dueDate && activity.dueDate <= new Date()

            return (
              <div key={activity.id} className="flex gap-3">
                <div className={`flex-shrink-0 p-1.5 rounded-lg ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{activity.subject}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(date, { addSuffix: true })}
                    </span>
                    {isCompleted && (
                      <Badge
                        variant="outline"
                        className="h-5 px-1 text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      >
                        Done
                      </Badge>
                    )}
                    {isOverdue && (
                      <Badge
                        variant="outline"
                        className="h-5 px-1 text-xs bg-red-500/10 text-red-500 border-red-500/20"
                      >
                        Overdue
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
