"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Shield,
  Users,
  UserCheck,
  Building,
  ArrowLeft,
  Upload,
  AlertTriangle,
  CheckCircle,
  FileText,
  Camera,
  Home,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type Role = "public" | "officers" | "agencies" | null
type SubmissionStatus = "idle" | "submitting" | "success" | "error"

interface FormErrors {
  [key: string]: string
}

function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-[#06112F]/95 backdrop-blur-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-[#FFD700] p-2 rounded-full">
              <Shield className="w-6 h-6 text-[#06112F]" />
            </div>
            <div className="text-white">
              <h1 className="font-bold text-lg">NPF CRCMS</h1>
              <p className="text-xs text-gray-300">Access Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link href="/homepage" className="text-white hover:text-[#FFD700] transition-colors duration-200">
              <div className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </div>
            </Link>
            <Link href="/homepage">
              <Button
                variant="outline"
                className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#06112F] bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Main Site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function RoleSelector({ selectedRole, onRoleSelect }: { selectedRole: Role; onRoleSelect: (role: Role) => void }) {
  const roles = [
    {
      id: "public" as Role,
      title: "Public",
      icon: Users,
      description: "Report crimes and access safety information",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "officers" as Role,
      title: "Officers",
      icon: UserCheck,
      description: "Apply for system access and account creation",
      color: "from-green-500 to-green-600",
    },
    {
      id: "agencies" as Role,
      title: "Agencies",
      icon: Building,
      description: "Request integration with national database",
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {roles.map((role) => (
        <Card
          key={role.id}
          className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
            selectedRole === role.id
              ? "bg-[#FFD700]/10 border-[#FFD700] shadow-lg shadow-[#FFD700]/20"
              : "bg-white/5 border-gray-700 hover:bg-white/10"
          }`}
          onClick={() => onRoleSelect(role.id)}
        >
          <CardContent className="p-6 text-center">
            <div
              className={`bg-gradient-to-r ${role.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}
            >
              <role.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{role.description}</p>
            {selectedRole === role.id && (
              <div className="mt-4">
                <div className="w-full h-1 bg-[#FFD700] rounded-full" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function PublicForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    location: "",
    incidentType: "",
    dateTime: "",
    description: "",
    files: [] as File[],
    anonymous: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmissionStatus>("idle")

  const incidentTypes = [
    "Theft",
    "Assault",
    "Fraud",
    "Kidnapping",
    "Cybercrime",
    "Domestic Violence",
    "Drug-related",
    "Vandalism",
    "Other",
  ]

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.incidentType) newErrors.incidentType = "Incident type is required"
    if (!formData.dateTime) newErrors.dateTime = "Date and time is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setStatus("submitting")
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setStatus("success")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData({ ...formData, files: [...formData.files, ...files] })
  }

  const removeFile = (index: number) => {
    const newFiles = formData.files.filter((_, i) => i !== index)
    setFormData({ ...formData, files: newFiles })
  }

  if (status === "success") {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-4">Report Submitted Successfully</h3>
          <p className="text-green-700 mb-6">
            Thank you. Your report has been received and will be reviewed by the appropriate authorities. If you
            provided contact information, you may be contacted for additional details.
          </p>
          <Button
            onClick={() => {
              setStatus("idle")
              setFormData({
                fullName: "",
                contact: "",
                location: "",
                incidentType: "",
                dateTime: "",
                description: "",
                files: [],
                anonymous: false,
              })
            }}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Submit Another Report
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-2xl text-[#06112F] flex items-center space-x-2">
          <Users className="w-6 h-6" />
          <span>Crime Reporting Form</span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          Use this form to report crimes or suspicious activities. Your identity will remain confidential unless you
          choose otherwise.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Anonymous Reporting Option */}
          <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
            <Checkbox
              id="anonymous"
              checked={formData.anonymous}
              onCheckedChange={(checked) => setFormData({ ...formData, anonymous: checked as boolean })}
            />
            <Label htmlFor="anonymous" className="text-sm text-blue-800">
              Submit this report anonymously (no contact information required)
            </Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Full Name {!formData.anonymous && <span className="text-gray-500">(Optional)</span>}
              </Label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
                disabled={formData.anonymous}
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Email or Phone {!formData.anonymous && <span className="text-gray-500">(Optional for follow-up)</span>}
              </Label>
              <Input
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="Email or phone number"
                className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
                disabled={formData.anonymous}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Location of Incident <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Street address, area, or landmark"
                className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                  errors.location ? "border-[#FFD700] ring-[#FFD700]" : ""
                }`}
              />
              {errors.location && <p className="text-[#FFD700] text-sm">{errors.location}</p>}
            </div>

            {/* Incident Type */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Type of Incident <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.incidentType}
                onValueChange={(value) => setFormData({ ...formData, incidentType: value })}
              >
                <SelectTrigger
                  className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                    errors.incidentType ? "border-[#FFD700] ring-[#FFD700]" : ""
                  }`}
                >
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  {incidentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.incidentType && <p className="text-[#FFD700] text-sm">{errors.incidentType}</p>}
            </div>
          </div>

          {/* Date and Time */}
          <div className="space-y-2">
            <Label className="text-[#06112F] font-medium">
              Date & Time of Incident <span className="text-red-500">*</span>
            </Label>
            <Input
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
              className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                errors.dateTime ? "border-[#FFD700] ring-[#FFD700]" : ""
              }`}
            />
            {errors.dateTime && <p className="text-[#FFD700] text-sm">{errors.dateTime}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-[#06112F] font-medium">
              Detailed Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a detailed description of what happened, including any relevant details..."
              className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] min-h-32 ${
                errors.description ? "border-[#FFD700] ring-[#FFD700]" : ""
              }`}
            />
            {errors.description && <p className="text-[#FFD700] text-sm">{errors.description}</p>}
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label className="text-[#06112F] font-medium">Upload Photos/Videos (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload any relevant photos or videos</p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload">
                <Button type="button" variant="outline" size="sm" className="cursor-pointer bg-transparent">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </Label>
            </div>

            {/* File List */}
            {formData.files.length > 0 && (
              <div className="space-y-2">
                {formData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#06112F] font-bold py-3 text-lg"
          >
            {status === "submitting" ? "Submitting Report..." : "Submit Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function OfficersForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    rank: "",
    force: "",
    idNumber: "",
    email: "",
    phone: "",
    address: "",
    idDocument: null as File | null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmissionStatus>("idle")

  const forces = ["Nigerian Police Force", "EFCC", "DSS", "Immigration Service", "Customs Service", "Other"]

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.rank.trim()) newErrors.rank = "Rank/Position is required"
    if (!formData.force) newErrors.force = "Force/Unit is required"
    if (!formData.idNumber.trim()) newErrors.idNumber = "Official ID number is required"
    if (!formData.email.trim()) newErrors.email = "Work email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.address.trim()) newErrors.address = "Station/Office address is required"
    if (!formData.idDocument) newErrors.idDocument = "Official ID document is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setStatus("submitting")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setStatus("success")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, idDocument: file })
    }
  }

  if (status === "success") {
    return (
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Application Submitted</h3>
          <p className="text-blue-700 mb-6">
            Your application has been submitted successfully. You will receive an email confirmation and further
            instructions after verification. This process typically takes 3-5 business days.
          </p>
          <Button
            onClick={() => {
              setStatus("idle")
              setFormData({
                fullName: "",
                rank: "",
                force: "",
                idNumber: "",
                email: "",
                phone: "",
                address: "",
                idDocument: null,
              })
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-2xl text-[#06112F] flex items-center space-x-2">
          <UserCheck className="w-6 h-6" />
          <span>Officer Access Application</span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          Only verified Nigerian law enforcement officers may request system access. All applications are subject to
          approval and background verification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                  errors.fullName ? "border-[#FFD700] ring-[#FFD700]" : ""
                }`}
              />
              {errors.fullName && <p className="text-[#FFD700] text-sm">{errors.fullName}</p>}
            </div>

            {/* Rank/Position */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Official Rank/Position <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.rank}
                onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                placeholder="e.g., Inspector, Agent, Director"
                className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                  errors.rank ? "border-[#FFD700] ring-[#FFD700]" : ""
                }`}
              />
              {errors.rank && <p className="text-[#FFD700] text-sm">{errors.rank}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Force/Unit */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Force/Unit <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.force} onValueChange={(value) => setFormData({ ...formData, force: value })}>
                <SelectTrigger
                  className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                    errors.force ? "border-[#FFD700] ring-[#FFD700]" : ""
                  }`}
                >
                  <SelectValue placeholder="Select your force/unit" />
                </SelectTrigger>
                <SelectContent>
                  {forces.map((force) => (
                    <SelectItem key={force} value={force}>
                      {force}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.force && <p className="text-[#FFD700] text-sm">{errors.force}</p>}
            </div>

            {/* Official ID Number */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Official ID Number <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                placeholder="Enter your official ID number"
                className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                  errors.idNumber ? "border-[#FFD700] ring-[#FFD700]" : ""
                }`}
              />
              {errors.idNumber && <p className="text-[#FFD700] text-sm">{errors.idNumber}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Work Email */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Work Email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.name@agency.gov.ng"
                className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                  errors.email ? "border-[#FFD700] ring-[#FFD700]" : ""
                }`}
              />
              {errors.email && <p className="text-[#FFD700] text-sm">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234-xxx-xxx-xxxx"
                className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                  errors.phone ? "border-[#FFD700] ring-[#FFD700]" : ""
                }`}
              />
              {errors.phone && <p className="text-[#FFD700] text-sm">{errors.phone}</p>}
            </div>
          </div>

          {/* Station/Office Address */}
          <div className="space-y-2">
            <Label className="text-[#06112F] font-medium">
              Station/Office Address <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter your station or office address"
              className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                errors.address ? "border-[#FFD700] ring-[#FFD700]" : ""
              }`}
            />
            {errors.address && <p className="text-[#FFD700] text-sm">{errors.address}</p>}
          </div>

          {/* ID Document Upload */}
          <div className="space-y-2">
            <Label className="text-[#06112F] font-medium">
              Upload Official ID Document <span className="text-red-500">*</span>
            </Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                errors.idDocument ? "border-[#FFD700]" : "border-gray-300"
              }`}
            >
              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload your official ID card or badge</p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="id-upload"
              />
              <Label htmlFor="id-upload">
                <Button type="button" variant="outline" size="sm" className="cursor-pointer bg-transparent">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </Label>
              {formData.idDocument && <p className="text-sm text-green-600 mt-2">✓ {formData.idDocument.name}</p>}
            </div>
            {errors.idDocument && <p className="text-[#FFD700] text-sm">{errors.idDocument}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#06112F] font-bold py-3 text-lg"
          >
            {status === "submitting" ? "Submitting Application..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function AgenciesForm() {
  const [formData, setFormData] = useState({
    agencyName: "",
    agencyType: "",
    registrationNumber: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    purpose: "",
    authorizationLetter: null as File | null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmissionStatus>("idle")

  const agencyTypes = [
    "Nigerian Police Force",
    "EFCC",
    "DSS",
    "Immigration Service",
    "Customs Service",
    "Court System",
    "ICPC",
    "NAPTIP",
    "Other Government Agency",
  ]

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.agencyName.trim()) newErrors.agencyName = "Agency name is required"
    if (!formData.agencyType) newErrors.agencyType = "Agency type is required"
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration/License number is required"
    if (!formData.contactName.trim()) newErrors.contactName = "Contact person name is required"
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required"
    if (!formData.contactPhone.trim()) newErrors.contactPhone = "Contact phone is required"
    if (!formData.address.trim()) newErrors.address = "Official address is required"
    if (!formData.purpose.trim()) newErrors.purpose = "Purpose of integration is required"
    if (!formData.authorizationLetter) newErrors.authorizationLetter = "Authorization letter is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setStatus("submitting")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setStatus("success")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, authorizationLetter: file })
    }
  }

  if (status === "success") {
    return (
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-purple-800 mb-4">Integration Request Submitted</h3>
          <p className="text-purple-700 mb-6">
            Your request has been submitted successfully. Our technical team will contact you within 5-7 business days
            for verification and to discuss integration requirements.
          </p>
          <Button
            onClick={() => {
              setStatus("idle")
              setFormData({
                agencyName: "",
                agencyType: "",
                registrationNumber: "",
                contactName: "",
                contactEmail: "",
                contactPhone: "",
                address: "",
                purpose: "",
                authorizationLetter: null,
              })
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-2xl text-[#06112F] flex items-center space-x-2">
          <Building className="w-6 h-6" />
          <span>Agency Integration Request</span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          Government-approved agencies may integrate with the national database after verification and approval. All
          requests are subject to security clearance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Agency Name */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Agency Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.agencyName}
                onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                placeholder="Enter official agency name"
                className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                  errors.agencyName ? "border-[#FFD700] ring-[#FFD700]" : ""
                }`}
              />
              {errors.agencyName && <p className="text-[#FFD700] text-sm">{errors.agencyName}</p>}
            </div>

            {/* Agency Type */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Agency Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.agencyType}
                onValueChange={(value) => setFormData({ ...formData, agencyType: value })}
              >
                <SelectTrigger
                  className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                    errors.agencyType ? "border-[#FFD700] ring-[#FFD700]" : ""
                  }`}
                >
                  <SelectValue placeholder="Select agency type" />
                </SelectTrigger>
                <SelectContent>
                  {agencyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.agencyType && <p className="text-[#FFD700] text-sm">{errors.agencyType}</p>}
            </div>
          </div>

          {/* Registration Number */}
          <div className="space-y-2">
            <Label className="text-[#06112F] font-medium">
              Registration/License Number <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.registrationNumber}
              onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
              placeholder="Enter official registration or license number"
              className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                errors.registrationNumber ? "border-[#FFD700] ring-[#FFD700]" : ""
              }`}
            />
            {errors.registrationNumber && <p className="text-[#FFD700] text-sm">{errors.registrationNumber}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact Person */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Contact Person Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="Full name of contact person"
                className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                  errors.contactName ? "border-[#FFD700] ring-[#FFD700]" : ""
                }`}
              />
              {errors.contactName && <p className="text-[#FFD700] text-sm">{errors.contactName}</p>}
            </div>

            {/* Contact Email */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Contact Email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="official@agency.gov.ng"
                className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                  errors.contactEmail ? "border-[#FFD700] ring-[#FFD700]" : ""
                }`}
              />
              {errors.contactEmail && <p className="text-[#FFD700] text-sm">{errors.contactEmail}</p>}
            </div>

            {/* Contact Phone */}
            <div className="space-y-2">
              <Label className="text-[#06112F] font-medium">
                Contact Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="+234-xxx-xxx-xxxx"
                className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                  errors.contactPhone ? "border-[#FFD700] ring-[#FFD700]" : ""
                }`}
              />
              {errors.contactPhone && <p className="text-[#FFD700] text-sm">{errors.contactPhone}</p>}
            </div>
          </div>

          {/* Official Address */}
          <div className="space-y-2">
            <Label className="text-[#06112F] font-medium">
              Official Address <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter complete official address of the agency"
              className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${
                errors.address ? "border-[#FFD700] ring-[#FFD700]" : ""
              }`}
            />
            {errors.address && <p className="text-[#FFD700] text-sm">{errors.address}</p>}
          </div>

          {/* Purpose of Integration */}
          <div className="space-y-2">
            <Label className="text-[#06112F] font-medium">
              Purpose of Integration <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              placeholder="Explain how your agency plans to use the system and what data you need access to..."
              className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] min-h-32 ${
                errors.purpose ? "border-[#FFD700] ring-[#FFD700]" : ""
              }`}
            />
            {errors.purpose && <p className="text-[#FFD700] text-sm">{errors.purpose}</p>}
          </div>

          {/* Authorization Letter Upload */}
          <div className="space-y-2">
            <Label className="text-[#06112F] font-medium">
              Upload Agency Authorization Letter <span className="text-red-500">*</span>
            </Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                errors.authorizationLetter ? "border-[#FFD700]" : "border-gray-300"
              }`}
            >
              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload official authorization letter from agency head</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="auth-upload"
              />
              <Label htmlFor="auth-upload">
                <Button type="button" variant="outline" size="sm" className="cursor-pointer bg-transparent">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </Label>
              {formData.authorizationLetter && (
                <p className="text-sm text-green-600 mt-2">✓ {formData.authorizationLetter.name}</p>
              )}
            </div>
            {errors.authorizationLetter && <p className="text-[#FFD700] text-sm">{errors.authorizationLetter}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#06112F] font-bold py-3 text-lg"
          >
            {status === "submitting" ? "Submitting Request..." : "Submit Integration Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function AccessPortalPage() {
  const [selectedRole, setSelectedRole] = useState<Role>(null)

  const renderForm = () => {
    switch (selectedRole) {
      case "public":
        return <PublicForm />
      case "officers":
        return <OfficersForm />
      case "agencies":
        return <AgenciesForm />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#06112F]">
      <Navigation />

      <main className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              National Access & <span className="text-[#FFD700]">Crime Reporting Portal</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select your role below to continue with the appropriate form
            </p>
          </div>

          {/* Role Selector */}
          <RoleSelector selectedRole={selectedRole} onRoleSelect={setSelectedRole} />

          {/* Form Section */}
          <div className="transition-all duration-500 ease-in-out">
            {selectedRole && (
              <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">{renderForm()}</div>
            )}
          </div>

          {/* Security Notice */}
          {!selectedRole && (
            <div className="mt-12 bg-white/5 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-[#FFD700] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Security Notice</h3>
                  <p className="text-gray-300 leading-relaxed">
                    This portal is monitored and all submissions are logged. False information or misuse of this system
                    is a criminal offense. Only authorized personnel should apply for system access. All data is
                    encrypted and handled according to Nigerian data protection laws.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#06112F] border-t border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 Nigerian Police National Criminal Records & Case Management System. All Rights Reserved.
          </p>
          <p className="text-red-400 text-xs mt-2">🔒 Secure Portal – All Activities Monitored</p>
        </div>
      </footer>
    </div>
  )
}
