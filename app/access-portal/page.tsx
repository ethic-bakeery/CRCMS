"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Shield, Users, Building2, Upload, ArrowLeft, Home, CheckCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

type Role = "public" | "officers" | "agencies" | null

export default function AccessPortalPage() {
  const [selectedRole, setSelectedRole] = useState<Role>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role)
    setIsSubmitted(false)
    setErrors({})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newErrors: Record<string, boolean> = {}

    // Basic validation
    const requiredFields = getRequiredFields()
    requiredFields.forEach((field) => {
      if (!formData.get(field)) {
        newErrors[field] = true
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsSubmitted(true)
  }

  const getRequiredFields = () => {
    switch (selectedRole) {
      case "public":
        return isAnonymous
          ? ["location", "incidentType", "dateTime", "description"]
          : ["fullName", "contact", "location", "incidentType", "dateTime", "description"]
      case "officers":
        return ["fullName", "rank", "force", "idNumber", "workEmail", "phone", "address"]
      case "agencies":
        return [
          "agencyName",
          "agencyType",
          "registrationNumber",
          "contactName",
          "contactEmail",
          "contactPhone",
          "address",
          "purpose",
        ]
      default:
        return []
    }
  }

  const resetForm = () => {
    setSelectedRole(null)
    setIsSubmitted(false)
    setIsAnonymous(false)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-[#06112F] relative overflow-hidden">
      {/* Police Badge Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Shield className="w-96 h-96 text-white" />
      </div>

      {/* Navigation Bar */}
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
              <Link href="/">
                <Button variant="ghost" className="text-white hover:text-[#FFD700] hover:bg-white/10">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#06112F] bg-transparent"
                >
                  Back to Main Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            National Access & <span className="text-[#FFD700]">Crime Reporting Portal</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Select your role below to continue</p>
        </div>

        {!selectedRole && !isSubmitted && (
          <>
            {/* Role Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Public Card */}
              <Card
                className="bg-white/10 border-gray-600 hover:bg-white/15 transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleRoleSelect("public")}
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-[#FFD700] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-[#06112F]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Public</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Report crimes or suspicious activities. Help make your community safer.
                  </p>
                </CardContent>
              </Card>

              {/* Officers Card */}
              <Card
                className="bg-white/10 border-gray-600 hover:bg-white/15 transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleRoleSelect("officers")}
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-[#FFD700] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-[#06112F]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Officers</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Apply for system access. Join the national criminal records network.
                  </p>
                </CardContent>
              </Card>

              {/* Agencies Card */}
              <Card
                className="bg-white/10 border-gray-600 hover:bg-white/15 transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleRoleSelect("agencies")}
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-[#FFD700] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-[#06112F]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Agencies</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Request database integration. Connect your agency to the national system.
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Role-Specific Forms */}
        {selectedRole && !isSubmitted && (
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-4">
                <Button
                  variant="ghost"
                  onClick={resetForm}
                  className="absolute left-4 top-4 text-gray-600 hover:text-[#06112F]"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="bg-[#06112F] p-3 rounded-full">
                  {selectedRole === "public" && <Users className="w-8 h-8 text-white" />}
                  {selectedRole === "officers" && <Shield className="w-8 h-8 text-white" />}
                  {selectedRole === "agencies" && <Building2 className="w-8 h-8 text-white" />}
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-[#06112F]">
                {selectedRole === "public" && "Report Crime or Suspicious Activity"}
                {selectedRole === "officers" && "Apply for System Access"}
                {selectedRole === "agencies" && "Request Database Integration"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {selectedRole === "public" &&
                  "Use this form to report crimes or suspicious activities. Your identity will remain confidential unless you choose otherwise."}
                {selectedRole === "officers" &&
                  "Only verified Nigerian law enforcement officers may request system access. All applications are subject to approval."}
                {selectedRole === "agencies" &&
                  "Government-approved agencies may integrate with the national database after verification and approval."}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Public Form */}
                {selectedRole === "public" && (
                  <>
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                      />
                      <Label htmlFor="anonymous" className="text-sm text-gray-700">
                        Submit anonymously (optional)
                      </Label>
                    </div>

                    {!isAnonymous && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="text-[#06112F] font-medium">
                            Full Name <span className="text-gray-500">(optional)</span>
                          </Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.fullName ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contact" className="text-[#06112F] font-medium">
                            Email or Phone <span className="text-gray-500">(optional, for follow-up)</span>
                          </Label>
                          <Input
                            id="contact"
                            name="contact"
                            type="text"
                            placeholder="Enter email or phone number"
                            className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.contact ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          />
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-[#06112F] font-medium">
                        Location of Incident <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="Enter location where incident occurred"
                        className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.location ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="incidentType" className="text-[#06112F] font-medium">
                        Type of Incident <span className="text-red-500">*</span>
                      </Label>
                      <Select name="incidentType" required>
                        <SelectTrigger
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.incidentType ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                        >
                          <SelectValue placeholder="Select incident type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="theft">Theft</SelectItem>
                          <SelectItem value="assault">Assault</SelectItem>
                          <SelectItem value="fraud">Fraud</SelectItem>
                          <SelectItem value="kidnapping">Kidnapping</SelectItem>
                          <SelectItem value="cybercrime">Cybercrime</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateTime" className="text-[#06112F] font-medium">
                        Date & Time of Incident <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="dateTime"
                        name="dateTime"
                        type="datetime-local"
                        className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.dateTime ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-[#06112F] font-medium">
                        Detailed Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Provide a detailed description of the incident"
                        className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] min-h-[120px] ${errors.description ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="evidence" className="text-[#06112F] font-medium">
                        Upload Photos/Videos <span className="text-gray-500">(optional)</span>
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#FFD700] transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, MP4 up to 10MB</p>
                        <Input
                          id="evidence"
                          name="evidence"
                          type="file"
                          multiple
                          accept="image/*,video/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Officers Form */}
                {selectedRole === "officers" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-[#06112F] font-medium">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.fullName ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rank" className="text-[#06112F] font-medium">
                          Official Rank/Position <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="rank"
                          name="rank"
                          type="text"
                          placeholder="e.g., Inspector, Sergeant"
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.rank ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="force" className="text-[#06112F] font-medium">
                        Force/Unit <span className="text-red-500">*</span>
                      </Label>
                      <Select name="force" required>
                        <SelectTrigger
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.force ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                        >
                          <SelectValue placeholder="Select your force/unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="police">Police</SelectItem>
                          <SelectItem value="efcc">EFCC</SelectItem>
                          <SelectItem value="dss">DSS</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="idNumber" className="text-[#06112F] font-medium">
                          Official ID Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="idNumber"
                          name="idNumber"
                          type="text"
                          placeholder="Enter your official ID number"
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.idNumber ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="workEmail" className="text-[#06112F] font-medium">
                          Work Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="workEmail"
                          name="workEmail"
                          type="email"
                          placeholder="Enter your official work email"
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.workEmail ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#06112F] font-medium">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.phone ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-[#06112F] font-medium">
                          Station/Office Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          placeholder="Enter your station/office address"
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.address ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="officialId" className="text-[#06112F] font-medium">
                        Upload Official ID Document <span className="text-red-500">*</span>
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#FFD700] transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload your official ID</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 5MB</p>
                        <Input
                          id="officialId"
                          name="officialId"
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="hidden"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Agencies Form */}
                {selectedRole === "agencies" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="agencyName" className="text-[#06112F] font-medium">
                          Agency Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="agencyName"
                          name="agencyName"
                          type="text"
                          placeholder="Enter your agency name"
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.agencyName ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="agencyType" className="text-[#06112F] font-medium">
                          Agency Type <span className="text-red-500">*</span>
                        </Label>
                        <Select name="agencyType" required>
                          <SelectTrigger
                            className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.agencyType ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          >
                            <SelectValue placeholder="Select agency type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="police">Police</SelectItem>
                            <SelectItem value="efcc">EFCC</SelectItem>
                            <SelectItem value="dss">DSS</SelectItem>
                            <SelectItem value="immigration">Immigration</SelectItem>
                            <SelectItem value="customs">Customs</SelectItem>
                            <SelectItem value="court">Court</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registrationNumber" className="text-[#06112F] font-medium">
                        Registration/License Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="registrationNumber"
                        name="registrationNumber"
                        type="text"
                        placeholder="Enter your agency registration/license number"
                        className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.registrationNumber ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactName" className="text-[#06112F] font-medium">
                          Contact Person Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contactName"
                          name="contactName"
                          type="text"
                          placeholder="Enter contact person's full name"
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.contactName ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactEmail" className="text-[#06112F] font-medium">
                          Contact Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contactEmail"
                          name="contactEmail"
                          type="email"
                          placeholder="Enter contact email address"
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.contactEmail ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone" className="text-[#06112F] font-medium">
                          Contact Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contactPhone"
                          name="contactPhone"
                          type="tel"
                          placeholder="Enter contact phone number"
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.contactPhone ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-[#06112F] font-medium">
                          Official Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          placeholder="Enter your agency's official address"
                          className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] ${errors.address ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="purpose" className="text-[#06112F] font-medium">
                        Purpose of Integration <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="purpose"
                        name="purpose"
                        placeholder="Explain the purpose and intended use of the database integration"
                        className={`border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] min-h-[120px] ${errors.purpose ? "border-[#FFD700] ring-[#FFD700]" : ""}`}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="authorizationLetter" className="text-[#06112F] font-medium">
                        Upload Agency Authorization Letter <span className="text-red-500">*</span>
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#FFD700] transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload authorization letter</p>
                        <p className="text-xs text-gray-500 mt-1">PDF up to 10MB</p>
                        <Input
                          id="authorizationLetter"
                          name="authorizationLetter"
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#06112F] font-bold py-3 text-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {selectedRole === "public" && "Submit Report"}
                  {selectedRole === "officers" && "Submit Application"}
                  {selectedRole === "agencies" && "Submit Request"}
                </Button>

                {/* Error Message */}
                {Object.keys(errors).length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-red-800 font-medium">Please fill in all required fields</p>
                      <p className="text-sm text-red-700 mt-1">
                        Fields highlighted in gold are required and must be completed.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        )}

        {/* Success Messages */}
        {isSubmitted && (
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-8 text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              {selectedRole === "public" && (
                <>
                  <h3 className="text-2xl font-bold text-[#06112F] mb-4">Report Submitted Successfully</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Thank you. Your report has been received and will be reviewed by the appropriate authorities.
                    {!isAnonymous && " You may be contacted for additional information if needed."}
                  </p>
                </>
              )}

              {selectedRole === "officers" && (
                <>
                  <h3 className="text-2xl font-bold text-[#06112F] mb-4">Application Submitted</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Your application has been submitted. You will receive an email after verification. The review
                    process typically takes 3-5 business days.
                  </p>
                </>
              )}

              {selectedRole === "agencies" && (
                <>
                  <h3 className="text-2xl font-bold text-[#06112F] mb-4">Integration Request Submitted</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Your request has been submitted. Our technical team will contact you for verification and discuss
                    the integration process within 7-10 business days.
                  </p>
                </>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#06112F] bg-transparent"
                >
                  Submit Another Request
                </Button>
                <Link href="/">
                  <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#06112F] font-bold">
                    Return to Homepage
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        {!isSubmitted && (
          <div className="mt-12 bg-blue-900/20 border border-blue-700 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Shield className="w-6 h-6 text-[#FFD700] mt-0.5" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Security Notice</p>
                <p className="text-sm text-gray-300 mt-1">
                  All submissions are encrypted and monitored for security. False reports or unauthorized access
                  attempts will be prosecuted to the full extent of the law.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
