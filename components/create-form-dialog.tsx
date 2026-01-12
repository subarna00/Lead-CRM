"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Plus, X, GripVertical } from "lucide-react"
import type { LeadForm, FormField } from "@/lib/types"

interface CreateFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateForm: (form: LeadForm) => void
}

export function CreateFormDialog({ open, onOpenChange, onCreateForm }: CreateFormDialogProps) {
  const [formName, setFormName] = useState("")
  const [fields, setFields] = useState<FormField[]>([
    { id: "1", type: "text", label: "Full Name", required: true },
    { id: "2", type: "email", label: "Email Address", required: true },
  ])

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: "text",
      label: "New Field",
      required: false,
    }
    setFields([...fields, newField])
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)))
  }

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newForm: LeadForm = {
      id: Date.now().toString(),
      name: formName,
      fields: fields,
      embedCode: `<iframe src="https://crm.example.com/forms/${Date.now()}" width="100%" height="600"></iframe>`,
      submissionsCount: 0,
      createdAt: new Date(),
    }

    onCreateForm(newForm)
    onOpenChange(false)
    setFormName("")
    setFields([
      { id: "1", type: "text", label: "Full Name", required: true },
      { id: "2", type: "email", label: "Email Address", required: true },
    ])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="formName">Form Name *</Label>
            <Input
              id="formName"
              placeholder="e.g., Contact Form, Demo Request"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Form Fields</Label>
              <Button type="button" variant="outline" size="sm" onClick={addField}>
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="flex gap-3">
                    <div className="flex items-center text-muted-foreground cursor-move">
                      <GripVertical className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-xs">Field Label</Label>
                          <Input
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                            placeholder="Field label"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Field Type</Label>
                          <Select
                            value={field.type}
                            onValueChange={(value) => updateField(field.id, { type: value as FormField["type"] })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone</SelectItem>
                              <SelectItem value="textarea">Textarea</SelectItem>
                              <SelectItem value="select">Select</SelectItem>
                              <SelectItem value="checkbox">Checkbox</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {field.type === "select" && (
                        <div className="space-y-2">
                          <Label className="text-xs">Options (comma-separated)</Label>
                          <Input
                            value={field.options?.join(", ") || ""}
                            onChange={(e) =>
                              updateField(field.id, {
                                options: e.target.value.split(",").map((opt) => opt.trim()),
                              })
                            }
                            placeholder="Option 1, Option 2, Option 3"
                          />
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`required-${field.id}`}
                          checked={field.required}
                          onCheckedChange={(checked) => updateField(field.id, { required: checked as boolean })}
                        />
                        <Label htmlFor={`required-${field.id}`} className="text-sm font-normal cursor-pointer">
                          Required field
                        </Label>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeField(field.id)}
                      disabled={fields.length <= 1}
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
            <Button type="submit">Create Form</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
