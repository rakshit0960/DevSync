import { Zap, Users2, History, Lock, Sparkles, Globe } from 'lucide-react'
import { Container } from '@/components/ui/container'

const features = [
  {
    icon: Zap,
    title: 'Real-time Editing',
    description: 'See changes as they happen with instant synchronization across all users.'
  },
  {
    icon: Users2,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with your team members in real-time.'
  },
  {
    icon: History,
    title: 'Version History',
    description: 'Track changes and restore previous versions of your documents.'
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and security features to protect your data.'
  },
  {
    icon: Sparkles,
    title: 'AI-Powered',
    description: 'Smart suggestions and automation to boost your productivity.'
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Access your work from anywhere, on any device, at any time.'
  }
]

export function FeaturesSection() {
  return (
    <Container className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader />
        <FeaturesList />
      </div>
    </Container>
  )
}

function SectionHeader() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-base font-semibold leading-7 text-purple-600">Everything you need</h2>
      <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Powerful features for powerful teams
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
        Built with the latest technology stack to ensure smooth collaboration and maximum productivity.
      </p>
    </div>
  )
}

function FeaturesList() {
  return (
    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </dl>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: {
  icon: typeof Zap;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col group">
      <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600/10 group-hover:bg-purple-600/20 transition-colors">
          <Icon className="h-6 w-6 text-purple-600" aria-hidden="true" />
        </div>
        <span className="text-gray-900 dark:text-gray-100">{title}</span>
      </dt>
      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
        <p className="flex-auto">{description}</p>
      </dd>
    </div>
  )
} 