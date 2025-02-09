"use client";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import Image from "next/image";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "md", ...props }, ref) => {
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "h-8 w-8";
        case "lg":
          return "h-12 w-12";
        default:
          return "h-10 w-10";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          getSizeClasses(),
          className
        )}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt || "Avatar"}
            fill
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 text-sm font-medium text-white">
            {fallback || alt?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        <div className="absolute inset-0 rounded-full ring-2 ring-white/10" />
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };