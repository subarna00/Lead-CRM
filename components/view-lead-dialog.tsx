"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  Sparkles,
  Tag,
  Activity,
  Plus,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import type { Lead, Activity as ActivityType } from "@/lib/types"
import { mockActivities } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { LogActivityDialog } from "@/components/log-activity-dialog"
import { ConvertToDealDialog } from "@/components/convert-to-deal-dialog"

interface ViewLeadDialogProps {
  lead: Lead
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: () => void
  onActivityLogged?: (activity: ActivityType) => void
  onConvertedToDeal?: (dealId: string) => void
}

export function ViewLeadDialog({
  lead,
  open,
  onOpenChange,
  onEdit,
  onActivityLogged,
  onConvertedToDeal,
}: ViewLeadDialogProps) {
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false)
  const [isConvertToDealOpen, setIsConvertToDealOpen] = useState(false)
  const [activityType, setActivityType] = useState<ActivityType["type"]>("call")

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary"
    if (score >= 60) return "text-yellow-500"
    return "text-gray-500"
  }

  const leadActivities = mockActivities.filter((activity) => activity.leadId === lead.id)

  const handleQuickAction = (type: ActivityType["type"]) => {
    setActivityType(type)
    setIsLogActivityOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl">
                  {lead.firstName} {lead.lastName}
                </DialogTitle>
                <p className="text-muted-foreground mt-1">{lead.jobTitle}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleQuickAction("call")}>
                  <Phone className="h-4 w-4 mr-2" />
                  Log Call
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleQuickAction("email")}>
                  <Mail className="h-4 w-4 mr-2" />
                  Log Email
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleQuickAction("meeting")}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                {lead.status === "qualified" && (
                  <Button size="sm" onClick={() => setIsConvertToDealOpen(true)}>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Convert to Deal
                  </Button>
                )}
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activities">Activities ({leadActivities.length})</TabsTrigger>
              <TabsTrigger value="notes">Notes & History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                        {lead.email}
                      </a>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                          {lead.phone}
                        </a>
                      </div>
                    )}
                    {lead.company && (
                      <div className="flex items-center gap-3 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{lead.company}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Lead Information</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <Badge variant="outline" className="capitalize">
                        {lead.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Source</p>
                      <Badge variant="outline" className="capitalize">
                        {lead.source.replace("_", " ")}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Lead Score</p>
                      <div className={cn("flex items-center gap-2 font-semibold", getScoreColor(lead.score))}>
                        <Sparkles className="h-4 w-4" />
                        {lead.score} / 100
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Created</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(lead.createdAt)}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(lead.updatedAt)}
                  </div>
                </div>
                {lead.assignedTo && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Assigned To</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      {lead.assignedTo}
                    </div>
                  </div>
                )}
              </div>

              {lead.tags.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {lead.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="activities" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">All Activities</h3>
                <Button size="sm" onClick={() => setIsLogActivityOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Log Activity
                </Button>
              </div>

              {leadActivities.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No activities logged yet</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => setIsLogActivityOpen(true)}
                  >
                    Log Your First Activity
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {leadActivities.map((activity) => (
                    <div key={activity.id} className="bg-accent/50 rounded-lg p-4 relative">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="capitalize">
                            {activity.type}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={cn(
                              "capitalize",
                              activity.priority === "high" && "border-red-500 text-red-500",
                              activity.priority === "medium" && "border-yellow-500 text-yellow-500",
                            )}
                          >
                            {activity.priority}
                          </Badge>
                          {activity.completedAt && <CheckCircle2 className="h-4 w-4 text-primary" />}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="font-medium mb-1">{activity.subject}</p>
                      {activity.description && <p className="text-sm text-muted-foreground">{activity.description}</p>}
                      {activity.dueDate && !activity.completedAt && (
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Due: {new Date(activity.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="notes" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notes & History</h3>
                <Button size="sm" onClick={() => handleQuickAction("note")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>

              {leadActivities.filter((a) => a.type === "note").length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No notes yet</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => handleQuickAction("note")}
                  >
                    Add Your First Note
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {leadActivities
                    .filter((activity) => activity.type === "note")
                    .map((activity) => (
                      <div key={activity.id} className="bg-accent/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{activity.subject}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.createdAt).toLocaleString()}
                          </span>
                        </div>
                        {activity.description && (
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={onEdit}>Edit Lead</Button>
          </div>
        </DialogContent>
      </Dialog>

      <LogActivityDialog
        open={isLogActivityOpen}
        onOpenChange={setIsLogActivityOpen}
        leadId={lead.id}
        defaultType={activityType}
        onActivityLogged={onActivityLogged}
      />

      <ConvertToDealDialog
        open={isConvertToDealOpen}
        onOpenChange={setIsConvertToDealOpen}
        lead={lead}
        onConverted={onConvertedToDeal}
      />
    </>
  )
}
