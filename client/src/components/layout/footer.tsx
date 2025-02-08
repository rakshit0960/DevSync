export function Footer() {
  return (
    <footer className="mt-32 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <FooterLink href="#" label="About" />
          <FooterLink href="#" label="Privacy" />
          <FooterLink href="#" label="Terms" />
          <FooterLink href="#" label="Contact" />
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a 
      href={href} 
      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
    >
      {label}
    </a>
  )
} 