"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreVertical, Mail, Phone, Building2, Sparkles } from "lucide-react"
import { mockLeads } from "@/lib/mock-data"
import type { Lead, LeadStatus, LeadSource, Activity as ActivityType } from "@/lib/types"
import { CreateLeadDialog } from "@/components/create-lead-dialog"
import { EditLeadDialog } from "@/components/edit-lead-dialog"
import { cn } from "@/lib/utils"

export default function LeadsPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all")
  const [sourceFilter, setSourceFilter] = useState<LeadSource | "all">("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [activities, setActivities] = useState<ActivityType[]>([])

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter

    return matchesSearch && matchesStatus && matchesSource
  })

  const handleCreateLead = (newLead: Lead) => {
    setLeads([newLead, ...leads])
  }

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(leads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)))
  }

  const handleDeleteLead = (leadId: string) => {
    setLeads(leads.filter((lead) => lead.id !== leadId))
  }

  const handleActivityLogged = (activity: ActivityType) => {
    setActivities([activity, ...activities])
    console.log("Activity logged:", activity)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Leads</h1>
          <p className="text-muted-foreground">Manage and track all your leads in one place</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as LeadStatus | "all")}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="unqualified">Unqualified</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={(value) => setSourceFilter(value as LeadSource | "all")}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="social_media">Social Media</SelectItem>
              <SelectItem value="email_campaign">Email Campaign</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="cold_call">Cold Call</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Leads Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  No leads found
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer hover:bg-purple-100/90 "
                  onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{`${lead.firstName} ${lead.lastName}`}</div>
                      <div className="text-sm text-muted-foreground">{lead.jobTitle}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.company || "-"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{lead.email}</span>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{lead.phone}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <LeadStatusBadge status={lead.status} />
                  </TableCell>
                  <TableCell>
                    <span className="text-sm capitalize">{lead.source.replace("_", " ")}</span>
                  </TableCell>
                  <TableCell>
                    <LeadScoreBadge score={lead.score} />
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{lead.assignedTo || "-"}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/dashboard/leads/${lead.id}`)
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingLead(lead)
                          }}
                        >
                          Edit Lead
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteLead(lead.id)
                          }}
                          className="text-destructive"
                        >
                          Delete Lead
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <CreateLeadDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateLead={handleCreateLead}
      />
      {editingLead && (
        <EditLeadDialog
          lead={editingLead}
          open={!!editingLead}
          onOpenChange={(open) => !open && setEditingLead(null)}
          onUpdateLead={handleUpdateLead}
        />
      )}
    </div>
  )
}

function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const variants: Record<LeadStatus, { label: string; className: string }> = {
    new: { label: "New", className: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
    contacted: { label: "Contacted", className: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" },
    qualified: { label: "Qualified", className: "bg-primary/10 text-primary border-primary/20" },
    unqualified: { label: "Unqualified", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
    lost: { label: "Lost", className: "bg-destructive/10 text-destructive border-destructive/20" },
  }

  const variant = variants[status]
  return (
    <Badge variant="outline" className={cn("border", variant.className)}>
      {variant.label}
    </Badge>
  )
}

function LeadScoreBadge({ score }: { score: number }) {
  let variant = "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
  if (score >= 80) variant = "bg-primary/10 text-primary border-primary/20"
  else if (score >= 60) variant = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"

  return (
    <Badge variant="outline" className={cn("border gap-1", variant)}>
      <Sparkles className="h-3 w-3" />
      {score}
    </Badge>
  )
}
