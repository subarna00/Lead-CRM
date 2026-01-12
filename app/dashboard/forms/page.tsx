"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Code, Copy, MoreVertical, AlertCircle } from "lucide-react"
import type { LeadForm } from "@/lib/types"
import { CreateFormDialog } from "@/components/create-form-dialog"
import { FormPreviewDialog } from "@/components/form-preview-dialog"
import { EmbedCodeDialog } from "@/components/embed-code-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockForms: LeadForm[] = [
  {
    id: "1",
    name: "Website Contact Form",
    fields: [
      { id: "1", type: "text", label: "Full Name", required: true },
      { id: "2", type: "email", label: "Email Address", required: true },
      { id: "3", type: "phone", label: "Phone Number", required: false },
      { id: "4", type: "text", label: "Company", required: false },
      { id: "5", type: "textarea", label: "Message", required: true },
    ],
    embedCode: '<iframe src="https://crm.example.com/forms/1" width="100%" height="600"></iframe>',
    submissionsCount: 127,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "2",
    name: "Product Demo Request",
    fields: [
      { id: "1", type: "text", label: "First Name", required: true },
      { id: "2", type: "text", label: "Last Name", required: true },
      { id: "3", type: "email", label: "Work Email", required: true },
      { id: "4", type: "text", label: "Company Name", required: true },
      {
        id: "5",
        type: "select",
        label: "Company Size",
        required: true,
        options: ["1-10", "11-50", "51-200", "201-500", "500+"],
      },
      { id: "6", type: "textarea", label: "What are you looking for?", required: false },
    ],
    embedCode: '<iframe src="https://crm.example.com/forms/2" width="100%" height="700"></iframe>',
    submissionsCount: 89,
    createdAt: new Date("2025-12-15"),
  },
  {
    id: "3",
    name: "Newsletter Signup",
    fields: [
      { id: "1", type: "email", label: "Email Address", required: true },
      { id: "2", type: "text", label: "First Name", required: false },
      { id: "3", type: "checkbox", label: "I agree to receive marketing emails", required: true },
    ],
    embedCode: '<iframe src="https://crm.example.com/forms/3" width="100%" height="400"></iframe>',
    submissionsCount: 342,
    createdAt: new Date("2025-11-20"),
  },
]

export default function FormsPage() {
  const [forms, setForms] = useState<LeadForm[]>(mockForms)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [previewForm, setPreviewForm] = useState<LeadForm | null>(null)
  const [embedForm, setEmbedForm] = useState<LeadForm | null>(null)

  const handleCreateForm = (newForm: LeadForm) => {
    setForms([newForm, ...forms])
  }

  const handleDeleteForm = (formId: string) => {
    setForms(forms.filter((form) => form.id !== formId))
  }

  return (
    <>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Forms</h1>
            <p className="text-muted-foreground">Create and manage lead capture forms for your website</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Form
          </Button>
        </div>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex gap-4">
            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-semibold">How to Use Forms for Lead Generation</h3>
              <p className="text-sm text-muted-foreground">
                Forms are your primary tool for capturing leads from external sources. Create custom forms with fields
                you need, copy the embed code, and place it on your website or landing pages. Every form submission
                automatically creates a new lead in your CRM with the submitted information. You can then manage,
                qualify, and convert these leads through your pipeline.
              </p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Forms</p>
                <p className="text-2xl font-bold">{forms.length}</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Submissions</p>
                <p className="text-2xl font-bold">{forms.reduce((sum, form) => sum + form.submissionsCount, 0)}</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Conversion</p>
                <p className="text-2xl font-bold">24%</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Copy className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <Card key={form.id} className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-2 truncate">{form.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{form.fields.length} fields</Badge>
                    <Badge variant="outline">{form.submissionsCount} submissions</Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setPreviewForm(form)}>Preview Form</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setEmbedForm(form)}>Get Embed Code</DropdownMenuItem>
                    <DropdownMenuItem>View Submissions</DropdownMenuItem>
                    <DropdownMenuItem>Edit Form</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeleteForm(form.id)} className="text-destructive">
                      Delete Form
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">Fields:</p>
                <div className="flex flex-wrap gap-1">
                  {form.fields.slice(0, 3).map((field) => (
                    <Badge key={field.id} variant="outline" className="text-xs">
                      {field.label}
                    </Badge>
                  ))}
                  {form.fields.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{form.fields.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => setPreviewForm(form)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => setEmbedForm(form)}
                >
                  <Code className="h-3 w-3 mr-1" />
                  Embed
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Created {new Date(form.createdAt).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialogs */}
      <CreateFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateForm={handleCreateForm}
      />
      {previewForm && (
        <FormPreviewDialog form={previewForm} open={!!previewForm} onOpenChange={() => setPreviewForm(null)} />
      )}
      {embedForm && <EmbedCodeDialog form={embedForm} open={!!embedForm} onOpenChange={() => setEmbedForm(null)} />}
    </>
  )
}
