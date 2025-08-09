"use client"

import type React from "react"

import { useState } from "react"
import {
  ArrowLeft,
  Shield,
  Users,
  Settings,
  Database,
  Plus,
  Edit,
  UserX,
  UserCheck,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample users data
const systemUsers = [
  {
    id: "1",
    name: "Inspector Adamu Yakubu",
    email: "a.yakubu@npf.gov.ng",
    role: "Police Officer",
    status: "Active",
    lastLogin: "2024-03-15 09:30 AM",
    station: "Victoria Island Division",
    badge: "NPF-INS-2341",
    dateCreated: "2023-08-15",
  },
  {
    id: "2",
    name: "Chief Inspector Ogundimu",
    email: "c.ogundimu@npf.gov.ng",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-03-15 08:15 AM",
    station: "Lagos State Command",
    badge: "NPF-CI-4567",
    dateCreated: "2023-06-10",
  },
  {
    id: "3",
    name: "Justice Adebayo Ogundimu",
    email: "j.ogundimu@judiciary.gov.ng",
    role: "Court Official",
    status: "Active",
    lastLogin: "2024-03-14 02:45 PM",
    station: "Lagos High Court",
    badge: "JUD-HON-789",
    dateCreated: "2023-09-20",
  },
  {
    id: "4",
    name: "Agent Bello Musa",
    email: "b.musa@efcc.gov.ng",
    role: "EFCC Officer",
    status: "Suspended",
    lastLogin: "2024-03-10 11:20 AM",
    station: "EFCC Lagos Zone",
    badge: "EFCC-AGT-456",
    dateCreated: "2023-11-05",
  },
  {
    id: "5",
    name: "Director Hassan Ibrahim",
    email: "h.ibrahim@dss.gov.ng",
    role: "DSS Officer",
    status: "Active",
    lastLogin: "2024-03-15 07:00 AM",
    station: "DSS Lagos Command",
    badge: "DSS-DIR-123",
    dateCreated: "2023-07-30",
  },
]

// Sample system logs
const systemLogs = [
  {
    id: "1",
    timestamp: "2024-03-15 09:45:23",
    user: "Inspector Adamu",
    action: "Case Created",
    details: "Created new case NPF-2024-001 for Armed Robbery",
    ipAddress: "192.168.1.45",
    status: "Success",
  },
  {
    id: "2",
    timestamp: "2024-03-15 09:30:15",
    user: "Chief Inspector Ogundimu",
    action: "User Login",
    details: "Successful login from Lagos State Command",
    ipAddress: "192.168.1.10",
    status: "Success",
  },
  {
    id: "3",
    timestamp: "2024-03-15 08:22:10",
    user: "Agent Bello",
    action: "Failed Login",
    details: "Invalid credentials - Account suspended",
    ipAddress: "192.168.1.78",
    status: "Failed",
  },
  {
    id: "4",
    timestamp: "2024-03-15 07:15:45",
    user: "Justice Ogundimu",
    action: "Verdict Entered",
    details: "Entered guilty verdict for case NPF-2023-456",
    ipAddress: "192.168.2.25",
    status: "Success",
  },
  {
    id: "5",
    timestamp: "2024-03-14 16:30:20",
    user: "Director Hassan",
    action: "Database Backup",
    details: "Initiated full system backup",
    ipAddress: "192.168.1.5",
    status: "Success",
  },
]

// Role permissions structure
const rolePermissions = {
  "Police Officer": {
    "Case Management": { create: true, read: true, update: true, delete: false },
    "Citizen Profiles": { create: true, read: true, update: true, delete: false },
    "Biometric Scanner": { create: true, read: true, update: false, delete: false },
    "Court Processing": { create: false, read: true, update: false, delete: false },
    Reports: { create: true, read: true, update: false, delete: false },
    "Admin Settings": { create: false, read: false, update: false, delete: false },
  },
  Admin: {
    "Case Management": { create: true, read: true, update: true, delete: true },
    "Citizen Profiles": { create: true, read: true, update: true, delete: true },
    "Biometric Scanner": { create: true, read: true, update: true, delete: false },
    "Court Processing": { create: true, read: true, update: true, delete: false },
    Reports: { create: true, read: true, update: true, delete: true },
    "Admin Settings": { create: true, read: true, update: true, delete: true },
  },
  "Court Official": {
    "Case Management": { create: false, read: true, update: true, delete: false },
    "Citizen Profiles": { create: false, read: true, update: false, delete: false },
    "Biometric Scanner": { create: false, read: true, update: false, delete: false },
    "Court Processing": { create: true, read: true, update: true, delete: false },
    Reports: { create: true, read: true, update: false, delete: false },
    "Admin Settings": { create: false, read: false, update: false, delete: false },
  },
  "EFCC Officer": {
    "Case Management": { create: true, read: true, update: true, delete: false },
    "Citizen Profiles": { create: false, read: true, update: false, delete: false },
    "Biometric Scanner": { create: true, read: true, update: false, delete: false },
    "Court Processing": { create: false, read: true, update: false, delete: false },
    Reports: { create: true, read: true, update: false, delete: false },
    "Admin Settings": { create: false, read: false, update: false, delete: false },
  },
  "DSS Officer": {
    "Case Management": { create: true, read: true, update: true, delete: false },
    "Citizen Profiles": { create: true, read: true, update: true, delete: false },
    "Biometric Scanner": { create: true, read: true, update: true, delete: false },
    "Court Processing": { create: false, read: true, update: false, delete: false },
    Reports: { create: true, read: true, update: true, delete: false },
    "Admin Settings": { create: false, read: true, update: false, delete: false },
  },
}

function UserManagementSection() {
  const [showAddUser, setShowAddUser] = useState(false)
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    station: "",
    badge: "",
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800"
      case "Police Officer":
        return "bg-blue-100 text-blue-800"
      case "Court Official":
        return "bg-orange-100 text-orange-800"
      case "EFCC Officer":
        return "bg-green-100 text-green-800"
      case "DSS Officer":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddUser = () => {
    console.log("Adding user:", newUser)
    setShowAddUser(false)
    setNewUser({ name: "", email: "", role: "", station: "", badge: "" })
  }

  const handleSuspendUser = (userId: string) => {
    console.log("Suspending user:", userId)
  }

  const handleActivateUser = (userId: string) => {
    console.log("Activating user:", userId)
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>User Management</span>
            </CardTitle>
            <CardDescription className="text-gray-600">Manage system users and their access</CardDescription>
          </div>
          <Button onClick={() => setShowAddUser(true)} className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Add User Form */}
        {showAddUser && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-4">Add New User</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700">Full Name</Label>
                <Input
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                  className="border-gray-300"
                />
              </div>
              <div>
                <Label className="text-gray-700">Email Address</Label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address"
                  className="border-gray-300"
                />
              </div>
              <div>
                <Label className="text-gray-700">Role</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Police Officer">Police Officer</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Court Official">Court Official</SelectItem>
                    <SelectItem value="EFCC Officer">EFCC Officer</SelectItem>
                    <SelectItem value="DSS Officer">DSS Officer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-700">Station/Department</Label>
                <Input
                  value={newUser.station}
                  onChange={(e) => setNewUser({ ...newUser, station: e.target.value })}
                  placeholder="Enter station or department"
                  className="border-gray-300"
                />
              </div>
              <div>
                <Label className="text-gray-700">Badge/ID Number</Label>
                <Input
                  value={newUser.badge}
                  onChange={(e) => setNewUser({ ...newUser, badge: e.target.value })}
                  placeholder="Enter badge or ID number"
                  className="border-gray-300"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setShowAddUser(false)} className="bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleAddUser} className="bg-green-600 hover:bg-green-700 text-white">
                Add User
              </Button>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-700">Name</TableHead>
                <TableHead className="text-gray-700">Email</TableHead>
                <TableHead className="text-gray-700">Role</TableHead>
                <TableHead className="text-gray-700">Status</TableHead>
                <TableHead className="text-gray-700">Station</TableHead>
                <TableHead className="text-gray-700">Last Login</TableHead>
                <TableHead className="text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-gray-900">
                    <div>
                      <p>{user.name}</p>
                      <p className="text-sm text-gray-500">{user.badge}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{user.station}</TableCell>
                  <TableCell className="text-gray-700">{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {user.status === "Active" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSuspendUser(user.id)}
                          className="bg-transparent text-red-600 hover:text-red-800"
                        >
                          <UserX className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleActivateUser(user.id)}
                          className="bg-transparent text-green-600 hover:text-green-800"
                        >
                          <UserCheck className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function RolePermissionsSection() {
  const [selectedRole, setSelectedRole] = useState("Police Officer")
  const [permissions, setPermissions] = useState(rolePermissions)

  const handlePermissionChange = (module: string, action: string, value: boolean) => {
    setPermissions((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole as keyof typeof prev],
        [module]: {
          ...prev[selectedRole as keyof typeof prev][module as keyof (typeof prev)[keyof typeof prev]],
          [action]: value,
        },
      },
    }))
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Role Permissions</span>
        </CardTitle>
        <CardDescription className="text-gray-600">Configure access rights for different user roles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-2">
            <Label className="text-gray-900">Select Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="border-gray-300 max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(permissions).map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Permissions Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-700">Module</TableHead>
                  <TableHead className="text-center text-gray-700">Create</TableHead>
                  <TableHead className="text-center text-gray-700">Read</TableHead>
                  <TableHead className="text-center text-gray-700">Update</TableHead>
                  <TableHead className="text-center text-gray-700">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(permissions[selectedRole as keyof typeof permissions]).map(([module, perms]) => (
                  <TableRow key={module}>
                    <TableCell className="font-medium text-gray-900">{module}</TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={perms.create}
                        onCheckedChange={(value) => handlePermissionChange(module, "create", value)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={perms.read}
                        onCheckedChange={(value) => handlePermissionChange(module, "read", value)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={perms.update}
                        onCheckedChange={(value) => handlePermissionChange(module, "update", value)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={perms.delete}
                        onCheckedChange={(value) => handlePermissionChange(module, "delete", value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Settings className="w-4 h-4 mr-2" />
              Save Permissions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SystemLogsSection() {
  const [logFilter, setLogFilter] = useState("all")

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const filteredLogs =
    logFilter === "all" ? systemLogs : systemLogs.filter((log) => log.status.toLowerCase() === logFilter)

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>System Logs</span>
            </CardTitle>
            <CardDescription className="text-gray-600">Monitor system activities and user actions</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={logFilter} onValueChange={setLogFilter}>
              <SelectTrigger className="border-gray-300 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Logs</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="bg-gray-600 hover:bg-gray-700 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-700">Timestamp</TableHead>
                <TableHead className="text-gray-700">User</TableHead>
                <TableHead className="text-gray-700">Action</TableHead>
                <TableHead className="text-gray-700">Details</TableHead>
                <TableHead className="text-gray-700">IP Address</TableHead>
                <TableHead className="text-gray-700">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm text-gray-700">{log.timestamp}</TableCell>
                  <TableCell className="font-medium text-gray-900">{log.user}</TableCell>
                  <TableCell className="text-gray-700">{log.action}</TableCell>
                  <TableCell className="text-gray-700 max-w-xs">
                    <p className="truncate" title={log.details}>
                      {log.details}
                    </p>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-gray-700">{log.ipAddress}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(log.status)}
                      <span className="text-sm text-gray-700">{log.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function BackupRestoreSection() {
  const [backupStatus, setBackupStatus] = useState<"idle" | "backing-up" | "success" | "error">("idle")
  const [restoreFile, setRestoreFile] = useState<File | null>(null)

  const handleBackup = () => {
    setBackupStatus("backing-up")
    // Simulate backup process
    setTimeout(() => {
      setBackupStatus("success")
      setTimeout(() => setBackupStatus("idle"), 3000)
    }, 3000)
  }

  const handleRestore = () => {
    if (restoreFile) {
      console.log("Restoring from file:", restoreFile.name)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setRestoreFile(file)
    }
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <span>Backup & Restore</span>
        </CardTitle>
        <CardDescription className="text-gray-600">Manage database backups and system restoration</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Backup Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Database Backup</h4>
            <p className="text-sm text-gray-600">Create a complete backup of the system database</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Last Backup</p>
                  <p className="text-sm text-gray-600">March 14, 2024 at 11:30 PM</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Success</Badge>
              </div>

              <Button
                onClick={handleBackup}
                disabled={backupStatus === "backing-up"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {backupStatus === "backing-up" ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Creating Backup...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup
                  </>
                )}
              </Button>

              {backupStatus === "success" && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Backup created successfully!</span>
                </div>
              )}
            </div>
          </div>

          {/* Restore Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Database Restore</h4>
            <p className="text-sm text-gray-600">Restore system from a backup file</p>

            <div className="space-y-3">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Select backup file to restore</p>
                <input
                  type="file"
                  accept=".sql,.bak,.backup"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="restore-file"
                />
                <Label htmlFor="restore-file">
                  <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                    Choose File
                  </Button>
                </Label>
              </div>

              {restoreFile && (
                <div className="p-3 border border-gray-200 rounded-lg">
                  <p className="font-medium text-gray-900">{restoreFile.name}</p>
                  <p className="text-sm text-gray-600">Size: {(restoreFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}

              <Button
                onClick={handleRestore}
                disabled={!restoreFile}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Restore Database
              </Button>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">Important Warning</p>
              <p className="text-sm text-red-700 mt-1">
                Database restoration will overwrite all current data. Ensure you have a recent backup before proceeding.
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-[#06112F] text-white">
      {/* Header */}
      <header className="bg-[#06112F] border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <Shield className="w-6 h-6 text-[#06112F]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Settings</h1>
                <p className="text-gray-300 text-sm">System Administration & Configuration</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger
              value="users"
              className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              Role Permissions
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              System Logs
            </TabsTrigger>
            <TabsTrigger
              value="backup"
              className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              Backup & Restore
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagementSection />
          </TabsContent>

          <TabsContent value="permissions">
            <RolePermissionsSection />
          </TabsContent>

          <TabsContent value="logs">
            <SystemLogsSection />
          </TabsContent>

          <TabsContent value="backup">
            <BackupRestoreSection />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-[#06112F] border-t border-gray-700 p-4 text-center">
        <p className="text-red-400 text-sm font-medium">🔒 Confidential – Authorized Personnel Only</p>
      </footer>
    </div>
  )
}
