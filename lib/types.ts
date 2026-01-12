// Core data types for the CRM system

export type LeadStatus = "new" | "contacted" | "qualified" | "unqualified" | "lost"
export type LeadSource = "website" | "referral" | "social_media" | "email_campaign" | "event" | "cold_call" | "other"
export type PipelineStage = "lead" | "contact" | "proposal" | "negotiation" | "closed_won" | "closed_lost"
export type ActivityType = "call" | "email" | "meeting" | "note" | "task"
export type Priority = "low" | "medium" | "high"

export interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  jobTitle?: string
  status: LeadStatus
  source: LeadSource
  score: number
  assignedTo?: string
  tags: string[]
  customFields: Record<string, string | number | boolean>
  createdAt: Date
  updatedAt: Date
}

export interface Company {
  id: string
  name: string
  website?: string
  industry?: string
  size?: string
  revenue?: number
  location?: string
  createdAt: Date
  updatedAt: Date
}

export interface Deal {
  id: string
  title: string
  leadId: string
  stage: PipelineStage
  value: number
  probability: number
  expectedCloseDate?: Date
  assignedTo: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Activity {
  id: string
  type: ActivityType
  leadId: string
  userId: string
  subject: string
  description?: string
  dueDate?: Date
  completedAt?: Date
  priority: Priority
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "sales_rep"
  avatar?: string
  createdAt: Date
}

export interface AutomationRule {
  id: string
  name: string
  trigger: string
  conditions: Record<string, unknown>[]
  actions: Record<string, unknown>[]
  isActive: boolean
  createdAt: Date
}

export interface FormField {
  id: string
  type: "text" | "email" | "phone" | "select" | "textarea" | "checkbox"
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
}

export interface LeadForm {
  id: string
  name: string
  fields: FormField[]
  embedCode: string
  submissionsCount: number
  createdAt: Date
}

export interface DashboardMetrics {
  totalLeads: number
  qualifiedLeads: number
  conversionRate: number
  averageDealValue: number
  totalRevenue: number
  leadsThisMonth: number
  dealsWonThisMonth: number
  pipelineValue: number
}

export interface Document {
  id: string
  leadId: string
  name: string
  type: string
  size: number
  url: string
  uploadedBy: string
  uploadedAt: Date
}

export interface Note {
  id: string
  leadId: string
  content: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}
