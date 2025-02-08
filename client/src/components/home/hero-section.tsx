"use client";
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { TextGenerateEffect } from '@/components/ui/text-generate'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { motion } from "framer-motion"
import { LAYER_ORDER } from "@/lib/constants"
import EditorPreview from './EditorPreview';

const stats = [
  { label: "Active Users", value: "50K+", description: "Trusted by teams" },
  { label: "Documents", value: "1M+", description: "Created & shared" },
  { label: "Time Saved", value: "30%", description: "Average efficiency gain" },
];

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-32 overflow-hidden"
      style={{ zIndex: LAYER_ORDER.base }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0" style={{ zIndex: LAYER_ORDER.background }}>
        <BackgroundBeams />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0" style={{ zIndex: LAYER_ORDER.gradients }}>
        <div className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </div>
      {/* Main Content */}
      <Container className="relative mx-auto w-full z-[20]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Announcement Banner */}
              <motion.div
                className="mb-12 flex justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="inline-flex items-center rounded-full px-6 py-2.5 text-base text-white/90 ring-1 ring-white/10 hover:ring-white/20 bg-white/5 backdrop-blur-xl">
                  <span className="font-medium">New: Real-time collaboration</span>
                  <span className="mx-2 h-4 w-px bg-white/20" />
                  <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                    See what&apos;s new <span aria-hidden="true">→</span>
                  </a>
                </div>
              </motion.div>

              {/* Hero Title & Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-8"
              >
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                  <TextGenerateEffect words="Real-time collaboration for modern teams" />
                </h1>
                <p className="mx-auto max-w-2xl text-lg sm:text-xl text-neutral-300/90 leading-relaxed">
                  Create, edit, and collaborate on documents with your team in real-time.
                  Experience seamless co-editing, smart suggestions, and powerful version control.
                </p>
              </motion.div>

              <motion.div
                className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white border-0 h-14 px-8 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300"
                >
                  <span className="relative z-10 text-base font-semibold">Get Started Free</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto group text-base font-semibold text-white hover:text-purple-300 h-14 px-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  Watch Demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                className="mt-24 pt-12 pb-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <dl className="grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-3 sm:gap-y-0">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="flex flex-col items-center gap-4 relative px-6 py-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <dt className="text-sm font-medium text-neutral-300">{stat.label}</dt>
                      <dd className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                        {stat.value}
                      </dd>
                      <p className="text-sm text-neutral-400 text-center max-w-[200px]">{stat.description}</p>
                      <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </dl>
              </motion.div>
            </motion.div>
          </div>

          {/* Editor Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-20 sm:mt-24 relative mx-auto max-w-[90rem]"
          >
            <div className="relative rounded-xl bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur-3xl lg:-mx-8 lg:rounded-2xl lg:p-4">
              <EditorPreview />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 rounded-md bg-gradient-to-tr from-purple-500/5 to-pink-500/5" />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        style={{ zIndex: LAYER_ORDER.gradients }}
      >
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </section>
  );
}