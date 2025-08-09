"use client"

import { useState } from "react"
import {
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  FileText,
  Upload,
  Eye,
  Download,
  Phone,
  Mail,
  Shield,
  CheckCircle,
  AlertTriangle,
  Gavel,
  Camera,
  Video,
  File,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Sample case data
const caseData = {
  caseId: "NPF-2024-001",
  crimeType: "Armed Robbery",
  location: {
    state: "Lagos State",
    policeStation: "Victoria Island Division",
    address: "15 Ahmadu Bello Way, Victoria Island, Lagos",
  },
  dateOpened: "2024-01-10",
  currentStatus: "Under Investigation",
  description:
    "Armed robbery incident at First Bank branch involving multiple suspects and stolen cash amount of ₦2,500,000",
  priority: "High",
}

// Sample suspect data
const suspectData = {
  id: "SUS-001",
  name: "Adebayo Johnson Okafor",
  age: 28,
  photo: "/placeholder.svg?height=80&width=80",
  profileLink: "/citizen-profile",
  status: "In Custody",
  arrestDate: "2024-01-12",
}

// Sample complainant data
const complainantData = {
  name: "First Bank Nigeria Ltd",
  contact: "+234-801-234-5678",
  email: "security@firstbank.com.ng",
  profileLink: "/complainant-profile",
  representative: "Mr. Chukwuma Okafor - Security Manager",
}

// Sample timeline data
const timelineData = [
  {
    id: 1,
    event: "Case Opened",
    date: "2024-01-10",
    time: "09:30 AM",
    description: "Initial complaint filed by First Bank Nigeria",
    officer: "Inspector Adamu",
    status: "completed",
  },
  {
    id: 2,
    event: "Investigation Started",
    date: "2024-01-10",
    time: "11:00 AM",
    description: "Crime scene investigation team deployed",
    officer: "Inspector Adamu",
    status: "completed",
  },
  {
    id: 3,
    event: "Suspect Arrested",
    date: "2024-01-12",
    time: "06:45 AM",
    description: "Primary suspect apprehended at residence",
    officer: "Sergeant Bello",
    status: "completed",
  },
  {
    id: 4,
    event: "Evidence Collected",
    date: "2024-01-13",
    time: "02:15 PM",
    description: "CCTV footage and fingerprints collected",
    officer: "Corporal Musa",
    status: "completed",
  },
  {
    id: 5,
    event: "Court Hearing Scheduled",
    date: "2024-02-15",
    time: "10:00 AM",
    description: "First hearing at Lagos High Court",
    officer: "Inspector Adamu",
    status: "pending",
  },
]

// Sample evidence data
const evidenceData = [
  {
    id: 1,
    name: "CCTV_Footage_Bank_Entrance.mp4",
    type: "video",
    size: "45.2 MB",
    uploadedBy: "Corporal Musa",
    uploadDate: "2024-01-13",
  },
  {
    id: 2,
    name: "Fingerprint_Analysis_Report.pdf",
    type: "document",
    size: "2.1 MB",
    uploadedBy: "Inspector Adamu",
    uploadDate: "2024-01-14",
  },
  {
    id: 3,
    name: "Crime_Scene_Photos.zip",
    type: "image",
    size: "12.8 MB",
    uploadedBy: "Sergeant Bello",
    uploadDate: "2024-01-12",
  },
]

// Sample assigned officers
const assignedOfficers = [
  {
    id: 1,
    name: "Inspector Adamu Yakubu",
    role: "Lead Investigator",
    badge: "NPF-INS-2341",
    phone: "+234-803-123-4567",
  },
  {
    id: 2,
    name: "Sergeant Bello Musa",
    role: "Field Officer",
    badge: "NPF-SGT-5678",
    phone: "+234-805-987-6543",
  },
  {
    id: 3,
    name: "Corporal Ibrahim Hassan",
    role: "Evidence Officer",
    badge: "NPF-CPL-9012",
    phone: "+234-807-456-7890",
  },
]

function CaseSummaryCard() {
  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-gray-900">{caseData.caseId}</CardTitle>
            <CardDescription className="text-gray-600">{caseData.crimeType}</CardDescription>
          </div>
          <Badge
            className={
              caseData.currentStatus.includes("Investigation")
                ? "bg-yellow-100 text-yellow-800"
                : caseData.currentStatus.includes("Closed")
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
            }
          >
            {caseData.currentStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Location</p>
                <p className="text-sm text-gray-600">{caseData.location.state}</p>
                <p className="text-xs text-gray-500">{caseData.location.policeStation}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Date Opened</p>
                <p className="text-sm text-gray-600">{caseData.dateOpened}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Priority</p>
                <Badge variant="destructive" className="bg-red-100 text-red-800">
                  {caseData.priority}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-200">
          <p className="text-sm text-gray-700">{caseData.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function SuspectCard() {
  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900">Suspect Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-2 border-gray-300">
            <AvatarImage src={suspectData.photo || "/placeholder.svg"} alt={suspectData.name} />
            <AvatarFallback className="bg-gray-200 text-gray-700">
              {suspectData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{suspectData.name}</h3>
            <p className="text-sm text-gray-600">Age: {suspectData.age}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge
                className={
                  suspectData.status === "In Custody" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                }
              >
                {suspectData.status}
              </Badge>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <User className="w-3 h-3 mr-1" />
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ComplainantCard() {
  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900">Complainant Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h3 className="font-medium text-gray-900">{complainantData.name}</h3>
          <p className="text-sm text-gray-600">{complainantData.representative}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{complainantData.contact}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{complainantData.email}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-xs bg-transparent">
          <User className="w-3 h-3 mr-1" />
          View Profile
        </Button>
      </CardContent>
    </Card>
  )
}

function CaseTimeline() {
  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900">Case Timeline</CardTitle>
        <CardDescription className="text-gray-600">Chronological events and milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineData.map((event, index) => (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ${event.status === "completed" ? "bg-green-500" : "bg-yellow-500"}`}
                />
                {index < timelineData.length - 1 && <div className="w-px h-12 bg-gray-300 mt-2" />}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900">{event.event}</h4>
                  <div className="text-xs text-gray-500">
                    {event.date} • {event.time}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                <p className="text-xs text-gray-500">Officer: {event.officer}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function EvidenceSection() {
  const [isUploading, setIsUploading] = useState(false)

  const getFileIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5 text-blue-500" />
      case "image":
        return <Camera className="w-5 h-5 text-green-500" />
      case "document":
        return <File className="w-5 h-5 text-red-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Evidence</CardTitle>
            <CardDescription className="text-gray-600">Case evidence and documentation</CardDescription>
          </div>
          <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Plus className="w-4 h-4 mr-2" />
            Upload Evidence
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {evidenceData.map((evidence) => (
            <div key={evidence.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                {getFileIcon(evidence.type)}
                <div>
                  <p className="text-sm font-medium text-gray-900">{evidence.name}</p>
                  <p className="text-xs text-gray-500">
                    {evidence.size} • Uploaded by {evidence.uploadedBy} • {evidence.uploadDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Form */}
        <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
            <Input type="file" multiple className="hidden" id="evidence-upload" />
            <Label htmlFor="evidence-upload">
              <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                Choose Files
              </Button>
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AssignedOfficers() {
  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900">Assigned Officers</CardTitle>
        <CardDescription className="text-gray-600">Officers working on this case</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignedOfficers.map((officer) => (
            <div key={officer.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {officer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{officer.name}</p>
                  <p className="text-sm text-gray-600">{officer.role}</p>
                  <p className="text-xs text-gray-500">Badge: {officer.badge}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function CaseDetailsPage() {
  return (
    <div className="min-h-screen bg-[#06112F] text-white">
      {/* Header */}
      <header className="bg-[#06112F] border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Cases
            </Button>
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <Shield className="w-6 h-6 text-[#06112F]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Case Details</h1>
                <p className="text-gray-300 text-sm">Criminal Records & Case Management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Case Summary */}
        <CaseSummaryCard />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <SuspectCard />
            <ComplainantCard />
            <AssignedOfficers />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <CaseTimeline />
            <EvidenceSection />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
          <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 bg-transparent">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Gavel className="w-4 h-4 mr-2" />
            Send to Court
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Closed
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#06112F] border-t border-gray-700 p-4 text-center">
        <p className="text-red-400 text-sm font-medium">🔒 Confidential – Authorized Personnel Only</p>
      </footer>
    </div>
  )
}
