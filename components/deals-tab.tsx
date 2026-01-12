"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Calendar, TrendingUp, Plus, Edit2, Trash2 } from "lucide-react"
import { mockDeals } from "@/lib/mock-data"
import type { Deal } from "@/lib/types"
import { format } from "date-fns"
import { CreateDealDialog } from "./create-deal-dialog"
import { EditDealDialog } from "./edit-deal-dialog"

interface DealsTabProps {
  leadId: string
}

export function DealsTab({ leadId }: DealsTabProps) {
  const [deals, setDeals] = useState<Deal[]>(mockDeals.filter((deal) => deal.leadId === leadId))
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)

  const getStageColor = (stage: Deal["stage"]) => {
    switch (stage) {
      case "lead":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "contact":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "proposal":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "negotiation":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "closed_won":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "closed_lost":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStageLabel = (stage: Deal["stage"]) => {
    switch (stage) {
      case "lead":
        return "Lead"
      case "contact":
        return "Contact"
      case "proposal":
        return "Proposal"
      case "negotiation":
        return "Negotiation"
      case "closed_won":
        return "Closed Won"
      case "closed_lost":
        return "Closed Lost"
      default:
        return stage
    }
  }

  const handleAddDeal = (newDeal: Deal) => {
    setDeals([...deals, newDeal])
    setIsCreateOpen(false)
  }

  const handleUpdateDeal = (updatedDeal: Deal) => {
    setDeals(deals.map((deal) => (deal.id === updatedDeal.id ? updatedDeal : deal)))
    setSelectedDeal(null)
  }

  const handleDeleteDeal = (dealId: string) => {
    setDeals(deals.filter((deal) => deal.id !== dealId))
  }

  if (deals.length === 0) {
    return (
      <>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Associated Deals</CardTitle>
            <Button onClick={() => setIsCreateOpen(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Deal
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No deals associated with this lead yet</p>
              <Button variant="outline" onClick={() => setIsCreateOpen(true)}>
                Create First Deal
              </Button>
            </div>
          </CardContent>
        </Card>
        <CreateDealDialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          leadId={leadId}
          onDealCreated={handleAddDeal}
        />
      </>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Associated Deals</h3>
          <Button onClick={() => setIsCreateOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>
        {deals.map((deal) => (
          <Card key={deal.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{deal.title}</CardTitle>
                  <Badge variant="outline" className={`border ${getStageColor(deal.stage)}`}>
                    {getStageLabel(deal.stage)}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedDeal(deal)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteDeal(deal.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5" />
                    Deal Value
                  </label>
                  <p className="text-2xl font-bold mt-1">${deal.value.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Probability
                  </label>
                  <p className="text-2xl font-bold mt-1">{deal.probability}%</p>
                </div>
                {deal.expectedCloseDate && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Expected Close Date
                    </label>
                    <p className="mt-1">{format(deal.expectedCloseDate, "MMMM d, yyyy")}</p>
                  </div>
                )}
                {deal.notes && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Notes</label>
                    <p className="text-sm text-muted-foreground mt-1">{deal.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateDealDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        leadId={leadId}
        onDealCreated={handleAddDeal}
      />

      {selectedDeal && (
        <EditDealDialog
          open={!!selectedDeal}
          onOpenChange={(open) => !open && setSelectedDeal(null)}
          deal={selectedDeal}
          onDealUpdated={handleUpdateDeal}
        />
      )}
    </>
  )
}
