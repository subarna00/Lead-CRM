"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Shield, MoreVertical, Search } from "lucide-react"
import { mockUsers } from "@/lib/mock-data"
import type { User } from "@/lib/types"
import { InviteUserDialog } from "@/components/invite-user-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SettingsPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)

  const handleInviteUser = (newUser: User) => {
    setUsers([...users, newUser])
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your team and account settings</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="team" className="space-y-6">
        <TabsList>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
        </TabsList>

        {/* Team Members Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold mb-1">Team Members</h3>
                <p className="text-sm text-muted-foreground">Invite and manage your team members</p>
              </div>
              <Button onClick={() => setIsInviteDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Invite User
              </Button>
            </div>

            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const initials = user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()

                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <RoleBadge role={user.role} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-destructive">
                              Remove User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Roles & Permissions Tab */}
        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RoleCard
              title="Admin"
              description="Full access to all features and settings"
              userCount={users.filter((u) => u.role === "admin").length}
              permissions={[
                "Manage all leads and deals",
                "View all reports and analytics",
                "Manage team members",
                "Configure automation rules",
                "Access all settings",
              ]}
            />
            <RoleCard
              title="Manager"
              description="Access to team performance and reports"
              userCount={users.filter((u) => u.role === "manager").length}
              permissions={[
                "View all leads and deals",
                "Assign leads to team",
                "View team reports",
                "Create automation rules",
                "Manage own settings",
              ]}
            />
            <RoleCard
              title="Sales Rep"
              description="Access to assigned leads and activities"
              userCount={users.filter((u) => u.role === "sales_rep").length}
              permissions={[
                "Manage assigned leads",
                "Create and edit activities",
                "View own reports",
                "Update deal stages",
                "Manage own profile",
              ]}
            />
          </div>
        </TabsContent>

        {/* Account Settings Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">General Settings</h3>
            <div className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" defaultValue="Acme Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyWebsite">Company Website</Label>
                <Input id="companyWebsite" type="url" defaultValue="https://acme.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="America/New_York" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Notifications</h3>
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email updates about your leads</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Lead Assignments</p>
                  <p className="text-sm text-muted-foreground">Get notified when leads are assigned to you</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Digest</p>
                  <p className="text-sm text-muted-foreground">Receive a daily summary of your activities</p>
                </div>
                <input type="checkbox" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <InviteUserDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        onInviteUser={handleInviteUser}
      />
    </div>
  )
}

function RoleBadge({ role }: { role: User["role"] }) {
  const variants = {
    admin: { label: "Admin", className: "bg-primary/10 text-primary border-primary/20" },
    manager: { label: "Manager", className: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
    sales_rep: { label: "Sales Rep", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  }

  const variant = variants[role]
  return (
    <Badge variant="outline" className={variant.className}>
      {variant.label}
    </Badge>
  )
}

function RoleCard({
  title,
  description,
  userCount,
  permissions,
}: {
  title: string
  description: string
  userCount: number
  permissions: string[]
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{userCount} users</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="space-y-2">
        <p className="text-sm font-medium">Permissions:</p>
        <ul className="space-y-1">
          {permissions.map((permission, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>{permission}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
