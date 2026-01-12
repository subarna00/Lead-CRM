"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DollarSign, TrendingUp, Calendar, User, FileText } from "lucide-react"
import type { Deal } from "@/lib/types"
import { mockLeads } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface ViewDealDialogProps {
  deal: Deal
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewDealDialog({ deal, open, onOpenChange }: ViewDealDialogProps) {
  const lead = mockLeads.find((l) => l.id === deal.leadId)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return "text-primary"
    if (probability >= 50) return "text-yellow-500"
    return "text-orange-500"
  }

  const getStageLabel = (stage: string) => {
    const labels: Record<string, string> = {
      lead: "Lead",
      contact: "Contact Made",
      proposal: "Proposal Sent",
      negotiation: "Negotiation",
      closed_won: "Closed Won",
      closed_lost: "Closed Lost",
    }
    return labels[stage] || stage
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Deal Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold mb-2">{deal.title}</h2>
            {lead && (
              <p className="text-muted-foreground">
                {lead.firstName} {lead.lastName} • {lead.company}
              </p>
            )}
          </div>

          <Separator />

          {/* Deal Value & Probability */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Deal Value</p>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">${deal.value.toLocaleString()}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Win Probability</p>
              <div className={cn("flex items-center gap-2", getProbabilityColor(deal.probability))}>
                <TrendingUp className="h-5 w-5" />
                <span className="text-2xl font-bold">{deal.probability}%</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Deal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Deal Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pipeline Stage</p>
                <Badge variant="outline" className="capitalize">
                  {getStageLabel(deal.stage)}
                </Badge>
              </div>
              {deal.expectedCloseDate && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expected Close Date</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(deal.expectedCloseDate)}
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-6">
              {deal.assignedTo && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Assigned To</p>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {deal.assignedTo}
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Created</p>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {formatDate(deal.createdAt)}
                </div>
              </div>
            </div>
          </div>

          {deal.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Notes
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{deal.notes}</p>
              </div>
            </>
          )}

          {lead && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold">Associated Lead</h3>
                <div className="bg-accent/50 rounded-lg p-4 space-y-2">
                  <p className="font-medium">
                    {lead.firstName} {lead.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{lead.email}</p>
                  {lead.phone && <p className="text-sm text-muted-foreground">{lead.phone}</p>}
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {lead.status}
                    </Badge>
                    <Badge variant="secondary">Score: {lead.score}</Badge>
                  </div>
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>Edit Deal</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
