"use client";
import { Card3D } from "@/components/ui/3d-card";
import { Container } from "@/components/ui/container";
import { LAYER_ORDER } from "@/lib/constants";
import { motion } from "framer-motion";
import { BarChart, Globe, Shield, Sparkles, Users2, Zap } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    name: "Real-time Collaboration",
    description: "Work together seamlessly with your team in real-time. Edit, comment and review code together.",
    icon: Users2,
    color: "from-blue-600 to-cyan-500",
  },
  {
    name: "Advanced Analytics",
    description: "Get deep insights into your team's performance with detailed metrics and custom reports.",
    icon: BarChart,
    color: "from-purple-600 to-pink-500",
  },
  {
    name: "Enterprise Security",
    description: "Bank-grade encryption and advanced security features keep your data protected.",
    icon: Shield,
    color: "from-green-600 to-emerald-500",
  },
  {
    name: "AI-Powered",
    description: "Smart automation and AI assistance help streamline your development workflow.",
    icon: Sparkles,
    color: "from-orange-600 to-yellow-500",
  },
  {
    name: "Lightning Fast",
    description: "Built for speed with optimized performance and minimal latency.",
    icon: Zap,
    color: "from-red-600 to-orange-500",
  },
  {
    name: "Global Infrastructure",
    description: "Distributed infrastructure ensures fast access from anywhere in the world.",
    icon: Globe,
    color: "from-purple-600 to-indigo-500",
  },
];

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Enhanced background elements */}
      <div
        className="absolute inset-0"
        style={{ zIndex: LAYER_ORDER.gradients }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.07]" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gradient-to-tr from-purple-100 opacity-20 dark:from-purple-900/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
      </div>

      {/* Enhanced main content */}
      <Container>
        <div style={{ zIndex: LAYER_ORDER.content }}>
          <motion.div className="relative" ref={ref}>
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative z-10">
                  <span className="mb-8 inline-flex items-center rounded-full bg-purple-50 dark:bg-purple-900/20 px-4 py-1.5 text-sm font-medium text-purple-600 ring-1 ring-inset ring-purple-600/20 dark:ring-purple-600/30">
                    <span className="font-semibold">Everything you need</span>
                  </span>
                  <h2 className="mt-6 text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 sm:text-6xl">
                    All-in-one platform
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Everything you need to manage your team and projects in one place, with powerful features designed for modern development teams.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mx-auto mt-20 max-w-7xl">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card3D
                      containerClassName="group relative h-full transition-all duration-300 hover:scale-[1.02]"
                      className="relative h-full rounded-2xl bg-white/5 p-8 backdrop-blur-sm ring-1 ring-gray-900/10 dark:ring-white/10 hover:ring-purple-600/20 dark:hover:ring-purple-600/20 shadow-lg hover:shadow-purple-500/10"
                    >
                      <div className="flex flex-col h-full">
                        <div className="mb-6">
                          <div className={`inline-flex rounded-xl bg-gradient-to-r ${feature.color} p-3 shadow-lg`}>
                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                          {feature.name}
                        </h3>
                        <p className="mt-2 text-base text-gray-600 dark:text-gray-400 flex-grow">
                          {feature.description}
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-purple-600 group-hover:text-purple-500">
                          Learn more
                          <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </Card3D>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}