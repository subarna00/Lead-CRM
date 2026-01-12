"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Lead, Deal, PipelineStage } from "@/lib/types"
import { ArrowRight } from "lucide-react"

interface ConvertToDealDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead
  onConverted?: (dealId: string) => void
}

export function ConvertToDealDialog({ open, onOpenChange, lead, onConverted }: ConvertToDealDialogProps) {
  const [title, setTitle] = useState(`${lead.company || lead.firstName + " " + lead.lastName} - Deal`)
  const [value, setValue] = useState("")
  const [probability, setProbability] = useState("50")
  const [stage, setStage] = useState<PipelineStage>("contact")
  const [expectedCloseDate, setExpectedCloseDate] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newDeal: Deal = {
      id: crypto.randomUUID(),
      title,
      leadId: lead.id,
      stage,
      value: Number.parseFloat(value) || 0,
      probability: Number.parseInt(probability) || 50,
      expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : undefined,
      assignedTo: lead.assignedTo || "Unassigned",
      notes: notes || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    onConverted?.(newDeal.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            Convert Lead to Deal
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-accent/50 rounded-lg p-3 text-sm">
            <p className="text-muted-foreground">Converting lead:</p>
            <p className="font-medium">
              {lead.firstName} {lead.lastName} from {lead.company || "Unknown Company"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Deal Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter deal title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Deal Value *</Label>
              <Input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="probability">Probability (%)</Label>
              <Input
                id="probability"
                type="number"
                value={probability}
                onChange={(e) => setProbability(e.target.value)}
                placeholder="50"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage">Pipeline Stage *</Label>
            <Select value={stage} onValueChange={(value) => setStage(value as PipelineStage)}>
              <SelectTrigger id="stage">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="contact">Contact</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedCloseDate">Expected Close Date</Label>
            <Input
              id="expectedCloseDate"
              type="date"
              value={expectedCloseDate}
              onChange={(e) => setExpectedCloseDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any relevant notes about this deal..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <ArrowRight className="h-4 w-4 mr-2" />
              Convert to Deal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
