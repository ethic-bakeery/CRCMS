"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, FileText, Upload, Shield, Search, Plus, X, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Sample data for autocomplete
const existingProfiles = [
  { id: "1", name: "Adebayo Johnson Okafor", type: "citizen", nin: "12345678901" },
  { id: "2", name: "Fatima Ali Hassan", type: "citizen", nin: "23456789012" },
  { id: "3", name: "Chukwuma Peter Obi", type: "citizen", nin: "34567890123" },
  { id: "4", name: "Aisha Bello Musa", type: "citizen", nin: "45678901234" },
]

const crimeTypes = [
  "Theft",
  "Armed Robbery",
  "Fraud",
  "Assault",
  "Kidnapping",
  "Murder",
  "Rape",
  "Domestic Violence",
  "Cybercrime",
  "Drug Trafficking",
  "Corruption",
  "Vandalism",
  "Burglary",
  "Vehicle Theft",
  "Other",
]

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
]

const policeStations = {
  Lagos: [
    "Victoria Island Division",
    "Ikoyi Division",
    "Lagos Island Division",
    "Surulere Division",
    "Ikeja Division",
    "Festac Division",
    "Apapa Division",
  ],
  FCT: ["Wuse Division", "Garki Division", "Maitama Division", "Asokoro Division", "Kubwa Division"],
  Rivers: ["Port Harcourt Division", "Eleme Division", "Obio/Akpor Division"],
}

interface FormData {
  complainantName: string
  complainantId: string
  suspectName: string
  suspectId: string
  crimeType: string
  description: string
  state: string
  policeStation: string
  dateOfIncident: string
  evidenceFiles: File[]
}

function AutocompleteInput({
  label,
  placeholder,
  value,
  onChange,
  onSelect,
  showAddNew = false,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  onSelect: (profile: any) => void
  showAddNew?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredProfiles, setFilteredProfiles] = useState(existingProfiles)

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue)
    const filtered = existingProfiles.filter((profile) => profile.name.toLowerCase().includes(inputValue.toLowerCase()))
    setFilteredProfiles(filtered)
    setIsOpen(inputValue.length > 0)
  }

  const handleSelect = (profile: any) => {
    onChange(profile.name)
    onSelect(profile)
    setIsOpen(false)
  }

  return (
    <div className="space-y-2 relative">
      <Label htmlFor={label.toLowerCase().replace(" ", "-")} className="text-gray-900 font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={label.toLowerCase().replace(" ", "-")}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] pr-10"
          onFocus={() => value.length > 0 && setIsOpen(true)}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleSelect(profile)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{profile.name}</p>
                    <p className="text-sm text-gray-600">NIN: {profile.nin}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Existing Profile
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No profiles found</div>
          )}

          {showAddNew && value.length > 0 && (
            <div className="border-t border-gray-200">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                <Plus className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 font-medium">Register new person: "{value}"</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function FileUploadSection({ files, onFilesChange }: { files: File[]; onFilesChange: (files: File[]) => void }) {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    onFilesChange([...files, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    onFilesChange(updatedFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-4">
      <Label className="text-gray-900 font-medium">Upload Evidence</Label>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
        <p className="text-xs text-gray-500 mb-4">Supported formats: Images, Videos, Documents (Max 10MB each)</p>
        <input
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
          id="evidence-upload"
        />
        <Label htmlFor="evidence-upload">
          <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
            Choose Files
          </Button>
        </Label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-900">Selected Files ({files.length})</p>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ComplaintFilingPage() {
  const [formData, setFormData] = useState<FormData>({
    complainantName: "",
    complainantId: "",
    suspectName: "",
    suspectId: "",
    crimeType: "",
    description: "",
    state: "",
    policeStation: "",
    dateOfIncident: "",
    evidenceFiles: [],
  })

  const [availableStations, setAvailableStations] = useState<string[]>([])

  const handleStateChange = (state: string) => {
    setFormData({ ...formData, state, policeStation: "" })
    setAvailableStations(policeStations[state as keyof typeof policeStations] || [])
  }

  const handleComplainantSelect = (profile: any) => {
    setFormData({ ...formData, complainantId: profile.id })
  }

  const handleSuspectSelect = (profile: any) => {
    setFormData({ ...formData, suspectId: profile.id })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

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
                <h1 className="text-xl font-bold text-white">File Complaint</h1>
                <p className="text-gray-300 text-sm">Criminal Records & Case Management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/95 border-gray-300">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">File New Complaint</CardTitle>
              <CardDescription className="text-gray-600">
                Please provide all relevant information about the incident
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Complainant Information */}
                  <AutocompleteInput
                    label="Complainant Name"
                    placeholder="Search for existing profile or enter new name"
                    value={formData.complainantName}
                    onChange={(value) => setFormData({ ...formData, complainantName: value })}
                    onSelect={handleComplainantSelect}
                    showAddNew={true}
                  />

                  {/* Suspect Information */}
                  <AutocompleteInput
                    label="Suspect Name"
                    placeholder="Search for existing profile or enter suspect name"
                    value={formData.suspectName}
                    onChange={(value) => setFormData({ ...formData, suspectName: value })}
                    onSelect={handleSuspectSelect}
                    showAddNew={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Crime Type */}
                  <div className="space-y-2">
                    <Label htmlFor="crime-type" className="text-gray-900 font-medium">
                      Crime Type
                    </Label>
                    <Select
                      value={formData.crimeType}
                      onValueChange={(value) => setFormData({ ...formData, crimeType: value })}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]">
                        <SelectValue placeholder="Select crime type" />
                      </SelectTrigger>
                      <SelectContent>
                        {crimeTypes.map((crime) => (
                          <SelectItem key={crime} value={crime}>
                            {crime}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date of Incident */}
                  <div className="space-y-2">
                    <Label htmlFor="date-incident" className="text-gray-900 font-medium">
                      Date of Incident
                    </Label>
                    <Input
                      id="date-incident"
                      type="date"
                      value={formData.dateOfIncident}
                      onChange={(e) => setFormData({ ...formData, dateOfIncident: e.target.value })}
                      className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* State */}
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-gray-900 font-medium">
                      State
                    </Label>
                    <Select value={formData.state} onValueChange={handleStateChange}>
                      <SelectTrigger className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Police Station */}
                  <div className="space-y-2">
                    <Label htmlFor="police-station" className="text-gray-900 font-medium">
                      Police Station
                    </Label>
                    <Select
                      value={formData.policeStation}
                      onValueChange={(value) => setFormData({ ...formData, policeStation: value })}
                      disabled={!formData.state}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]">
                        <SelectValue placeholder={formData.state ? "Select police station" : "Select state first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableStations.map((station) => (
                          <SelectItem key={station} value={station}>
                            {station}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-900 font-medium">
                    Description of Incident
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed description of the incident, including time, location, and circumstances..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] min-h-32"
                    required
                  />
                </div>

                {/* Evidence Upload */}
                <FileUploadSection
                  files={formData.evidenceFiles}
                  onFilesChange={(files) => setFormData({ ...formData, evidenceFiles: files })}
                />

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Security Notice</p>
                      <p className="text-sm text-blue-700 mt-1">
                        All complaints are verified before action is taken. False reporting is a criminal offense.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-8"
                  >
                    Submit Complaint
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#06112F] border-t border-gray-700 p-4 text-center">
        <p className="text-red-400 text-sm font-medium">🔒 Confidential – Authorized Personnel Only</p>
      </footer>
    </div>
  )
}
