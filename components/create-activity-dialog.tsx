"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Activity, ActivityType, Priority } from "@/lib/types"
import { mockLeads } from "@/lib/mock-data"

interface CreateActivityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateActivity: (activity: Activity) => void
}

export function CreateActivityDialog({ open, onOpenChange, onCreateActivity }: CreateActivityDialogProps) {
  const [formData, setFormData] = useState({
    type: "call" as ActivityType,
    leadId: "",
    subject: "",
    description: "",
    dueDate: "",
    priority: "medium" as Priority,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newActivity: Activity = {
      id: Date.now().toString(),
      type: formData.type,
      leadId: formData.leadId,
      userId: "1",
      subject: formData.subject,
      description: formData.description || undefined,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      priority: formData.priority,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    onCreateActivity(newActivity)
    onOpenChange(false)
    setFormData({
      type: "call",
      leadId: "",
      subject: "",
      description: "",
      dueDate: "",
      priority: "medium",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Activity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Activity Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as ActivityType })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as Priority })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="leadId">Associated Lead *</Label>
            <Select value={formData.leadId} onValueChange={(value) => setFormData({ ...formData, leadId: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a lead" />
              </SelectTrigger>
              <SelectContent>
                {mockLeads.map((lead) => (
                  <SelectItem key={lead.id} value={lead.id}>
                    {lead.firstName} {lead.lastName} - {lead.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              placeholder="e.g., Follow-up call to discuss proposal"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add detailed notes about this activity..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Activity</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
