"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { LeadForm } from "@/lib/types"

interface FormPreviewDialogProps {
  form: LeadForm
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FormPreviewDialog({ form, open, onOpenChange }: FormPreviewDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Form submitted! (Preview mode)")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Form Preview: {form.name}</DialogTitle>
        </DialogHeader>

        <div className="bg-accent/30 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={`preview-${field.id}`}>
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                {field.type === "text" && (
                  <Input
                    id={`preview-${field.id}`}
                    type="text"
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    required={field.required}
                  />
                )}
                {field.type === "email" && (
                  <Input
                    id={`preview-${field.id}`}
                    type="email"
                    placeholder={field.placeholder || "your@email.com"}
                    required={field.required}
                  />
                )}
                {field.type === "phone" && (
                  <Input
                    id={`preview-${field.id}`}
                    type="tel"
                    placeholder={field.placeholder || "+1 (555) 000-0000"}
                    required={field.required}
                  />
                )}
                {field.type === "textarea" && (
                  <Textarea
                    id={`preview-${field.id}`}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    required={field.required}
                    rows={4}
                  />
                )}
                {field.type === "select" && (
                  <Select required={field.required}>
                    <SelectTrigger id={`preview-${field.id}`}>
                      <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {field.type === "checkbox" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox id={`preview-${field.id}`} required={field.required} />
                    <Label htmlFor={`preview-${field.id}`} className="text-sm font-normal cursor-pointer">
                      {field.label}
                    </Label>
                  </div>
                )}
              </div>
            ))}

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close Preview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
