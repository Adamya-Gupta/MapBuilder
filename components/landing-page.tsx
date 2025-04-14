"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Home,
  Zap,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HousePlotDesigner } from "@/components/house-plot-designer";

export function LandingPage() {
  const [showDesigner, setShowDesigner] = useState(false);

  if (showDesigner) {
    return <HousePlotDesigner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                Transform Your{" "}
                <span className="text-emerald-600">Dream Home</span> Into
                Reality
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-xl text-slate-700 mb-8">
                MapBuilder uses AI to generate professional house floor plans
                based on your preferences. No architectural knowledge required.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-full"
                onClick={() => setShowDesigner(true)}
              >
                Start Building Your Dream Home{" "}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose MapBuilder?
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Our AI-powered platform makes home design accessible to everyone,
              saving you time and money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="h-10 w-10 text-emerald-600" />,
                title: "AI-Powered Design",
                description:
                  "Our advanced algorithms create professional floor plans based on your preferences.",
              },
              {
                icon: <Clock className="h-10 w-10 text-emerald-600" />,
                title: "Save Time",
                description:
                  "Get your floor plan in minutes instead of weeks of back-and-forth with architects.",
              },
              {
                icon: <Shield className="h-10 w-10 text-emerald-600" />,
                title: "Architect Approved",
                description:
                  "All our designs follow architectural standards and building codes.",
              },
              {
                icon: <Home className="h-10 w-10 text-emerald-600" />,
                title: "Customizable",
                description:
                  "Easily modify your design to match your exact requirements and preferences.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-emerald-50 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-700">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Creating your dream home floor plan is simple with our 3-step
              process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Answer Questions",
                description:
                  "Tell us about your preferences, budget, and requirements.",
                icon: (
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold">
                    1
                  </div>
                ),
              },
              {
                step: "02",
                title: "Mark Room Positions",
                description:
                  "Place markers on the plot to indicate where you want specific rooms.",
                icon: (
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold">
                    2
                  </div>
                ),
              },
              {
                step: "03",
                title: "Get Your Design",
                description:
                  "Our AI generates a professional floor plan based on your input.",
                icon: (
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold">
                    3
                  </div>
                ),
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                {step.icon}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-700">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-full"
                onClick={() => setShowDesigner(true)}
              >
                Start Your Design Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Join thousands of satisfied homeowners who have used MapBuilder to
              design their dream homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "MapBuilder saved me thousands of dollars in architect fees. The floor plan was exactly what I wanted!",
                author: "Sarah Johnson",
                role: "Homeowner",
              },
              {
                quote:
                  "As a contractor, I recommend MapBuilder to all my clients. It makes the initial planning phase so much easier.",
                author: "Michael Chen",
                role: "Building Contractor",
              },
              {
                quote:
                  "I was skeptical about AI-generated floor plans, but the result exceeded my expectations. Highly recommended!",
                author: "Emma Rodriguez",
                role: "First-time Home Builder",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-6 rounded-xl shadow-sm"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <p className="text-slate-700 italic mb-6">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Build Your Dream Home?
              </h2>
              <p className="text-xl text-emerald-100 mb-8">
                Start designing your perfect floor plan today with MapBuilder's
                AI-powered platform.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg rounded-full"
                onClick={() => setShowDesigner(true)}
              >
                Get Started For Free <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                MapBuilder
              </h3>
              <p className="mb-4">AI-powered floor plan design for everyone.</p>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Examples
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p>
              &copy; {new Date().getFullYear()} MapBuilder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
