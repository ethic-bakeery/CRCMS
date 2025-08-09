"use client"

import { useState } from "react"
import {
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  Fingerprint,
  Eye,
  CheckCircle,
  AlertTriangle,
  FileText,
  Users,
  Shield,
  Phone,
  Home,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample citizen data
const citizenData = {
  id: "NIN-12345678901",
  name: "Adebayo Johnson Okafor",
  dateOfBirth: "1985-03-15",
  gender: "Male",
  nationalId: "12345678901",
  stateOfOrigin: "Lagos State",
  address: "15 Victoria Island, Lagos",
  phone: "+234-801-234-5678",
  email: "adebayo.okafor@email.com",
  photo: "/placeholder.svg?height=120&width=120",
  biometrics: {
    fingerprint: { verified: true, lastUpdated: "2024-01-15" },
    faceId: { verified: true, lastUpdated: "2024-01-15" },
  },
}

// Sample criminal records
const criminalRecords = [
  {
    caseId: "NPF-2024-001",
    crimeType: "Armed Robbery",
    date: "2024-01-10",
    status: "Under Investigation",
    assignedOfficer: "Inspector Adamu",
    policeStation: "Victoria Island Division",
    role: "Suspect",
  },
  {
    caseId: "NPF-2023-456",
    crimeType: "Fraud",
    date: "2023-11-22",
    status: "Closed - Convicted",
    assignedOfficer: "Sergeant Bello",
    policeStation: "Ikoyi Division",
    role: "Suspect",
  },
  {
    caseId: "NPF-2023-789",
    crimeType: "Theft",
    date: "2023-08-05",
    status: "Closed - Acquitted",
    assignedOfficer: "Inspector Chukwu",
    policeStation: "Lagos Island Division",
    role: "Suspect",
  },
]

// Sample complaint history
const complaintHistory = [
  {
    caseId: "NPF-2024-012",
    complainant: "Adebayo Johnson Okafor",
    crimeType: "Burglary",
    date: "2024-02-01",
    status: "Under Investigation",
    description: "House break-in and theft of electronics",
  },
  {
    caseId: "NPF-2023-890",
    complainant: "Adebayo Johnson Okafor",
    crimeType: "Vehicle Theft",
    date: "2023-12-15",
    status: "Closed - Resolved",
    description: "Motorcycle stolen from residence",
  },
]

// Sample connection data for graph view
const connectionData = {
  suspect: { name: "Adebayo Johnson Okafor", role: "Primary Suspect" },
  crimes: [
    { id: "crime1", name: "Armed Robbery", date: "2024-01-10" },
    { id: "crime2", name: "Fraud", date: "2023-11-22" },
  ],
  associates: [
    { name: "Ibrahim Musa", role: "Co-Suspect", connection: "Armed Robbery" },
    { name: "Fatima Ali", role: "Witness", connection: "Fraud" },
  ],
  complainants: [
    { name: "John Smith", role: "Victim", connection: "Armed Robbery" },
    { name: "Mary Johnson", role: "Victim", connection: "Fraud" },
  ],
}

function ProfileCard() {
  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Avatar className="w-24 h-24 border-4 border-yellow-500">
            <AvatarImage src={citizenData.photo || "/placeholder.svg"} alt={citizenData.name} />
            <AvatarFallback className="bg-gray-200 text-gray-700 text-2xl">
              {citizenData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl text-gray-900">{citizenData.name}</CardTitle>
        <CardDescription className="text-gray-600">National ID: {citizenData.nationalId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Date of Birth</p>
              <p className="text-sm text-gray-600">{citizenData.dateOfBirth}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Gender</p>
              <p className="text-sm text-gray-600">{citizenData.gender}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">State of Origin</p>
              <p className="text-sm text-gray-600">{citizenData.stateOfOrigin}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Home className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Address</p>
              <p className="text-sm text-gray-600">{citizenData.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Phone</p>
              <p className="text-sm text-gray-600">{citizenData.phone}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReporterDetails() {
  const reporterInfo = {
    name: "Chief Inspector Adebayo Ogundimu",
    rank: "Chief Inspector",
    badgeNumber: "NPF-CI-4567",
    station: "Victoria Island Division",
    phone: "+234-803-456-7890",
    email: "c.ogundimu@npf.gov.ng",
    dateReported: "2024-01-15",
    reportingOfficer: "Sergeant Bello Musa",
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900 text-lg">Reporting Officer Details</CardTitle>
        <CardDescription className="text-gray-600">Officer who filed this suspect profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">{reporterInfo.name}</p>
              <p className="text-xs text-gray-600">{reporterInfo.rank}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Badge Number</p>
              <p className="text-xs text-gray-600">{reporterInfo.badgeNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Station</p>
              <p className="text-xs text-gray-600">{reporterInfo.station}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Contact</p>
              <p className="text-xs text-gray-600">{reporterInfo.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Date Reported</p>
              <p className="text-xs text-gray-600">{reporterInfo.dateReported}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BiometricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Card className="bg-white/95 border-gray-300">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-green-100 rounded-full">
              <Fingerprint className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Fingerprint</p>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">Verified</span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                Updated: {citizenData.biometrics.fingerprint.lastUpdated}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/95 border-gray-300">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-green-100 rounded-full">
              <Eye className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Face Scan</p>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">Verified</span>
              </div>
              <p className="text-xs text-gray-500 truncate">Updated: {citizenData.biometrics.faceId.lastUpdated}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CriminalRecordsTable() {
  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900">Criminal Records</CardTitle>
        <CardDescription className="text-gray-600">
          Complete history of criminal cases involving this citizen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-700">Case ID</TableHead>
              <TableHead className="text-gray-700">Crime Type</TableHead>
              <TableHead className="text-gray-700">Date</TableHead>
              <TableHead className="text-gray-700">Status</TableHead>
              <TableHead className="text-gray-700">Assigned Officer</TableHead>
              <TableHead className="text-gray-700">Police Station</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {criminalRecords.map((record) => (
              <TableRow key={record.caseId}>
                <TableCell className="font-medium text-gray-900">{record.caseId}</TableCell>
                <TableCell className="text-gray-700">{record.crimeType}</TableCell>
                <TableCell className="text-gray-700">{record.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      record.status.includes("Investigation")
                        ? "default"
                        : record.status.includes("Convicted")
                          ? "destructive"
                          : "secondary"
                    }
                    className={
                      record.status.includes("Investigation")
                        ? "bg-yellow-100 text-yellow-800"
                        : record.status.includes("Convicted")
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                    }
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-700">{record.assignedOfficer}</TableCell>
                <TableCell className="text-gray-700">{record.policeStation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function ConnectionGraph() {
  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900">Crime Connection Network</CardTitle>
        <CardDescription className="text-gray-600">
          Visual representation of criminal connections and associations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 bg-gray-50 rounded-lg p-6 overflow-hidden">
          {/* Central suspect node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-red-500 text-white p-4 rounded-full text-center min-w-32">
              <User className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs font-medium">Primary Suspect</p>
              <p className="text-xs">{connectionData.suspect.name.split(" ")[0]}</p>
            </div>
          </div>

          {/* Crime nodes */}
          <div className="absolute top-16 left-1/4 transform -translate-x-1/2">
            <div className="bg-orange-500 text-white p-3 rounded-lg text-center">
              <AlertTriangle className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs font-medium">Armed Robbery</p>
              <p className="text-xs">2024-01-10</p>
            </div>
          </div>

          <div className="absolute top-16 right-1/4 transform translate-x-1/2">
            <div className="bg-orange-500 text-white p-3 rounded-lg text-center">
              <AlertTriangle className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs font-medium">Fraud</p>
              <p className="text-xs">2023-11-22</p>
            </div>
          </div>

          {/* Associate nodes */}
          <div className="absolute bottom-16 left-16">
            <div className="bg-blue-500 text-white p-3 rounded-lg text-center">
              <Users className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs font-medium">Co-Suspect</p>
              <p className="text-xs">Ibrahim Musa</p>
            </div>
          </div>

          <div className="absolute bottom-16 right-16">
            <div className="bg-green-500 text-white p-3 rounded-lg text-center">
              <Eye className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs font-medium">Witness</p>
              <p className="text-xs">Fatima Ali</p>
            </div>
          </div>

          {/* Victim nodes */}
          <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
            <div className="bg-purple-500 text-white p-3 rounded-lg text-center">
              <User className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs font-medium">Victim</p>
              <p className="text-xs">John Smith</p>
            </div>
          </div>

          <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
            <div className="bg-purple-500 text-white p-3 rounded-lg text-center">
              <User className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs font-medium">Victim</p>
              <p className="text-xs">Mary Johnson</p>
            </div>
          </div>

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="#374151" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="75%" y2="20%" stroke="#374151" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="15%" y2="80%" stroke="#374151" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="85%" y2="80%" stroke="#374151" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="#374151" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="#374151" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-700">Suspect</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-700">Crime</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-700">Associate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-700">Witness</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-gray-700">Victim</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ComplaintHistory() {
  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900">Complaint History</CardTitle>
        <CardDescription className="text-gray-600">Cases where this citizen filed complaints</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complaintHistory.map((complaint) => (
            <div key={complaint.caseId} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2 flex-wrap">
                    <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-900 whitespace-nowrap">{complaint.caseId}</span>
                    <Badge
                      variant={complaint.status.includes("Investigation") ? "default" : "secondary"}
                      className={
                        complaint.status.includes("Investigation")
                          ? "bg-yellow-100 text-yellow-800 text-xs"
                          : "bg-green-100 text-green-800 text-xs"
                      }
                    >
                      {complaint.status}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{complaint.crimeType}</h4>
                  <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{complaint.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function CitizenProfilePage() {
  const [activeTab, setActiveTab] = useState("table")

  return (
    <div className="min-h-screen bg-[#06112F] text-white">
      {/* Header */}
      <header className="bg-[#06112F] border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Search
            </Button>
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <Shield className="w-6 h-6 text-[#06112F]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Citizen Profile</h1>
                <p className="text-gray-300 text-sm">Criminal Records & Case Management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Biometrics */}
          <div className="space-y-4">
            <ProfileCard />
            <BiometricCards />
            <ComplaintHistory />
          </div>

          {/* Right Column - Criminal Records & Graph */}
          <div className="lg:col-span-2 space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger
                  value="table"
                  className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  Table View
                </TabsTrigger>
                <TabsTrigger
                  value="graph"
                  className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  Graph View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="table" className="space-y-4">
                <CriminalRecordsTable />
              </TabsContent>

              <TabsContent value="graph" className="space-y-4">
                <ConnectionGraph />
              </TabsContent>
            </Tabs>

            <ReporterDetails />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#06112F] border-t border-gray-700 p-4 text-center">
        <p className="text-red-400 text-sm font-medium">🔒 Confidential – Authorized Personnel Only</p>
      </footer>
    </div>
  )
}
