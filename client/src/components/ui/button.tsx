import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'link' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export function Button({ 
  children, 
  href, 
  variant = 'primary', 
  size = 'md',
  className,
  onClick 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
  
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-500 focus-visible:outline-purple-600",
    secondary: "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
    outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950",
    link: "text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 underline-offset-4 hover:underline"
  }

  const sizes = {
    sm: "px-2.5 py-1.5 text-sm",
    md: "px-3.5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  }

  const classes = cn(baseStyles, variants[variant], sizes[size], className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
} 