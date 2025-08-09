"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Shield,
  Menu,
  X,
  Database,
  Fingerprint,
  Users,
  FileText,
  BarChart3,
  Lock,
  Eye,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Counter animation hook
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return count
}

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Statistics", href: "#statistics" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#06112F]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-[#FFD700] p-2 rounded-full">
              <Shield className="w-6 h-6 text-[#06112F]" />
            </div>
            <div className="text-white">
              <h1 className="font-bold text-lg">NPF CRCMS</h1>
              <p className="text-xs text-gray-300">Criminal Records System</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-[#FFD700] transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#06112F] font-bold">Login</Button>
            </Link>
            <Button
              variant="outline"
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#06112F] bg-transparent"
            >
              Request Access
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#06112F]/95 backdrop-blur-md border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-white hover:text-[#FFD700] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 px-3 pt-4">
                <Link href="/login">
                  <Button className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#06112F] font-bold">Login</Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#06112F] bg-transparent"
                >
                  Request Access
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#06112F] via-[#0a1a4a] to-[#06112F]" />

      {/* Police Badge Watermark */}
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

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          National Criminal Records & <span className="text-[#FFD700]">Case Management System</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Connecting Law Enforcement Agencies Across Nigeria for Faster, Smarter, and More Secure Criminal Data
          Management.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/login">
            <Button
              size="lg"
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#06112F] font-bold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200"
            >
              Login to Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#06112F] px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 bg-transparent"
          >
            Request Access
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#FFD700] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#FFD700] rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#06112F] mb-6">
              About the <span className="text-[#FFD700]">System</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The National Criminal Records & Case Management System is a centralized criminal database used by the
              Nigerian Police Force, EFCC, DSS, and courts to track suspects, cases, and criminal histories nationwide.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our system ensures seamless collaboration between law enforcement agencies, providing real-time access to
              critical information while maintaining the highest security standards through biometric authentication,
              role-based access controls, and end-to-end encryption.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-[#FFD700]" />
                <span className="text-sm font-medium text-gray-700">Encrypted Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <Fingerprint className="w-5 h-5 text-[#FFD700]" />
                <span className="text-sm font-medium text-gray-700">Biometric Auth</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-[#FFD700]" />
                <span className="text-sm font-medium text-gray-700">Role-Based Access</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#06112F] rounded-lg p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-[#FFD700] p-3 rounded-full">
                    <Shield className="w-8 h-8 text-[#06112F]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#06112F]">Secure & Reliable</h3>
                    <p className="text-gray-600">24/7 System Availability</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">System Uptime</span>
                    <span className="text-sm font-bold text-[#FFD700]">99.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#FFD700] h-2 rounded-full w-[99.9%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: Database,
      title: "Nationwide Criminal Database",
      description: "Access and search records from all Nigerian states in one centralized system.",
    },
    {
      icon: Fingerprint,
      title: "Biometric Authentication",
      description: "Advanced fingerprint and facial recognition for secure user verification.",
    },
    {
      icon: Users,
      title: "Multi-Agency Collaboration",
      description: "Seamless cooperation between Police, EFCC, DSS, and Courts.",
    },
    {
      icon: FileText,
      title: "Case Tracking",
      description: "Complete case lifecycle management from arrest to court ruling.",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Advanced analytics to detect crime patterns and trends.",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Military-grade encryption and security protocols.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-[#06112F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Key <span className="text-[#FFD700]">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powerful tools and capabilities designed specifically for law enforcement agencies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/5 border-gray-700 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className="bg-[#FFD700] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-[#06112F]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatisticsSection() {
  const stats = [
    { label: "Registered Officers", value: 15420, icon: Users },
    { label: "Active Criminal Cases", value: 8934, icon: FileText },
    { label: "Connected Police Stations", value: 1247, icon: Shield },
    { label: "Crimes Solved", value: 23567, icon: CheckCircle },
  ]

  return (
    <section id="statistics" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#06112F] mb-4">
            System <span className="text-[#FFD700]">Statistics</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Real-time numbers showcasing the impact and reach of our system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-[#06112F] p-6 rounded-lg transform hover:scale-105 transition-all duration-300">
                <div className="bg-[#FFD700] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-[#06112F]" />
                </div>
                <div className="text-4xl font-bold text-[#FFD700] mb-2">
                  <CounterDisplay end={stat.value} />
                </div>
                <p className="text-white font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CounterDisplay({ end }: { end: number }) {
  const count = useCounter(end)
  return <span>{count.toLocaleString()}</span>
}

function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Capture & Register",
      description:
        "Officers collect suspect information and biometric data using secure mobile and desktop applications.",
      icon: Fingerprint,
    },
    {
      step: "02",
      title: "Centralize & Share",
      description:
        "Data is securely stored in the national database and made available to authorized agencies instantly.",
      icon: Database,
    },
    {
      step: "03",
      title: "Investigate & Prosecute",
      description:
        "Agencies collaborate seamlessly from investigation through court proceedings until case resolution.",
      icon: FileText,
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-[#06112F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It <span className="text-[#FFD700]">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A streamlined process from data capture to case resolution
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white/5 border border-gray-700 rounded-lg p-8 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-6xl font-bold text-[#FFD700] mb-4 opacity-20">{step.step}</div>
                <div className="bg-[#FFD700] p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-[#06112F]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-[#FFD700]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SecuritySection() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data is encrypted using military-grade AES-256 encryption.",
    },
    {
      icon: Fingerprint,
      title: "Biometric Verification",
      description: "Multi-factor authentication with fingerprint and facial recognition.",
    },
    {
      icon: Eye,
      title: "Access Monitoring",
      description: "Real-time monitoring and logging of all system access and activities.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#06112F] mb-4">
            Security & <span className="text-[#FFD700]">Compliance</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Access is strictly restricted to authorized personnel. All records are encrypted and protected by biometric
            verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-[#06112F] p-6 rounded-lg transform hover:scale-105 transition-all duration-300">
                <div className="bg-[#FFD700] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-[#06112F]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialSection() {
  return (
    <section className="py-20 bg-[#06112F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/5 border border-gray-700 rounded-lg p-8">
          <div className="text-6xl text-[#FFD700] mb-6">"</div>
          <blockquote className="text-2xl text-white mb-8 leading-relaxed">
            This system has revolutionized how we handle criminal records across Nigeria. The seamless integration
            between agencies has significantly improved our response time and case resolution rates.
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-[#FFD700] p-3 rounded-full">
              <Shield className="w-6 h-6 text-[#06112F]" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold">Inspector General Usman Alkali Baba</p>
              <p className="text-gray-300">Nigerian Police Force</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CallToActionSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#06112F] mb-8">
          Ready to Get <span className="text-[#FFD700]">Started?</span>
        </h2>
        <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
          Join thousands of law enforcement professionals using our system to make Nigeria safer
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-transparent hover:border-[#FFD700] transition-all duration-300">
            <h3 className="text-xl font-bold text-[#06112F] mb-4">For Agencies</h3>
            <p className="text-gray-700 mb-6">Integrate your agency with our national database system</p>
            <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#06112F] font-bold w-full">
              Request Integration
            </Button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-transparent hover:border-[#FFD700] transition-all duration-300">
            <h3 className="text-xl font-bold text-[#06112F] mb-4">For Officers</h3>
            <p className="text-gray-700 mb-6">Apply for system access and start using our platform</p>
            <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#06112F] font-bold w-full">
              Apply for Access
            </Button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-transparent hover:border-[#FFD700] transition-all duration-300">
            <h3 className="text-xl font-bold text-[#06112F] mb-4">For Public</h3>
            <p className="text-gray-700 mb-6">Report crimes and access public safety information</p>
            <Button
              variant="outline"
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#06112F] w-full bg-transparent"
            >
              Report a Crime
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-[#06112F] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-[#FFD700] p-2 rounded-full">
                <Shield className="w-6 h-6 text-[#06112F]" />
              </div>
              <div>
                <h3 className="font-bold text-lg">NPF CRCMS</h3>
                <p className="text-sm text-gray-300">Criminal Records System</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The National Criminal Records & Case Management System is the official platform for law enforcement
              agencies across Nigeria to collaborate and manage criminal data securely.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#FFD700]" />
                <span className="text-gray-300">Nigerian Police Headquarters, Abuja</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#FFD700]" />
                <span className="text-gray-300">+234-9-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#FFD700]" />
                <span className="text-gray-300">support@npf-crcms.gov.ng</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#FFD700]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  About System
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#statistics" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Statistics
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#FFD700]">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Technical Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Training Resources
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © {currentYear} Nigerian Police National Criminal Records & Case Management System. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Homepage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <StatisticsSection />
      <HowItWorksSection />
      <SecuritySection />
      <TestimonialSection />
      <CallToActionSection />
      <Footer />
    </div>
  )
}
