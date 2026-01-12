"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import type { AutomationRule } from "@/lib/types"

interface CreateAutomationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateAutomation: (automation: AutomationRule) => void
}

export function CreateAutomationDialog({ open, onOpenChange, onCreateAutomation }: CreateAutomationDialogProps) {
  const [name, setName] = useState("")
  const [trigger, setTrigger] = useState("lead_created")
  const [conditions, setConditions] = useState<Array<{ field: string; operator: string; value: string }>>([
    { field: "source", operator: "equals", value: "" },
  ])
  const [actions, setActions] = useState<Array<{ type: string; value: string }>>([
    { type: "assign_to_user", value: "" },
  ])

  const addCondition = () => {
    setConditions([...conditions, { field: "status", operator: "equals", value: "" }])
  }

  const updateCondition = (index: number, field: string, value: string) => {
    const updated = [...conditions]
    updated[index] = { ...updated[index], [field]: value }
    setConditions(updated)
  }

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index))
  }

  const addAction = () => {
    setActions([...actions, { type: "send_email", value: "" }])
  }

  const updateAction = (index: number, field: string, value: string) => {
    const updated = [...actions]
    updated[index] = { ...updated[index], [field]: value }
    setActions(updated)
  }

  const removeAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newAutomation: AutomationRule = {
      id: Date.now().toString(),
      name,
      trigger,
      conditions: conditions.map((c) => ({ ...c })),
      actions: actions.map((a) => ({ ...a })),
      isActive: true,
      createdAt: new Date(),
    }

    onCreateAutomation(newAutomation)
    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setName("")
    setTrigger("lead_created")
    setConditions([{ field: "source", operator: "equals", value: "" }])
    setActions([{ type: "assign_to_user", value: "" }])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Automation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Automation Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Auto-assign new leads"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trigger">Trigger *</Label>
            <Select value={trigger} onValueChange={setTrigger}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead_created">When a lead is created</SelectItem>
                <SelectItem value="lead_status_changed">When lead status changes</SelectItem>
                <SelectItem value="deal_stage_changed">When deal stage changes</SelectItem>
                <SelectItem value="activity_completed">When an activity is completed</SelectItem>
                <SelectItem value="form_submitted">When a form is submitted</SelectItem>
                <SelectItem value="time_based">Time-based (scheduled)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Conditions</Label>
              <Button type="button" variant="outline" size="sm" onClick={addCondition}>
                <Plus className="h-4 w-4 mr-2" />
                Add Condition
              </Button>
            </div>
            <div className="space-y-3">
              {conditions.map((condition, index) => (
                <Card key={index} className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      <Select value={condition.field} onValueChange={(value) => updateCondition(index, "field", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="status">Status</SelectItem>
                          <SelectItem value="source">Source</SelectItem>
                          <SelectItem value="score">Score</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="last_activity">Last Activity</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={condition.operator}
                        onValueChange={(value) => updateCondition(index, "operator", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Operator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="not_equals">Not equals</SelectItem>
                          <SelectItem value="greater_than">Greater than</SelectItem>
                          <SelectItem value="less_than">Less than</SelectItem>
                          <SelectItem value="contains">Contains</SelectItem>
                          <SelectItem value="older_than">Older than</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Value"
                        value={condition.value}
                        onChange={(e) => updateCondition(index, "value", e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCondition(index)}
                      disabled={conditions.length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Actions</Label>
              <Button type="button" variant="outline" size="sm" onClick={addAction}>
                <Plus className="h-4 w-4 mr-2" />
                Add Action
              </Button>
            </div>
            <div className="space-y-3">
              {actions.map((action, index) => (
                <Card key={index} className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <Select value={action.type} onValueChange={(value) => updateAction(index, "type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assign_to_user">Assign to user</SelectItem>
                          <SelectItem value="send_email">Send email</SelectItem>
                          <SelectItem value="create_task">Create task</SelectItem>
                          <SelectItem value="change_status">Change status</SelectItem>
                          <SelectItem value="add_tag">Add tag</SelectItem>
                          <SelectItem value="send_notification">Send notification</SelectItem>
                          <SelectItem value="update_field">Update field</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Value"
                        value={action.value}
                        onChange={(e) => updateAction(index, "value", e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAction(index)}
                      disabled={actions.length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Automation</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
