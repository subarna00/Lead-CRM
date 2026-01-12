"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Zap, Play, MoreVertical } from "lucide-react"
import type { AutomationRule } from "@/lib/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockAutomations: AutomationRule[] = [
  {
    id: "1",
    name: "Auto-assign new leads",
    trigger: "lead_created",
    conditions: [{ field: "source", operator: "equals", value: "website" }],
    actions: [{ type: "assign_to_user", value: "Round robin" }],
    isActive: true,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "2",
    name: "Send welcome email to qualified leads",
    trigger: "lead_status_changed",
    conditions: [{ field: "status", operator: "equals", value: "qualified" }],
    actions: [{ type: "send_email", value: "Welcome Email Template" }],
    isActive: true,
    createdAt: new Date("2025-12-15"),
  },
  {
    id: "3",
    name: "Create follow-up task for high-score leads",
    trigger: "lead_created",
    conditions: [{ field: "score", operator: "greater_than", value: 80 }],
    actions: [
      { type: "create_task", value: "Follow up within 24 hours" },
      { type: "send_notification", value: "Slack notification" },
    ],
    isActive: true,
    createdAt: new Date("2025-11-20"),
  },
  {
    id: "4",
    name: "Move stale leads to lost",
    trigger: "time_based",
    conditions: [
      { field: "status", operator: "equals", value: "contacted" },
      { field: "last_activity", operator: "older_than", value: "30 days" },
    ],
    actions: [{ type: "change_status", value: "lost" }],
    isActive: false,
    createdAt: new Date("2025-10-10"),
  },
]

export default function AutomationPage() {
  const [automations, setAutomations] = useState<AutomationRule[]>(mockAutomations)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateAutomation = (newAutomation: AutomationRule) => {
    setAutomations([newAutomation, ...automations])
  }

  const handleToggleActive = (id: string) => {
    setAutomations(
      automations.map((automation) =>
        automation.id === id ? { ...automation, isActive: !automation.isActive } : automation,
      ),
    )
  }

  const handleDeleteAutomation = (id: string) => {
    setAutomations(automations.filter((automation) => automation.id !== id))
  }

  const activeCount = automations.filter((a) => a.isActive).length

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Automation</h1>
          <p className="text-muted-foreground">Automate your workflow with intelligent rules and triggers</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Automations</p>
              <p className="text-2xl font-bold">{automations.length}</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Rules</p>
              <p className="text-2xl font-bold">{activeCount}</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Play className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Actions This Month</p>
              <p className="text-2xl font-bold">1,247</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Automation List */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <Card key={automation.id} className="p-6">
            <div className="flex items-start gap-4">
              <div
                className={`h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  automation.isActive ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <Zap className={`h-6 w-6 ${automation.isActive ? "text-primary" : "text-muted-foreground"}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{automation.name}</h3>
                      <Badge variant={automation.isActive ? "default" : "secondary"}>
                        {automation.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Created {new Date(automation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={automation.isActive} onCheckedChange={() => handleToggleActive(automation.id)} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Automation</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteAutomation(automation.id)}
                          className="text-destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Trigger</p>
                    <Badge variant="outline" className="capitalize">
                      {automation.trigger.replace("_", " ")}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Conditions</p>
                    <div className="flex flex-wrap gap-2">
                      {automation.conditions.map((condition, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {condition.field} {condition.operator} {condition.value}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Actions</p>
                    <div className="flex flex-wrap gap-2">
                      {automation.actions.map((action, index) => (
                        <Badge key={index} className="text-xs">
                          {action.type.replace("_", " ")}: {action.value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {automations.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No automations yet</h3>
            <p className="text-muted-foreground mb-4">Create your first automation to streamline your workflow</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Automation
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
