"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  TrendingUp,
  Zap,
  LayoutDashboard,
  Activity,
  FileText,
  CheckCircle2,
  ArrowRight,
  PlayCircle,
  Target,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  Shield,
  Clock,
  BarChart,
} from "lucide-react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    Object.keys(sectionRefs.current).forEach((key) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }))
            }
          })
        },
        { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
      )

      if (sectionRefs.current[key]) {
        observer.observe(sectionRefs.current[key]!)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  const setRef = (key: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[key] = el
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Leedy CRM</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/getting-started" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Learn More
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Benefits
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section with Clip Path */}
        <section className="relative container mx-auto px-4 py-24 md:py-32">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div
            ref={setRef("hero")}
            className={`max-w-5xl mx-auto text-center space-y-8 relative transition-all duration-1000 ${
              isVisible["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 inline mr-2" />
              AI-Powered Lead Management
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-tight">
              Close more deals with{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">intelligent lead management</span>
                <span className="absolute bottom-2 left-0 right-0 h-4 bg-primary/20 -rotate-1 -z-0" style={{ clipPath: "polygon(0% 0%, 100% 0%, 98% 100%, 2% 100%)" }} />
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Track leads, manage your sales pipeline, and convert more prospects into customers with our powerful CRM
              platform. Everything you need to grow your business in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild className="group">
                <Link href="/login">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/getting-started">Learn More</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-2">No credit card required • 14-day free trial</p>
          </div>
        </section>

        {/* Stats Section with Animation */}
        <section
          ref={setRef("stats")}
          className={`border-y border-border bg-muted/30 py-16 relative transition-all duration-1000 ${
            isVisible["stats"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "50K+", label: "Leads Managed" },
                { value: "98%", label: "Satisfaction Rate" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-700 ${
                    isVisible["stats"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start Guide with Slide In */}
        <section className="container mx-auto px-4 py-24 relative">
          <div className="max-w-6xl mx-auto">
            <div
              ref={setRef("quickStartTitle")}
              className={`text-center mb-12 transition-all duration-1000 ${
                isVisible["quickStartTitle"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <PlayCircle className="h-10 w-10 text-primary" />
                Get Started in 3 Simple Steps
              </h2>
              <p className="text-xl text-muted-foreground">Start managing your leads effectively in minutes</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Create Your First Lead",
                  description: "Start by adding a lead manually or create a form to capture leads automatically from your website.",
                  link: "/dashboard/leads",
                  linkText: "Go to Leads",
                },
                {
                  step: "2",
                  title: "Set Up Your Pipeline",
                  description: "Organize your deals in the pipeline. Drag and drop deals between stages as they progress.",
                  link: "/dashboard/pipeline",
                  linkText: "Go to Pipeline",
                },
                {
                  step: "3",
                  title: "Track Activities",
                  description: "Log calls, emails, meetings, and tasks to keep track of all interactions with your leads.",
                  link: "/dashboard/activities",
                  linkText: "Go to Activities",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  ref={setRef(`quickStart${index}`)}
                  className={`transition-all duration-700 ${
                    isVisible[`quickStart${index}`]
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Card className="p-8 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg h-full">
                    <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                      <span className="text-3xl font-bold">{item.step}</span>
                    </div>
                    <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                    <p className="text-muted-foreground mb-6">{item.description}</p>
                    <Button variant="outline" asChild>
                      <Link href={item.link}>
                        {item.linkText} <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section with Fade Up */}
        <section id="features" className="container mx-auto px-4 py-24 border-t border-border relative">
          {/* Clip Path Decoration */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
          <div className="max-w-6xl mx-auto relative">
            <div
              ref={setRef("featuresTitle")}
              className={`text-center mb-16 transition-all duration-1000 ${
                isVisible["featuresTitle"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-4xl font-bold mb-4">Everything you need to manage leads</h2>
              <p className="text-xl text-muted-foreground">Powerful features to streamline your sales process</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Lead Management",
                  description: "Capture, organize, and qualify leads with intelligent scoring and automated workflows.",
                  features: ["Lead Scoring", "Filter & Search", "Status Tracking", "Contact Management"],
                },
                {
                  icon: <TrendingUp className="h-6 w-6" />,
                  title: "Sales Pipeline",
                  description: "Visualize your deals with customizable pipeline stages and drag-and-drop simplicity.",
                  features: ["Kanban Board", "Deal Management", "Pipeline Analytics", "Drag & Drop"],
                },
                {
                  icon: <Activity className="h-6 w-6" />,
                  title: "Activity Tracking",
                  description: "Log and track all interactions with your leads. Never miss a follow-up.",
                  features: ["Calls & Emails", "Meetings", "Tasks & Notes", "Activity Feed"],
                },
                {
                  icon: <BarChart3 className="h-6 w-6" />,
                  title: "Analytics & Reports",
                  description: "Track performance with real-time dashboards and comprehensive reporting tools.",
                  features: ["Lead Reports", "Revenue Analytics", "Performance Metrics", "Export & Share"],
                },
                {
                  icon: <FileText className="h-6 w-6" />,
                  title: "Form Builder",
                  description: "Create custom lead capture forms and embed them anywhere on your website.",
                  features: ["Custom Fields", "Embed Code", "Form Analytics", "Auto Lead Creation"],
                },
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: "Automation",
                  description: "Save time with automated lead assignment, follow-ups, and workflow triggers.",
                  features: ["Workflow Rules", "Auto Assignment", "Email Automation", "Smart Triggers"],
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  ref={setRef(`feature${index}`)}
                  className={`transition-all duration-700 ${
                    isVisible[`feature${index}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${(index % 3) * 100}ms` }}
                >
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section with Slide In */}
        <section
          id="benefits"
          className="bg-muted/30 py-24 relative overflow-hidden"
          style={{
            clipPath: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div
                ref={setRef("benefitsTitle")}
                className={`text-center mb-16 transition-all duration-1000 ${
                  isVisible["benefitsTitle"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <h2 className="text-4xl font-bold mb-4">Why Choose Leedy CRM?</h2>
                <p className="text-xl text-muted-foreground">Everything you need to grow your sales</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Target className="h-6 w-6" />,
                    title: "Increase Conversions",
                    description: "Convert more leads into customers with intelligent lead scoring and prioritization",
                  },
                  {
                    icon: <Clock className="h-6 w-6" />,
                    title: "Save Time",
                    description: "Automate repetitive tasks and focus on what matters most - closing deals",
                  },
                  {
                    icon: <BarChart className="h-6 w-6" />,
                    title: "Data-Driven Decisions",
                    description: "Make informed decisions with comprehensive analytics and reporting",
                  },
                  {
                    icon: <Shield className="h-6 w-6" />,
                    title: "Secure & Reliable",
                    description: "Your data is safe with enterprise-grade security and 99.9% uptime",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    ref={setRef(`benefit${index}`)}
                    className={`transition-all duration-700 ${
                      isVisible[`benefit${index}`] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Card className="p-6 text-center hover:shadow-lg transition-all">
                      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                        {benefit.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works with Fade Up */}
        <section className="container mx-auto px-4 py-24 relative">
          <div className="max-w-6xl mx-auto">
            <div
              ref={setRef("howItWorksTitle")}
              className={`text-center mb-16 transition-all duration-1000 ${
                isVisible["howItWorksTitle"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground">Simple workflow to manage your entire sales process</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Phone className="h-10 w-10" />,
                  title: "1. Capture Leads",
                  description:
                    "Capture leads from your website, forms, or import them manually. Every lead is automatically scored and organized.",
                },
                {
                  icon: <Users className="h-10 w-10" />,
                  title: "2. Qualify & Engage",
                  description:
                    "Use lead scoring to prioritize high-value prospects. Track all interactions and activities in one place.",
                },
                {
                  icon: <TrendingUp className="h-10 w-10" />,
                  title: "3. Close Deals",
                  description:
                    "Move deals through your pipeline, track progress, and close more deals with data-driven insights.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  ref={setRef(`howItWorks${index}`)}
                  className={`text-center transition-all duration-700 ${
                    isVisible[`howItWorks${index}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with Clip Path */}
        <section className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto">
            <div
              ref={setRef("cta")}
              className={`transition-all duration-1000 ${
                isVisible["cta"] ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <Card
                className="p-12 text-center bg-primary/5 border-primary/20 relative overflow-hidden"
                style={{
                  clipPath: "polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10" />
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Sales Process?</h2>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join thousands of businesses using Leedy CRM to manage leads, close deals, and grow revenue. Start
                    your free trial today.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" asChild className="group">
                      <Link href="/login">
                        Start Free Trial
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/getting-started">Learn More</Link>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6">
                    No credit card required • 14-day free trial • Cancel anytime
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24 bg-muted/30 relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Leedy CRM</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The all-in-one CRM platform to manage leads, close deals, and grow your business.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/getting-started" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/getting-started" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/getting-started" className="hover:text-foreground transition-colors">
                    Getting Started
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">© 2026 Leedy CRM. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  features,
}: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}) {
  return (
    <Card className="p-6 hover:border-primary/50 transition-all hover:shadow-lg h-full flex flex-col group">
      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
      <ul className="space-y-2 mt-auto">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  )
}
