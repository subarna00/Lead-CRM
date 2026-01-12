"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, DollarSign, TrendingUp, Calendar } from "lucide-react"
import { mockDeals, mockLeads } from "@/lib/mock-data"
import type { Deal, PipelineStage } from "@/lib/types"
import { CreateDealDialog } from "@/components/create-deal-dialog"
import { ViewDealDialog } from "@/components/view-deal-dialog"
import { cn } from "@/lib/utils"

const pipelineStages: { id: PipelineStage; label: string; color: string }[] = [
  { id: "lead", label: "Lead", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  { id: "contact", label: "Contact Made", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  { id: "proposal", label: "Proposal Sent", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  { id: "negotiation", label: "Negotiation", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  { id: "closed_won", label: "Closed Won", color: "bg-primary/10 text-primary border-primary/20" },
  { id: "closed_lost", label: "Closed Lost", color: "bg-red-500/10 text-red-500 border-red-500/20" },
]

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals)
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [viewingDeal, setViewingDeal] = useState<Deal | null>(null)

  const handleDragStart = (deal: Deal) => {
    setDraggedDeal(deal)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (stage: PipelineStage) => {
    if (draggedDeal) {
      const updatedDeals = deals.map((deal) =>
        deal.id === draggedDeal.id ? { ...deal, stage, updatedAt: new Date() } : deal,
      )
      setDeals(updatedDeals)
      setDraggedDeal(null)
    }
  }

  const handleCreateDeal = (newDeal: Deal) => {
    setDeals([newDeal, ...deals])
  }

  const getDealsByStage = (stage: PipelineStage) => {
    return deals.filter((deal) => deal.stage === stage)
  }

  const getStageTotal = (stage: PipelineStage) => {
    return getDealsByStage(stage.id).reduce((sum, deal) => sum + deal.value, 0)
  }

  const getTotalPipelineValue = () => {
    return deals.reduce((sum, deal) => sum + deal.value, 0)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sales Pipeline</h1>
          <p className="text-muted-foreground">Visualize and manage deals through your sales stages</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Deal
        </Button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Pipeline Value</p>
              <p className="text-2xl font-bold">${(getTotalPipelineValue() / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Deals</p>
              <p className="text-2xl font-bold">{deals.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Deal Size</p>
              <p className="text-2xl font-bold">
                ${deals.length > 0 ? (getTotalPipelineValue() / deals.length / 1000).toFixed(1) : 0}k
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {pipelineStages.map((stage) => {
            const stageDeals = getDealsByStage(stage.id)
            const stageTotal = getStageTotal(stage.id)

            return (
              <div
                key={stage.id}
                className="flex-shrink-0 w-80"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(stage.id)}
              >
                <Card className="h-full flex flex-col">
                  {/* Stage Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={cn("border", stage.color)}>
                        {stage.label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{stageDeals.length}</span>
                    </div>
                    <p className="text-sm font-semibold">${(stageTotal / 1000).toFixed(1)}k</p>
                  </div>

                  {/* Deals List */}
                  <div className="flex-1 p-3 space-y-3 overflow-y-auto min-h-[400px]">
                    {stageDeals.length === 0 ? (
                      <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                        No deals in this stage
                      </div>
                    ) : (
                      stageDeals.map((deal) => {
                        const lead = mockLeads.find((l) => l.id === deal.leadId)
                        return (
                          <div
                            key={deal.id}
                            draggable
                            onDragStart={() => handleDragStart(deal)}
                            onClick={() => setViewingDeal(deal)}
                            className="bg-background border border-border rounded-lg p-4 cursor-move hover:border-primary/50 transition-colors space-y-3"
                          >
                            <div>
                              <h4 className="font-semibold mb-1 line-clamp-1">{deal.title}</h4>
                              {lead && (
                                <p className="text-sm text-muted-foreground">
                                  {lead.firstName} {lead.lastName}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <span className="font-semibold text-primary">${(deal.value / 1000).toFixed(1)}k</span>
                              <Badge variant="secondary" className="text-xs">
                                {deal.probability}%
                              </Badge>
                            </div>

                            {deal.expectedCloseDate && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(deal.expectedCloseDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })
                    )}
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      <CreateDealDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateDeal={handleCreateDeal}
      />
      {viewingDeal && (
        <ViewDealDialog
          deal={viewingDeal}
          open={!!viewingDeal}
          onOpenChange={(open) => !open && setViewingDeal(null)}
        />
      )}
    </div>
  )
}
