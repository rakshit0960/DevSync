"use client";
import { Card3D } from "@/components/ui/3d-card";
import { Container } from "@/components/ui/container";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Shield, Sparkles, Globe, Users2, BarChart } from "lucide-react";
import { useRef } from "react";
import { LAYER_ORDER } from "@/lib/constants";

const features = [
  {
    name: "Real-time Collaboration",
    description: "Work together seamlessly with your team in real-time.",
    icon: Users2,
    color: "from-blue-600 to-cyan-500",
  },
  {
    name: "Advanced Analytics",
    description: "Get insights into your team's performance and productivity.",
    icon: BarChart,
    color: "from-purple-600 to-pink-500",
  },
  {
    name: "Enterprise Security",
    description: "Bank-grade encryption and security features.",
    icon: Shield,
    color: "from-green-600 to-emerald-500",
  },
  {
    name: "AI-Powered",
    description: "Leverage AI to automate repetitive tasks.",
    icon: Sparkles,
    color: "from-orange-600 to-yellow-500",
  },
  {
    name: "Lightning Fast",
    description: "Optimized for speed and performance.",
    icon: Zap,
    color: "from-red-600 to-orange-500",
  },
  {
    name: "Global Infrastructure",
    description: "Deployed across multiple regions for low latency.",
    icon: Globe,
    color: "from-purple-600 to-indigo-500",
  },
];

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  return (
    <div className="relative">
      {/* Background elements */}
      <div 
        className="absolute inset-0"
        style={{ zIndex: LAYER_ORDER.gradients }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gradient-to-tr from-purple-100 opacity-10 dark:from-purple-900/30" />
      </div>

      {/* Main content */}
      <div style={{ zIndex: LAYER_ORDER.content }}>
        <motion.div className="relative py-24 sm:py-32" ref={ref}>
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div style={{ y, opacity }} className="relative z-10">
                <span className="mb-8 inline-flex items-center rounded-full px-4 py-1 text-sm leading-6 text-purple-600 ring-1 ring-inset ring-purple-600/20 dark:ring-purple-600/30">
                  <span className="font-semibold">Everything you need</span>
                </span>
                <h2 className="mt-4 text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 sm:text-5xl">
                  All-in-one platform
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Everything you need to manage your team and projects in one place.
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card3D
                    containerClassName="group relative h-full transition-all duration-300"
                    className="relative h-full rounded-2xl bg-white/5 p-8 backdrop-blur-sm ring-1 ring-gray-900/10 dark:ring-white/10 hover:ring-purple-600/20 dark:hover:ring-purple-600/20"
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <div className={`inline-flex rounded-xl bg-gradient-to-r ${feature.color} p-3`}>
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                        {feature.name}
                      </h3>
                      <p className="mt-2 text-base text-gray-600 dark:text-gray-400 flex-grow">
                        {feature.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-purple-600 group-hover:text-purple-500">
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
    </div>
  );
}
const styles = `
.bg-grid-pattern {
  background-size: 100px 100px;
  background-image: linear-gradient(to right, rgb(var(--foreground-rgb) / 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--foreground-rgb) / 0.1) 1px, transparent 1px);
}
`; 