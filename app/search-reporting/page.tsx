"use client"

import { useState } from "react"
import { ArrowLeft, Search, Filter, Download, FileText, Printer, Eye, Shield, X, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Sample search results data
const searchResults = [
  {
    id: "1",
    name: "Adebayo Johnson Okafor",
    nationalId: "12345678901",
    crimeType: "Armed Robbery",
    caseId: "NPF-2024-001",
    status: "Under Investigation",
    role: "Suspect",
    state: "Lagos",
    dateOpened: "2024-01-10",
    policeStation: "Victoria Island Division",
    assignedOfficer: "Inspector Adamu",
  },
  {
    id: "2",
    name: "Fatima Ali Hassan",
    nationalId: "23456789012",
    crimeType: "Fraud",
    caseId: "NPF-2023-456",
    status: "Closed - Convicted",
    role: "Suspect",
    state: "FCT",
    dateOpened: "2023-11-22",
    policeStation: "Wuse Division",
    assignedOfficer: "Sergeant Bello",
  },
  {
    id: "3",
    name: "Chukwuma Peter Obi",
    nationalId: "34567890123",
    crimeType: "Theft",
    caseId: "NPF-2023-789",
    status: "Closed - Acquitted",
    role: "Suspect",
    state: "Anambra",
    dateOpened: "2023-08-05",
    policeStation: "Awka Division",
    assignedOfficer: "Inspector Chukwu",
  },
  {
    id: "4",
    name: "Aisha Bello Musa",
    nationalId: "45678901234",
    crimeType: "Domestic Violence",
    caseId: "NPF-2024-012",
    status: "Under Investigation",
    role: "Complainant",
    state: "Kano",
    dateOpened: "2024-02-01",
    policeStation: "Kano Central Division",
    assignedOfficer: "Inspector Garba",
  },
  {
    id: "5",
    name: "Ibrahim Musa Yusuf",
    nationalId: "56789012345",
    crimeType: "Cybercrime",
    caseId: "NPF-2024-025",
    status: "In Court",
    role: "Suspect",
    state: "Lagos",
    dateOpened: "2024-01-28",
    policeStation: "Ikeja Division",
    assignedOfficer: "Corporal Adebayo",
  },
]

const crimeTypes = [
  "Armed Robbery",
  "Theft",
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

const caseStatuses = [
  "Under Investigation",
  "In Court",
  "Closed - Convicted",
  "Closed - Acquitted",
  "Closed - Dismissed",
  "Pending Court",
  "On Appeal",
]

const roles = ["Suspect", "Complainant", "Witness", "Victim"]

interface SearchFilters {
  searchQuery: string
  searchType: string
  role: string
  crimeType: string
  status: string
  state: string
  dateFrom: string
  dateTo: string
}

function SearchBar({
  filters,
  onFiltersChange,
}: {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
}) {
  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center space-x-2">
          <Search className="w-5 h-5" />
          <span>Search Database</span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          Search by name, ID, case number, or biometric identifier
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2 space-y-2">
            <Label className="text-gray-900">Search Query</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Enter name, ID, case number, or biometric ID..."
                value={filters.searchQuery}
                onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
                className="pl-10 border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
              />
            </div>
          </div>

          {/* Search Type */}
          <div className="space-y-2">
            <Label className="text-gray-900">Search Type</Label>
            <Select
              value={filters.searchType}
              onValueChange={(value) => onFiltersChange({ ...filters, searchType: value })}
            >
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="national-id">National ID</SelectItem>
                <SelectItem value="case-id">Case ID</SelectItem>
                <SelectItem value="biometric-id">Biometric ID</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Search Button */}
          <div className="space-y-2">
            <Label className="text-gray-900">&nbsp;</Label>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SearchFiltersCard({
  filters,
  onFiltersChange,
  onClearFilters,
}: {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  onClearFilters: () => void
}) {
  const [showFilters, setShowFilters] = useState(false)

  const activeFiltersCount =
    Object.values(filters).filter((value) => value && value !== "all" && value !== "").length - 1 // Subtract 1 for searchQuery which is always counted

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-700" />
            <CardTitle className="text-gray-900">Advanced Filters</CardTitle>
            {activeFiltersCount > 0 && <Badge className="bg-blue-100 text-blue-800">{activeFiltersCount} active</Badge>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      {showFilters && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Role Filter */}
            <div className="space-y-2">
              <Label className="text-gray-900">Role</Label>
              <Select value={filters.role} onValueChange={(value) => onFiltersChange({ ...filters, role: value })}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role.toLowerCase()}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Crime Type Filter */}
            <div className="space-y-2">
              <Label className="text-gray-900">Crime Type</Label>
              <Select
                value={filters.crimeType}
                onValueChange={(value) => onFiltersChange({ ...filters, crimeType: value })}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="All crimes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Crime Types</SelectItem>
                  {crimeTypes.map((crime) => (
                    <SelectItem key={crime} value={crime.toLowerCase()}>
                      {crime}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label className="text-gray-900">Case Status</Label>
              <Select value={filters.status} onValueChange={(value) => onFiltersChange({ ...filters, status: value })}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {caseStatuses.map((status) => (
                    <SelectItem key={status} value={status.toLowerCase()}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* State Filter */}
            <div className="space-y-2">
              <Label className="text-gray-900">State</Label>
              <Select value={filters.state} onValueChange={(value) => onFiltersChange({ ...filters, state: value })}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="All states" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {nigerianStates.map((state) => (
                    <SelectItem key={state} value={state.toLowerCase()}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-900">Date From</Label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
                className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-900">Date To</Label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
                className="border-gray-300 focus:border-[#06112F] focus:ring-[#06112F]"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
            <Button variant="outline" size="sm" onClick={onClearFilters} className="bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function ResultsTable({
  results,
  selectedResults,
  onSelectionChange,
}: {
  results: typeof searchResults
  selectedResults: string[]
  onSelectionChange: (selected: string[]) => void
}) {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(results.map((result) => result.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedResults, id])
    } else {
      onSelectionChange(selectedResults.filter((selectedId) => selectedId !== id))
    }
  }

  const getStatusColor = (status: string) => {
    if (status.includes("Investigation")) return "bg-yellow-100 text-yellow-800"
    if (status.includes("Court")) return "bg-blue-100 text-blue-800"
    if (status.includes("Convicted")) return "bg-red-100 text-red-800"
    if (status.includes("Acquitted")) return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "suspect":
        return "bg-red-100 text-red-800"
      case "complainant":
        return "bg-blue-100 text-blue-800"
      case "witness":
        return "bg-green-100 text-green-800"
      case "victim":
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
            <CardTitle className="text-gray-900">Search Results</CardTitle>
            <CardDescription className="text-gray-600">
              {results.length} records found
              {selectedResults.length > 0 && ` • ${selectedResults.length} selected`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedResults.length === results.length && results.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="text-gray-700">Name</TableHead>
                <TableHead className="text-gray-700">National ID</TableHead>
                <TableHead className="text-gray-700">Role</TableHead>
                <TableHead className="text-gray-700">Crime Type</TableHead>
                <TableHead className="text-gray-700">Case ID</TableHead>
                <TableHead className="text-gray-700">Status</TableHead>
                <TableHead className="text-gray-700">State</TableHead>
                <TableHead className="text-gray-700">Date</TableHead>
                <TableHead className="text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedResults.includes(result.id)}
                      onCheckedChange={(checked) => handleSelectOne(result.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">{result.name}</TableCell>
                  <TableCell className="text-gray-700">{result.nationalId}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(result.role)}>{result.role}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{result.crimeType}</TableCell>
                  <TableCell className="font-mono text-sm text-gray-700">{result.caseId}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{result.state}</TableCell>
                  <TableCell className="text-gray-700">{result.dateOpened}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <FileText className="w-4 h-4 mr-1" />
                        Report
                      </Button>
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

function ExportOptions({ selectedCount }: { selectedCount: number }) {
  const handleExport = (format: string) => {
    console.log(`Exporting ${selectedCount} records as ${format}`)
  }

  return (
    <Card className="bg-white/95 border-gray-300">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export Options</span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          Export search results in various formats
          {selectedCount > 0 && ` (${selectedCount} selected)`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => handleExport("pdf")}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={selectedCount === 0}
          >
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button
            onClick={() => handleExport("excel")}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={selectedCount === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button
            onClick={() => handleExport("print")}
            className="bg-gray-600 hover:bg-gray-700 text-white"
            disabled={selectedCount === 0}
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Report
          </Button>
        </div>

        {/* Export Options */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Label className="text-gray-900 font-medium mb-3 block">Export Settings</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="include-photos" />
              <Label htmlFor="include-photos" className="text-sm text-gray-700">
                Include profile photos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="include-biometrics" />
              <Label htmlFor="include-biometrics" className="text-sm text-gray-700">
                Include biometric data
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="include-case-details" defaultChecked />
              <Label htmlFor="include-case-details" className="text-sm text-gray-700">
                Include case details
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SearchReportingPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: "",
    searchType: "all",
    role: "all",
    crimeType: "all",
    status: "all",
    state: "all",
    dateFrom: "",
    dateTo: "",
  })

  const [selectedResults, setSelectedResults] = useState<string[]>([])
  const [filteredResults, setFilteredResults] = useState(searchResults)

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      searchType: "all",
      role: "all",
      crimeType: "all",
      status: "all",
      state: "all",
      dateFrom: "",
      dateTo: "",
    })
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
                <h1 className="text-xl font-bold text-white">Search & Reporting</h1>
                <p className="text-gray-300 text-sm">Criminal Records & Case Management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6 space-y-6">
        {/* Search Bar */}
        <SearchBar filters={filters} onFiltersChange={setFilters} />

        {/* Advanced Filters */}
        <SearchFiltersCard filters={filters} onFiltersChange={setFilters} onClearFilters={handleClearFilters} />

        {/* Results Table */}
        <ResultsTable
          results={filteredResults}
          selectedResults={selectedResults}
          onSelectionChange={setSelectedResults}
        />

        {/* Export Options */}
        <ExportOptions selectedCount={selectedResults.length} />
      </main>

      {/* Footer */}
      <footer className="bg-[#06112F] border-t border-gray-700 p-4 text-center">
        <p className="text-red-400 text-sm font-medium">🔒 Confidential – Authorized Personnel Only</p>
      </footer>
    </div>
  )
}
