import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, TrendingUp, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/getting-started">Learn More</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4">
              AI-Powered Lead Management
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              Close more deals with intelligent lead management
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Track leads, manage your sales pipeline, and convert more prospects into customers with our powerful CRM
              platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/login">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="container mx-auto px-4 py-24 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Everything you need to manage leads</h2>
              <p className="text-xl text-muted-foreground">Powerful features to streamline your sales process</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Users className="h-6 w-6" />}
                title="Lead Management"
                description="Capture, organize, and qualify leads with intelligent scoring and automated workflows."
              />
              <FeatureCard
                icon={<BarChart3 className="h-6 w-6" />}
                title="Sales Pipeline"
                description="Visualize your deals with customizable pipeline stages and drag-and-drop simplicity."
              />
              <FeatureCard
                icon={<TrendingUp className="h-6 w-6" />}
                title="Analytics & Reports"
                description="Track performance with real-time dashboards and comprehensive reporting tools."
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="Automation"
                description="Save time with automated lead assignment, follow-ups, and workflow triggers."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6" />}
                title="Team Collaboration"
                description="Work together with role-based permissions and activity tracking."
              />
              <FeatureCard
                icon={<BarChart3 className="h-6 w-6" />}
                title="Form Builder"
                description="Create custom lead capture forms and embed them anywhere."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-semibold">Leedy CRM</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 Leedy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}
