"use client"
import {
  Bell,
  Search,
  FileText,
  Users,
  Gavel,
  Fingerprint,
  LogOut,
  Shield,
  User,
  Plus,
  AlertTriangle,
  CheckCircle,
  Activity,
  ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data
const caseStats = [
  { title: "Open Cases", count: 24, icon: FileText, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { title: "Closed Cases", count: 156, icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-500/10" },
  { title: "Pending Court", count: 8, icon: Gavel, color: "text-orange-500", bgColor: "bg-orange-500/10" },
]

const alerts = [
  { id: 1, message: "Suspect John Doe missed court hearing", time: "2 hours ago", priority: "high" },
  { id: 2, message: "New case assigned: Armed Robbery - Case #2024-001", time: "4 hours ago", priority: "medium" },
  { id: 3, message: "Biometric match found for Case #2023-456", time: "6 hours ago", priority: "high" },
  { id: 4, message: "Court date scheduled for Case #2024-002", time: "1 day ago", priority: "low" },
]

const recentActivity = [
  { id: 1, action: "Filed new complaint", case: "Case #2024-003", time: "10 minutes ago" },
  { id: 2, action: "Updated suspect information", case: "Case #2024-001", time: "1 hour ago" },
  { id: 3, action: "Uploaded evidence photos", case: "Case #2023-789", time: "2 hours ago" },
  { id: 4, action: "Scheduled court hearing", case: "Case #2024-002", time: "3 hours ago" },
  { id: 5, action: "Completed biometric scan", case: "Case #2023-456", time: "5 hours ago" },
]

const menuItems = [
  { title: "Case Management", icon: FileText, href: "/case-details" },
  { title: "Search Citizens", icon: Search, href: "/citizen-profile" },
  // { title: "Reports", icon: Users, href: "/reports" },
  { title: "Court Updates", icon: Gavel, href: "/court-processing" },
  { title: "Biometric Scanner", icon: Fingerprint, href: "/biometric-scanner" },
]

function AppSidebar() {
  return (
    <Sidebar className="bg-[#06112F] border-r border-gray-700">
      <SidebarHeader className="border-b border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-full">
            <Shield className="w-6 h-6 text-[#06112F]" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">NPF CRCMS</h2>
            <p className="text-gray-300 text-xs">Criminal Records System</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="text-white hover:bg-white/10 hover:text-yellow-400 transition-colors"
              >
                <a href={item.href} className="flex items-center space-x-3 p-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
              <div className="flex items-center space-x-3 p-3">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#06112F]">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-[#06112F]">
          {/* Top Navigation */}
          <header className="bg-[#06112F] border-b border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-white hover:bg-white/10" />
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-full">
                    <Shield className="w-6 h-6 text-[#06112F]" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">Nigerian Police Force</h1>
                    <p className="text-gray-300 text-sm">Criminal Records & Case Management</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Bell className="w-5 h-5" />
                  <Badge className="ml-2 bg-red-500 text-white">3</Badge>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-white/10">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback className="bg-yellow-500 text-black">OA</AvatarFallback>
                      </Avatar>
                      <span>Officer Adebayo</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
                    <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 space-y-6 bg-[#06112F]">
            {/* Case Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStats.map((stat) => (
                <Card
                  key={stat.title}
                  className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stat.count}</div>
                    <p className="text-xs text-gray-400 mt-1">
                      {stat.title === "Open Cases" && "+2 from yesterday"}
                      {stat.title === "Closed Cases" && "+5 this week"}
                      {stat.title === "Pending Court" && "3 this week"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Alerts Section */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <span>Urgent Alerts</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Important notifications requiring attention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          alert.priority === "high"
                            ? "bg-red-500"
                            : alert.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-white text-sm">{alert.message}</p>
                        <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-gray-400">Frequently used operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium">
                    <Plus className="w-4 h-4 mr-2" />
                    Register New Suspect
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-600 text-white hover:bg-gray-700 bg-transparent"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    File Complaint
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-600 text-white hover:bg-gray-700 bg-transparent"
                  >
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Scan Biometric
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Feed */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Your recent actions and system updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.action}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300 bg-gray-800">
                            {activity.case}
                          </Badge>
                          <span className="text-gray-400 text-xs">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>

          {/* Footer */}
          <footer className="bg-[#06112F] border-t border-gray-700 p-4 text-center">
            <p className="text-red-400 text-sm font-medium">🔒 Confidential – Authorized Personnel Only</p>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
