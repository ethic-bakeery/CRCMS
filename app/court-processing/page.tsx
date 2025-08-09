"use client"

import type React from "react"

import { useState } from "react"
import {
  ArrowLeft,
  Gavel,
  Shield,
  FileText,
  Upload,
  Download,
  Eye,
  CheckCircle,
  User,
  Plus,
  X,
  Save,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample case data
const caseData = {
  caseId: "NPF-2024-001",
  suspectName: "Adebayo Johnson Okafor",
  crimeType: "Armed Robbery",
  dateOpened: "2024-01-10",
  currentStatus: "In Court",
  priority: "High",
  assignedJudge: "Hon. Justice Adebayo Ogundimu",
  courtRoom: "Court Room 3",
  prosecutingOfficer: "Inspector Adamu Yakubu",
  defenseAttorney: "Barrister Chukwuma Obi",
}

// Sample court session logs
const courtSessionLogs = [
  {
    id: 1,
    date: "2024-02-15",
    time: "10:00 AM",
    sessionType: "First Hearing",
    judge: "Hon. Justice Adebayo Ogundimu",
    notes: "Case presented. Defendant pleaded not guilty. Evidence review scheduled.",
    outcome: "Adjourned",
    nextDate: "2024-03-01",
  },
  {
    id: 2,
    date: "2024-03-01",
    time: "11:30 AM",
    sessionType: "Evidence Review",
    judge: "Hon. Justice Adebayo Ogundimu",
    notes: "CCTV footage presented. Witness testimonies recorded. Defense arguments heard.",
    outcome: "Adjourned",
    nextDate: "2024-03-15",
  },
  {
    id: 3,
    date: "2024-03-15",
    time: "09:00 AM",
    sessionType: "Final Arguments",
    judge: "Hon. Justice Adebayo Ogundimu",
    notes: "Prosecution and defense presented final arguments. Case ready for verdict.",
    outcome: "Pending Verdict",
    nextDate: "2024-03-22",
  },
]

// Sample court documents
const courtDocuments = [
  {
    id: 1,
    name: "Case_File_NPF-2024-001.pdf",
    type: "Case File",
    size: "3.2 MB",
    uploadedBy: "Inspector Adamu",
    uploadDate: "2024-02-10",
    category: "police",
  },
  {
    id: 2,
    name: "Evidence_Photos.zip",
    type: "Evidence",
    size: "15.8 MB",
    uploadedBy: "Corporal Musa",
    uploadDate: "2024-02-12",
    category: "evidence",
  },
  {
    id: 3,
    name: "Witness_Statements.pdf",
    type: "Witness Statement",
    size: "1.9 MB",
    uploadedBy: "Sergeant Bello",
    uploadDate: "2024-02-14",
    category: "witness",
  },
  {
    id: 4,
    name: "Defense_Motion.pdf",
    type: "Legal Motion",
    size: "0.8 MB",
    uploadedBy: "Barrister Obi",
    uploadDate: "2024-02-28",
    category: "legal",
  },
]

interface VerdictData {
  verdict: string
  sentenceType: string
  sentenceDuration: string
  fineAmount: string
  additionalConditions: string
  judgmentNotes: string
}

function CaseHeaderCard() {
  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-gray-900">{caseData.caseId}</CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              {caseData.crimeType} • Opened: {caseData.dateOpened}
            </CardDescription>
          </div>
          <Badge
            className={
              caseData.currentStatus === "In Court"
                ? "bg-blue-100 text-blue-800"
                : caseData.currentStatus === "Closed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
            }
          >
            {caseData.currentStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Suspect</p>
              <p className="text-sm text-gray-600">{caseData.suspectName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Gavel className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Judge</p>
              <p className="text-sm text-gray-600">{caseData.assignedJudge}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Prosecutor</p>
              <p className="text-sm text-gray-600">{caseData.prosecutingOfficer}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Court Room</p>
              <p className="text-sm text-gray-600">{caseData.courtRoom}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CourtSessionLogs() {
  const [isAddingSession, setIsAddingSession] = useState(false)
  const [newSession, setNewSession] = useState({
    date: "",
    time: "",
    sessionType: "",
    notes: "",
    outcome: "",
    nextDate: "",
  })

  const handleAddSession = () => {
    // Handle adding new session
    console.log("Adding session:", newSession)
    setIsAddingSession(false)
    setNewSession({ date: "", time: "", sessionType: "", notes: "", outcome: "", nextDate: "" })
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Court Session Logs</CardTitle>
            <CardDescription className="text-gray-600">Record of all court proceedings</CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => setIsAddingSession(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Session
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-700">Date & Time</TableHead>
                <TableHead className="text-gray-700">Session Type</TableHead>
                <TableHead className="text-gray-700">Judge</TableHead>
                <TableHead className="text-gray-700">Session Notes</TableHead>
                <TableHead className="text-gray-700">Outcome</TableHead>
                <TableHead className="text-gray-700">Next Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courtSessionLogs.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="text-gray-900">
                    <div>
                      <p className="font-medium">{session.date}</p>
                      <p className="text-sm text-gray-600">{session.time}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">{session.sessionType}</TableCell>
                  <TableCell className="text-gray-700">{session.judge}</TableCell>
                  <TableCell className="text-gray-700 max-w-xs">
                    <p className="truncate" title={session.notes}>
                      {session.notes}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        session.outcome === "Adjourned"
                          ? "bg-yellow-100 text-yellow-800"
                          : session.outcome === "Pending Verdict"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {session.outcome}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{session.nextDate || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Add Session Form */}
        {isAddingSession && (
          <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-4">Add New Court Session</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700">Date</Label>
                <Input
                  type="date"
                  value={newSession.date}
                  onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <Label className="text-gray-700">Time</Label>
                <Input
                  type="time"
                  value={newSession.time}
                  onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <Label className="text-gray-700">Session Type</Label>
                <Select
                  value={newSession.sessionType}
                  onValueChange={(value) => setNewSession({ ...newSession, sessionType: value })}
                >
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="First Hearing">First Hearing</SelectItem>
                    <SelectItem value="Evidence Review">Evidence Review</SelectItem>
                    <SelectItem value="Witness Testimony">Witness Testimony</SelectItem>
                    <SelectItem value="Final Arguments">Final Arguments</SelectItem>
                    <SelectItem value="Verdict">Verdict</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-700">Outcome</Label>
                <Select
                  value={newSession.outcome}
                  onValueChange={(value) => setNewSession({ ...newSession, outcome: value })}
                >
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Adjourned">Adjourned</SelectItem>
                    <SelectItem value="Pending Verdict">Pending Verdict</SelectItem>
                    <SelectItem value="Verdict Delivered">Verdict Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Label className="text-gray-700">Session Notes</Label>
              <Textarea
                value={newSession.notes}
                onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
                className="border-gray-300"
                placeholder="Enter detailed session notes..."
              />
            </div>
            <div className="flex items-center justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddingSession(false)} className="bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleAddSession} className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Session
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function VerdictEntrySection({ onVerdictSubmit }: { onVerdictSubmit: (verdict: VerdictData) => void }) {
  const [verdictData, setVerdictData] = useState<VerdictData>({
    verdict: "",
    sentenceType: "",
    sentenceDuration: "",
    fineAmount: "",
    additionalConditions: "",
    judgmentNotes: "",
  })

  const handleSubmitVerdict = () => {
    onVerdictSubmit(verdictData)
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center space-x-2">
          <Gavel className="w-5 h-5" />
          <span>Verdict Entry</span>
        </CardTitle>
        <CardDescription className="text-gray-600">Enter final court verdict and sentencing details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Verdict */}
          <div className="space-y-2">
            <Label className="text-gray-900 font-medium">Verdict</Label>
            <Select
              value={verdictData.verdict}
              onValueChange={(value) => setVerdictData({ ...verdictData, verdict: value })}
            >
              <SelectTrigger className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]">
                <SelectValue placeholder="Select verdict" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="guilty">Guilty</SelectItem>
                <SelectItem value="not-guilty">Not Guilty</SelectItem>
                <SelectItem value="dismissed">Case Dismissed</SelectItem>
                <SelectItem value="mistrial">Mistrial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sentence Type (only if guilty) */}
          {verdictData.verdict === "guilty" && (
            <div className="space-y-2">
              <Label className="text-gray-900 font-medium">Sentence Type</Label>
              <Select
                value={verdictData.sentenceType}
                onValueChange={(value) => setVerdictData({ ...verdictData, sentenceType: value })}
              >
                <SelectTrigger className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]">
                  <SelectValue placeholder="Select sentence type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="imprisonment">Imprisonment</SelectItem>
                  <SelectItem value="fine">Fine Only</SelectItem>
                  <SelectItem value="community-service">Community Service</SelectItem>
                  <SelectItem value="probation">Probation</SelectItem>
                  <SelectItem value="suspended">Suspended Sentence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {verdictData.verdict === "guilty" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sentence Duration */}
            {(verdictData.sentenceType === "imprisonment" || verdictData.sentenceType === "probation") && (
              <div className="space-y-2">
                <Label className="text-gray-900 font-medium">Sentence Duration</Label>
                <Input
                  placeholder="e.g., 5 years, 18 months"
                  value={verdictData.sentenceDuration}
                  onChange={(e) => setVerdictData({ ...verdictData, sentenceDuration: e.target.value })}
                  className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
                />
              </div>
            )}

            {/* Fine Amount */}
            {(verdictData.sentenceType === "fine" || verdictData.sentenceType === "imprisonment") && (
              <div className="space-y-2">
                <Label className="text-gray-900 font-medium">Fine Amount (₦)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 500000"
                  value={verdictData.fineAmount}
                  onChange={(e) => setVerdictData({ ...verdictData, fineAmount: e.target.value })}
                  className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
                />
              </div>
            )}
          </div>
        )}

        {/* Additional Conditions */}
        <div className="space-y-2">
          <Label className="text-gray-900 font-medium">Additional Conditions</Label>
          <Textarea
            placeholder="Enter any additional conditions, restrictions, or requirements..."
            value={verdictData.additionalConditions}
            onChange={(e) => setVerdictData({ ...verdictData, additionalConditions: e.target.value })}
            className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
          />
        </div>

        {/* Judgment Notes */}
        <div className="space-y-2">
          <Label className="text-gray-900 font-medium">Judgment Notes</Label>
          <Textarea
            placeholder="Enter detailed judgment reasoning and notes..."
            value={verdictData.judgmentNotes}
            onChange={(e) => setVerdictData({ ...verdictData, judgmentNotes: e.target.value })}
            className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] min-h-24"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={handleSubmitVerdict}
            disabled={!verdictData.verdict}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold"
          >
            <Gavel className="w-4 h-4 mr-2" />
            Submit Verdict
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CourtDocumentsSection() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles([...uploadedFiles, ...files])
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "police":
        return "bg-blue-100 text-blue-800"
      case "evidence":
        return "bg-red-100 text-red-800"
      case "witness":
        return "bg-green-100 text-green-800"
      case "legal":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Court Documents</CardTitle>
            <CardDescription className="text-gray-600">Case files, evidence, and legal documents</CardDescription>
          </div>
          <div>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.png,.zip"
              onChange={handleFileUpload}
              className="hidden"
              id="court-document-upload"
            />
            <Label htmlFor="court-document-upload">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </Label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {courtDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <FileText className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">{doc.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={getCategoryColor(doc.category)}>{doc.type}</Badge>
                    <span className="text-sm text-gray-500">
                      {doc.size} • {doc.uploadedBy} • {doc.uploadDate}
                    </span>
                  </div>
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

          {/* Show uploaded files */}
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50"
            >
              <div className="flex items-center space-x-4">
                <FileText className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <span className="text-sm text-green-600">
                    Newly uploaded • {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function FinalStatusCard({ isVisible, verdictData }: { isVisible: boolean; verdictData: VerdictData | null }) {
  if (!isVisible || !verdictData) return null

  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-800 flex items-center space-x-2">
          <CheckCircle className="w-6 h-6" />
          <span>Case Closed</span>
        </CardTitle>
        <CardDescription className="text-green-700">
          Final verdict has been entered and case is now closed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-green-800">Final Verdict</p>
            <Badge
              className={
                verdictData.verdict === "guilty"
                  ? "bg-red-100 text-red-800"
                  : verdictData.verdict === "not-guilty"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
              }
            >
              {verdictData.verdict === "guilty"
                ? "Guilty"
                : verdictData.verdict === "not-guilty"
                  ? "Not Guilty"
                  : verdictData.verdict}
            </Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-green-800">Date Closed</p>
            <p className="text-sm text-green-700">{new Date().toLocaleDateString()}</p>
          </div>
          {verdictData.verdict === "guilty" && verdictData.sentenceType && (
            <>
              <div className="space-y-2">
                <p className="text-sm font-medium text-green-800">Sentence</p>
                <p className="text-sm text-green-700">{verdictData.sentenceType}</p>
              </div>
              {verdictData.sentenceDuration && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-800">Duration</p>
                  <p className="text-sm text-green-700">{verdictData.sentenceDuration}</p>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function CourtProcessingPage() {
  const [caseStatus, setCaseStatus] = useState("In Court")
  const [finalVerdict, setFinalVerdict] = useState<VerdictData | null>(null)

  const handleVerdictSubmit = (verdictData: VerdictData) => {
    setFinalVerdict(verdictData)
    setCaseStatus("Closed")
    console.log("Verdict submitted:", verdictData)
  }

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
                <h1 className="text-xl font-bold text-white">Court Processing</h1>
                <p className="text-gray-300 text-sm">Criminal Records & Case Management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Case Header */}
        <CaseHeaderCard />

        {/* Final Status Card (only visible when case is closed) */}
        <FinalStatusCard isVisible={caseStatus === "Closed"} verdictData={finalVerdict} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <CourtSessionLogs />
            <CourtDocumentsSection />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Only show verdict entry if case is not closed */}
            {caseStatus !== "Closed" && <VerdictEntrySection onVerdictSubmit={handleVerdictSubmit} />}
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
