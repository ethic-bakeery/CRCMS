"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Fingerprint, User, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#06112F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Police Badge Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Shield className="w-96 h-96 text-white" />
      </div>

      {/* Registration Card */}
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 relative z-10">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-[#06112F] p-3 rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#06112F]">Create Account</CardTitle>
          <CardDescription className="text-gray-600">
            Nigerian Police National Criminal Records & Case Management System
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#06112F] font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
                required
              />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#06112F] font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your work email"
                className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
                required
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#06112F] font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#06112F] font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#06112F] font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F] pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-[#06112F] font-medium">
                Role
              </Label>
              <Select required>
                <SelectTrigger className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="police-officer">Police Officer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="court-official">Court Official</SelectItem>
                  <SelectItem value="efcc-officer">EFCC Officer</SelectItem>
                  <SelectItem value="dss-officer">DSS Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 text-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              Register
            </Button>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                href="/login"
                className="text-[#06112F] hover:text-blue-800 font-medium underline transition-colors"
              >
                Login
              </Link>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                </div>
                <div>
                  <p className="text-sm text-blue-800 font-medium">Security Notice</p>
                  <p className="text-sm text-blue-700 mt-1">
                    All accounts require biometric verification before activation.
                  </p>
                </div>
              </div>
            </div>

            {/* Biometric Verification Icons */}
            <div className="flex items-center justify-center mt-4 space-x-4">
              <div className="flex items-center space-x-2 text-gray-500">
                <Fingerprint className="w-6 h-6" />
                <span className="text-sm">Fingerprint</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-2 text-gray-500">
                <User className="w-6 h-6" />
                <span className="text-sm">Face ID</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
