"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary gradient button
        primary: cn(
          "relative px-6 py-2.5 h-11",
          "text-white bg-gradient-to-r from-purple-600 to-indigo-600",
          "hover:from-purple-500 hover:to-indigo-500",
          "shadow-md shadow-purple-500/20",
          "border border-purple-600/20"
        ),

        // Secondary button
        secondary: cn(
          "px-5 py-2 h-10",
          "bg-white/5 hover:bg-white/10",
          "text-white",
          "border border-white/10",
          "shadow-[0_1px_0_0_rgba(255,255,255,0.1)]"
        ),

        // Outline button
        outline: cn(
          "px-5 py-2 h-10",
          "border border-white/20",
          "text-white hover:text-white",
          "hover:bg-white/5",
          "backdrop-blur-sm"
        ),

        // Ghost button
        ghost: cn(
          "px-4 py-2",
          "text-neutral-300 hover:text-white",
          "hover:bg-white/5"
        ),

        // New Aceternity style button
        aceternity: cn(
          "relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white",
          "group", // For hover effects
          "before:absolute before:inset-0 before:rounded-full before:bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100",
          "after:absolute after:-bottom-0 after:left-[1.125rem] after:h-px after:w-[calc(100%-2.25rem)] after:bg-gradient-to-r after:from-emerald-400/0 after:via-emerald-400/90 after:to-emerald-400/0 after:transition-opacity after:duration-500 group-hover:after:opacity-40"
        ),
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants }; 