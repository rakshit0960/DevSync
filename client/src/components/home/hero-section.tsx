import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function HeroSection() {
  return (
    <Container className="relative isolate pt-14 lg:pt-20">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }} 
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <NewBadge />
          <HeroContent />
          <HeroActions />
          <HeroImage />
        </div>
      </div>
    </Container>
  )
}

function NewBadge() {
  return (
    <div className="flex justify-center">
      <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-300 dark:ring-gray-700/30 dark:hover:ring-gray-700/40">
        Announcing our next generation platform.{' '}
        <a href="#" className="font-semibold text-purple-600">
          <span className="absolute inset-0" aria-hidden="true" />
          Read more <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  )
}

function HeroContent() {
  return (
    <div className="text-center mt-14">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-800 dark:from-purple-400 dark:to-purple-600">
        Real-time collaboration for modern teams
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Create, edit, and collaborate on documents in real-time. Built for teams that value speed, simplicity, and security.
      </p>
    </div>
  )
}

function HeroActions() {
  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <Button href="/docs" variant="primary" size="lg">
        Get started
      </Button>
      <Button href="#features" variant="link" size="lg">
        Learn more <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  )
}

function HeroImage() {
  return (
    <div className="mt-16 flow-root sm:mt-24">
      <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:bg-gray-100/5 dark:ring-gray-100/10 lg:-m-4 lg:rounded-2xl lg:p-4">
        <img
          src="/dashboard-preview.png"
          alt="App screenshot"
          width={2432}
          height={1442}
          className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
        />
      </div>
    </div>
  )
} 