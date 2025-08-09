"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Fingerprint, User, Shield, Scan } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#06112F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Nigerian Police Crest Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="relative">
          <Shield className="w-96 h-96 text-white" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-white rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">NPF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 relative z-10">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-[#06112F] p-3 rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#06112F]">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600">
            Nigerian Police National Criminal Records & Case Management System
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#06112F] font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
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

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 text-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              Login
            </Button>

            {/* Register Link */}
            <div className="text-center">
              <span className="text-gray-600">{"Don't have an account? "}</span>
              <Link href="/register" className="text-[#06112F] hover:text-blue-800 font-medium underline transition-colors">
                Register
              </Link>
            </div>
          </form>

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Biometric Login */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#06112F] text-[#06112F] hover:bg-[#06112F] hover:text-white transition-all duration-200 py-3 bg-transparent"
            >
              <div className="flex items-center justify-center space-x-3">
                <Fingerprint className="w-5 h-5" />
                <span className="font-medium">Biometric Login</span>
                <User className="w-5 h-5" />
              </div>
            </Button>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Fingerprint className="w-4 h-4" />
                <span>Fingerprint</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Scan className="w-4 h-4" />
                <span>Facial Recognition</span>
              </div>
            </div>
          </div>

          {/* Security Warning */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs italic text-red-600 leading-relaxed">
                Authorized personnel only. Unauthorized access is prohibited.
              </p>
            </div>
          </div>

          {/* Additional Security Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <p className="text-xs text-blue-800">
                This system is monitored and all activities are logged for security purposes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
