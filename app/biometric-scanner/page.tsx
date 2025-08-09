"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowLeft,
  Fingerprint,
  Camera,
  Shield,
  CheckCircle,
  XCircle,
  Search,
  User,
  AlertTriangle,
  RefreshCw,
  Eye,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

type ScanStatus = "idle" | "scanning" | "verified" | "failed" | "no-match"
type ScanType = "fingerprint" | "facial" | "both"

interface BiometricResult {
  id: string
  name: string
  nin: string
  matchPercentage: number
  criminalRecord: boolean
  lastSeen: string
}

// Sample biometric results
const sampleResults: BiometricResult[] = [
  {
    id: "BIO-001",
    name: "Adebayo Johnson Okafor",
    nin: "12345678901",
    matchPercentage: 98.5,
    criminalRecord: true,
    lastSeen: "2024-01-15",
  },
  {
    id: "BIO-002",
    name: "Fatima Ali Hassan",
    nin: "23456789012",
    matchPercentage: 95.2,
    criminalRecord: false,
    lastSeen: "2023-11-22",
  },
]

function FingerprintScanWidget({
  status,
  progress,
  onStartScan,
}: {
  status: ScanStatus
  progress: number
  onStartScan: () => void
}) {
  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader className="text-center">
        <CardTitle className="text-gray-900 flex items-center justify-center space-x-2">
          <Fingerprint className="w-6 h-6" />
          <span>Fingerprint Scanner</span>
        </CardTitle>
        <CardDescription className="text-gray-600">Place finger on scanner for identification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fingerprint Animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div
              className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                status === "scanning"
                  ? "border-blue-500 bg-blue-50 animate-pulse"
                  : status === "verified"
                    ? "border-green-500 bg-green-50"
                    : status === "failed" || status === "no-match"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-gray-50 hover:border-blue-400 cursor-pointer"
              }`}
              onClick={status === "idle" ? onStartScan : undefined}
            >
              <Fingerprint
                className={`w-16 h-16 transition-colors duration-300 ${
                  status === "scanning"
                    ? "text-blue-500"
                    : status === "verified"
                      ? "text-green-500"
                      : status === "failed" || status === "no-match"
                        ? "text-red-500"
                        : "text-gray-400"
                }`}
              />

              {/* Scanning Animation Rings */}
              {status === "scanning" && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping" />
                  <div className="absolute inset-2 rounded-full border-2 border-blue-400 animate-ping animation-delay-200" />
                  <div className="absolute inset-4 rounded-full border-2 border-blue-500 animate-ping animation-delay-400" />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {status === "scanning" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Scanning Progress</span>
              <span className="text-blue-600">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Status Messages */}
        <div className="text-center">
          {status === "idle" && <p className="text-gray-600">Click to start fingerprint scan</p>}
          {status === "scanning" && <p className="text-blue-600 font-medium">Scan in progress...</p>}
          {status === "verified" && (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Verified Successfully</span>
            </div>
          )}
          {status === "failed" && (
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <XCircle className="w-5 h-5" />
              <span className="font-medium">Scan Failed - Try Again</span>
            </div>
          )}
          {status === "no-match" && (
            <div className="flex items-center justify-center space-x-2 text-orange-600">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">No Match Found</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-3">
          {status === "idle" && (
            <Button onClick={onStartScan} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Fingerprint className="w-4 h-4 mr-2" />
              Start Scan
            </Button>
          )}
          {(status === "failed" || status === "no-match") && (
            <Button onClick={onStartScan} className="bg-blue-600 hover:bg-blue-700 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Scan
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function FacialRecognitionWidget({
  status,
  progress,
  onStartScan,
}: {
  status: ScanStatus
  progress: number
  onStartScan: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraActive, setCameraActive] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      console.error("Camera access denied:", error)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setCameraActive(false)
    }
  }

  useEffect(() => {
    if (status === "scanning") {
      startCamera()
    } else if (status === "idle") {
      stopCamera()
    }

    return () => stopCamera()
  }, [status])

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader className="text-center">
        <CardTitle className="text-gray-900 flex items-center justify-center space-x-2">
          <Camera className="w-6 h-6" />
          <span>Facial Recognition</span>
        </CardTitle>
        <CardDescription className="text-gray-600">Position face within the frame for identification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Camera View */}
        <div className="flex justify-center">
          <div className="relative">
            <div
              className={`w-80 h-60 rounded-lg border-4 flex items-center justify-center overflow-hidden transition-all duration-300 ${
                status === "scanning"
                  ? "border-blue-500 bg-blue-50"
                  : status === "verified"
                    ? "border-green-500 bg-green-50"
                    : status === "failed" || status === "no-match"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-gray-100"
              }`}
            >
              {cameraActive ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Camera Preview</p>
                </div>
              )}

              {/* Face Outline Overlay */}
              {cameraActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-48 h-56 border-2 rounded-full transition-colors duration-300 ${
                      status === "scanning"
                        ? "border-blue-400 animate-pulse"
                        : status === "verified"
                          ? "border-green-400"
                          : status === "failed" || status === "no-match"
                            ? "border-red-400"
                            : "border-white"
                    }`}
                  >
                    {/* Corner markers */}
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-white rounded-tl-lg" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-r-2 border-t-2 border-white rounded-tr-lg" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-2 border-b-2 border-white rounded-bl-lg" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-white rounded-br-lg" />
                  </div>
                </div>
              )}

              {/* Scanning Animation */}
              {status === "scanning" && cameraActive && (
                <div className="absolute inset-0">
                  <div
                    className="absolute top-0 left-0 right-0 h-1 bg-blue-400 animate-pulse"
                    style={{
                      animation: "scan-line 2s linear infinite",
                      background: "linear-gradient(90deg, transparent, #3b82f6, transparent)",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {status === "scanning" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Recognition Progress</span>
              <span className="text-blue-600">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Status Messages */}
        <div className="text-center">
          {status === "idle" && <p className="text-gray-600">Click to start facial recognition</p>}
          {status === "scanning" && <p className="text-blue-600 font-medium">Analyzing facial features...</p>}
          {status === "verified" && (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Face Recognized</span>
            </div>
          )}
          {status === "failed" && (
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <XCircle className="w-5 h-5" />
              <span className="font-medium">Recognition Failed</span>
            </div>
          )}
          {status === "no-match" && (
            <div className="flex items-center justify-center space-x-2 text-orange-600">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Face Not in Database</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-3">
          {status === "idle" && (
            <Button onClick={onStartScan} className="bg-green-600 hover:bg-green-700 text-white">
              <Camera className="w-4 h-4 mr-2" />
              Start Recognition
            </Button>
          )}
          {(status === "failed" || status === "no-match") && (
            <Button onClick={onStartScan} className="bg-green-600 hover:bg-green-700 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Recognition
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function BiometricResults({ results }: { results: BiometricResult[] }) {
  if (results.length === 0) return null

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900">Scan Results</CardTitle>
        <CardDescription className="text-gray-600">Biometric matches found in database</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{result.name}</h3>
                  <p className="text-sm text-gray-600">NIN: {result.nin}</p>
                </div>
                <div className="text-right">
                  <Badge
                    className={`mb-2 ${
                      result.matchPercentage >= 95 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {result.matchPercentage}% Match
                  </Badge>
                  <br />
                  <Badge className={result.criminalRecord ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}>
                    {result.criminalRecord ? "Criminal Record" : "Clean Record"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Last seen: {result.lastSeen}</p>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ManualSearchOption({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center space-x-2">
          <Search className="w-5 h-5" />
          <span>Manual Search</span>
        </CardTitle>
        <CardDescription className="text-gray-600">Search by name or ID if biometric scan fails</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="manual-search" className="text-gray-900">
            Enter Name or National ID
          </Label>
          <Input
            id="manual-search"
            type="text"
            placeholder="e.g., John Doe or 12345678901"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={!searchQuery.trim()}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white"
        >
          <User className="w-4 h-4 mr-2" />
          Search Database
        </Button>
      </CardContent>
    </Card>
  )
}

export default function BiometricScannerPage() {
  const [fingerprintStatus, setFingerprintStatus] = useState<ScanStatus>("idle")
  const [facialStatus, setFacialStatus] = useState<ScanStatus>("idle")
  const [fingerprintProgress, setFingerprintProgress] = useState(0)
  const [facialProgress, setFacialProgress] = useState(0)
  const [scanResults, setScanResults] = useState<BiometricResult[]>([])

  const simulateScan = (
    type: "fingerprint" | "facial",
    setStatus: (status: ScanStatus) => void,
    setProgress: (progress: number) => void,
  ) => {
    setStatus("scanning")
    setProgress(0)
    setScanResults([])

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Simulate random success/failure
          const success = Math.random() > 0.3
          if (success) {
            setStatus("verified")
            // Show results after a brief delay
            setTimeout(() => {
              setScanResults(sampleResults.slice(0, Math.random() > 0.5 ? 1 : 2))
            }, 500)
          } else {
            const noMatch = Math.random() > 0.5
            setStatus(noMatch ? "no-match" : "failed")
          }
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)
  }

  const handleFingerprintScan = () => {
    simulateScan("fingerprint", setFingerprintStatus, setFingerprintProgress)
  }

  const handleFacialScan = () => {
    simulateScan("facial", setFacialStatus, setFacialProgress)
  }

  const handleManualSearch = (query: string) => {
    console.log("Manual search:", query)
    // Simulate search results
    setScanResults(
      sampleResults.filter(
        (result) => result.name.toLowerCase().includes(query.toLowerCase()) || result.nin.includes(query),
      ),
    )
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
                <h1 className="text-xl font-bold text-white">Biometric Scanner</h1>
                <p className="text-gray-300 text-sm">Criminal Records & Case Management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6 space-y-6">
        {/* Scanning Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FingerprintScanWidget
            status={fingerprintStatus}
            progress={fingerprintProgress}
            onStartScan={handleFingerprintScan}
          />
          <FacialRecognitionWidget status={facialStatus} progress={facialProgress} onStartScan={handleFacialScan} />
        </div>

        {/* Results and Manual Search */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BiometricResults results={scanResults} />
          </div>
          <div>
            <ManualSearchOption onSearch={handleManualSearch} />
          </div>
        </div>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Scanning Instructions</p>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• Ensure good lighting for facial recognition</li>
                  <li>• Place finger firmly on scanner for fingerprint</li>
                  <li>• Keep still during scanning process</li>
                  <li>• Use manual search if biometric scan fails</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-[#06112F] border-t border-gray-700 p-4 text-center">
        <p className="text-red-400 text-sm font-medium">🔒 Confidential – Authorized Personnel Only</p>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scan-line {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}
