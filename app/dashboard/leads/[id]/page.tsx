"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, Mail, Calendar, Plus, MessageSquare, Edit } from "lucide-react"
import { mockLeads } from "@/lib/mock-data"
import { CreateActivityDialog } from "@/components/create-activity-dialog"
import { ScheduleMeetingDialog } from "@/components/schedule-meeting-dialog"
import { DocumentsTab } from "@/components/documents-tab"
import { NotesTab } from "@/components/notes-tab"
import { ActivitiesTab } from "@/components/activities-tab"
import { DealsTab } from "@/components/deals-tab"
import { ActivityFeed } from "@/components/activity-feed"

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const lead = mockLeads.find((l) => l.id === id) || mockLeads[0]
  const [activeTab, setActiveTab] = useState("overview")
  const [documents, setDocuments] = useState<
    Array<{ id: string; name: string; size: number; type: string; uploadedAt: Date }>
  >([])
  const [notes, setNotes] = useState<Array<{ id: string; content: string; createdAt: Date }>>([])
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false)
  const [isMeetingDialogOpen, setIsMeetingDialogOpen] = useState(false)

  const handleAddNote = (content: string) => {
    setNotes([{ id: Date.now().toString(), content, createdAt: new Date() }, ...notes])
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter((n) => n.id !== noteId))
  }

  const handleAddDocument = (file: File) => {
    setDocuments([
      { id: Date.now().toString(), name: file.name, size: file.size, type: file.type, uploadedAt: new Date() },
      ...documents,
    ])
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{lead.firstName} {lead.lastName}</h1>
                <Badge variant={lead.status === "qualified" ? "default" : "secondary"}>{lead.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {lead.company} • {lead.jobTitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => setIsActivityDialogOpen(true)}>
              <Phone className="h-4 w-4 mr-2" />
              Log Call
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Log Email
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsMeetingDialogOpen(true)}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button className="ml-auto">
              <Plus className="h-4 w-4 mr-2" />
              Convert to Deal
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-background">
        <div className="px-6 flex gap-8">
          {["Overview", "Activities", "Documents", "Notes", "Deals"].map((tab) => (
            <button
              key={tab.toLowerCase()}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`py-4 px-0 border-b-2 font-medium transition-colors ${
                activeTab === tab.toLowerCase()
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {activeTab === "overview" && (
              <>
                {/* Contact Information */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p className="font-medium">{lead.firstName} {lead.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {lead.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="font-medium flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {lead.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Company</p>
                      <p className="font-medium">{lead.company}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Job Title</p>
                      <p className="font-medium">{lead.jobTitle}</p>
                    </div>
                  </div>
                </Card>

                {/* Lead Details */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Lead Details</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Source</p>
                      <p className="font-medium">{lead.source}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <Badge>{lead.status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Created</p>
                      <p className="font-medium">{new Date(lead.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
                      <p className="font-medium">{new Date(lead.lastUpdated).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "activities" && <ActivitiesTab leadId={lead.id} />}
            {activeTab === "documents" && <DocumentsTab documents={documents} onAddDocument={handleAddDocument} />}
            {activeTab === "notes" && (
              <NotesTab notes={notes} onAddNote={handleAddNote} onDeleteNote={handleDeleteNote} />
            )}
            {activeTab === "deals" && <DealsTab leadId={lead.id} />}
          </div>

          {/* Sidebar */}
          <div className="col-span-1 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Lead Score</h3>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-primary">{lead.score}</p>
                <p className="text-sm text-muted-foreground">out of 100</p>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${lead.score}%` }} />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setIsActivityDialogOpen(true)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Log a Call
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setIsMeetingDialogOpen(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Activity</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All →
                </Button>
              </div>
              <ActivityFeed leadId={lead.id} />
            </Card>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <CreateActivityDialog open={isActivityDialogOpen} onOpenChange={setIsActivityDialogOpen} leadId={lead.id} />
      <ScheduleMeetingDialog open={isMeetingDialogOpen} onOpenChange={setIsMeetingDialogOpen} leadId={lead.id} />
    </div>
  )
}
