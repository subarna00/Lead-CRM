"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Activity, ActivityType, Priority } from "@/lib/types"

interface LogActivityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  leadId: string
  defaultType?: ActivityType
  onActivityLogged?: (activity: Activity) => void
}

export function LogActivityDialog({
  open,
  onOpenChange,
  leadId,
  defaultType = "call",
  onActivityLogged,
}: LogActivityDialogProps) {
  const [type, setType] = useState<ActivityType>(defaultType)
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<Priority>("medium")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newActivity: Activity = {
      id: crypto.randomUUID(),
      type,
      leadId,
      userId: "current-user",
      subject,
      description: description || undefined,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      completedAt: type !== "task" ? new Date() : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    onActivityLogged?.(newActivity)
    onOpenChange(false)

    // Reset form
    setSubject("")
    setDescription("")
    setPriority("medium")
    setDueDate("")
  }

  const getActivityTypeLabel = (type: ActivityType) => {
    const labels: Record<ActivityType, string> = {
      call: "Phone Call",
      email: "Email",
      meeting: "Meeting",
      note: "Note",
      task: "Task",
    }
    return labels[type]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log Activity</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Activity Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as ActivityType)}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="call">Phone Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="note">Note</SelectItem>
                <SelectItem value="task">Task</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={`e.g., ${type === "call" ? "Follow-up call about pricing" : type === "email" ? "Sent product demo email" : "Discussed project requirements"}`}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about this activity..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {type === "task" && (
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Log {getActivityTypeLabel(type)}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
