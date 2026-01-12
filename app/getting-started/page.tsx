"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Activity,
  BarChart3,
  FileText,
  Zap,
  Settings,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  Target,
  Phone,
  Mail,
  Calendar,
  Code,
  Sparkles,
} from "lucide-react"

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Leedy CRM</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            Welcome to Leedy CRM
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Learn More About Leedy CRM
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how to use every feature in our powerful lead management platform. Follow this guide to master your CRM
            and close more deals.
          </p>
        </div>

        {/* Quick Start Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <PlayCircle className="h-8 w-8 text-primary" />
            Quick Start Guide
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-primary/20">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Create Your First Lead</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Start by adding a lead manually or create a form to capture leads automatically from your website.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/leads">
                  Go to Leads <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="p-6 border-primary/20">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Set Up Your Pipeline</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Organize your deals in the pipeline. Drag and drop deals between stages as they progress.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/pipeline">
                  Go to Pipeline <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="p-6 border-primary/20">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Track Activities</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Log calls, emails, meetings, and tasks to keep track of all interactions with your leads.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/activities">
                  Go to Activities <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </Card>
          </div>
        </section>

        {/* Feature Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Feature Guide
          </h2>

          <div className="space-y-8">
            {/* Dashboard */}
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <LayoutDashboard className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold">Dashboard</h3>
                    <Badge variant="secondary">Overview</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Your command center for all CRM activities. Get a real-time view of your sales performance, lead
                    metrics, and pipeline health.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Key Metrics</p>
                        <p className="text-sm text-muted-foreground">
                          View total leads, qualified leads, pipeline value, and average deal size at a glance
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Visual Charts</p>
                        <p className="text-sm text-muted-foreground">
                          Analyze lead sources, pipeline performance, monthly trends, and activity breakdown with
                          interactive charts
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Quick Stats</p>
                        <p className="text-sm text-muted-foreground">
                          Monitor lead status distribution, recent activities, and performance indicators
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6" asChild>
                    <Link href="/dashboard">
                      Explore Dashboard <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Leads */}
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold">Leads Management</h3>
                    <Badge variant="secondary">Core Feature</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Capture, organize, and manage all your leads in one place. Qualify leads with scoring and track
                    their journey from first contact to conversion.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Create & Edit Leads</p>
                        <p className="text-sm text-muted-foreground">
                          Add new leads manually with contact information, company details, and custom fields
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Lead Scoring</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically score leads based on their profile and behavior to prioritize your efforts
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Filter & Search</p>
                        <p className="text-sm text-muted-foreground">
                          Quickly find leads by status, source, score, or search by name, email, or company
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Lead Details</p>
                        <p className="text-sm text-muted-foreground">
                          View comprehensive lead profiles with activity history, notes, documents, and conversion
                          options
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6" asChild>
                    <Link href="/dashboard/leads">
                      Manage Leads <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Pipeline */}
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold">Sales Pipeline</h3>
                    <Badge variant="secondary">Visual Management</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Visualize and manage your deals through customizable pipeline stages. Use drag-and-drop to move deals
                    as they progress.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Kanban Board</p>
                        <p className="text-sm text-muted-foreground">
                          View all deals in a visual kanban board organized by pipeline stages (Lead, Contact, Proposal,
                          Negotiation, Closed)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Deal Management</p>
                        <p className="text-sm text-muted-foreground">
                          Create deals from leads, set deal values, probability, and expected close dates
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Pipeline Analytics</p>
                        <p className="text-sm text-muted-foreground">
                          Track total pipeline value, active deals count, and average deal size for each stage
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Drag & Drop</p>
                        <p className="text-sm text-muted-foreground">
                          Easily move deals between stages by dragging them to update their status
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6" asChild>
                    <Link href="/dashboard/pipeline">
                      View Pipeline <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Activities */}
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold">Activities</h3>
                    <Badge variant="secondary">Tracking</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Log and track all interactions with your leads. Never miss a follow-up with comprehensive activity
                    management.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Calls</p>
                        <p className="text-sm text-muted-foreground">Log phone calls with notes and outcomes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Emails</p>
                        <p className="text-sm text-muted-foreground">Track email communications and responses</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Meetings</p>
                        <p className="text-sm text-muted-foreground">Schedule and log meetings with leads</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Tasks & Notes</p>
                        <p className="text-sm text-muted-foreground">Create tasks and add notes for follow-ups</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Activity Feed</p>
                        <p className="text-sm text-muted-foreground">
                          View chronological activity history for each lead with filtering and search capabilities
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Priority Management</p>
                        <p className="text-sm text-muted-foreground">
                          Set priority levels (high, medium, low) and due dates for better task management
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6" asChild>
                    <Link href="/dashboard/activities">
                      Track Activities <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Reports */}
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold">Reports & Analytics</h3>
                    <Badge variant="secondary">Insights</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Gain deep insights into your sales performance with comprehensive reports and analytics. Make
                    data-driven decisions.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Lead Reports</p>
                        <p className="text-sm text-muted-foreground">
                          Track leads over time, conversion rates, and lead source performance
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Revenue Analytics</p>
                        <p className="text-sm text-muted-foreground">
                          Monitor revenue trends, compare against targets, and forecast future performance
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Sales Rep Performance</p>
                        <p className="text-sm text-muted-foreground">
                          Analyze individual and team performance metrics, deals closed, and revenue generated
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Export & Share</p>
                        <p className="text-sm text-muted-foreground">
                          Export reports in various formats and share insights with your team
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6" asChild>
                    <Link href="/dashboard/reports">
                      View Reports <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Forms */}
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold">Lead Capture Forms</h3>
                    <Badge variant="secondary">Lead Generation</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Create custom lead capture forms and embed them on your website. Every submission automatically
                    creates a new lead in your CRM.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Form Builder</p>
                        <p className="text-sm text-muted-foreground">
                          Create forms with custom fields (text, email, phone, select, textarea, checkbox) and set
                          required fields
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Code className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Embed Code</p>
                        <p className="text-sm text-muted-foreground">
                          Get embed code for each form to place on your website, landing pages, or blog posts
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Form Analytics</p>
                        <p className="text-sm text-muted-foreground">
                          Track form submissions, conversion rates, and see which forms perform best
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Auto Lead Creation</p>
                        <p className="text-sm text-muted-foreground">
                          Form submissions automatically create leads with all submitted information
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6" asChild>
                    <Link href="/dashboard/forms">
                      Create Forms <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Automation */}
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold">Automation</h3>
                    <Badge variant="secondary">Workflow</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Automate repetitive tasks and workflows to save time and ensure consistency. Set up rules that
                    trigger actions based on conditions.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Automation Rules</p>
                        <p className="text-sm text-muted-foreground">
                          Create rules with triggers (lead created, status changed, time-based) and conditions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Automated Actions</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically assign leads, send emails, create tasks, change status, and send notifications
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Rule Management</p>
                        <p className="text-sm text-muted-foreground">
                          Enable/disable rules, duplicate them, and view execution history
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Smart Workflows</p>
                        <p className="text-sm text-muted-foreground">
                          Examples: Auto-assign new leads, send welcome emails to qualified leads, create follow-up
                          tasks for high-score leads
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6" asChild>
                    <Link href="/dashboard/automation">
                      Set Up Automation <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Settings */}
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold">Settings</h3>
                    <Badge variant="secondary">Configuration</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Configure your CRM settings, manage users, customize your workspace, and set up integrations.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">User Management</p>
                        <p className="text-sm text-muted-foreground">
                          Add team members, assign roles (Admin, Manager, Sales Rep), and manage permissions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Profile Settings</p>
                        <p className="text-sm text-muted-foreground">
                          Update your profile information, change password, and manage account preferences
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Workspace Configuration</p>
                        <p className="text-sm text-muted-foreground">
                          Customize pipeline stages, lead sources, activity types, and other CRM settings
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6" asChild>
                    <Link href="/dashboard/settings">
                      Open Settings <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Pro Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-semibold mb-2">Use Lead Scoring</h3>
              <p className="text-sm text-muted-foreground">
                Focus on high-scoring leads first. Leads with scores above 80 are your best prospects and should be
                prioritized.
              </p>
            </Card>
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-semibold mb-2">Set Up Automation Early</h3>
              <p className="text-sm text-muted-foreground">
                Automate routine tasks like lead assignment and welcome emails to save time and ensure consistency.
              </p>
            </Card>
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-semibold mb-2">Log Activities Regularly</h3>
              <p className="text-sm text-muted-foreground">
                Keep detailed activity logs for every lead interaction. This helps track progress and provides context
                for your team.
              </p>
            </Card>
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-semibold mb-2">Create Custom Forms</h3>
              <p className="text-sm text-muted-foreground">
                Use forms on your website to capture leads automatically. Each form submission creates a new lead in
                your CRM.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <Card className="p-12 text-center bg-primary/5 border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start managing your leads more effectively today. Sign up for free and explore all features with our
            intuitive interface.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-semibold">Leedy CRM</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 Leedy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
