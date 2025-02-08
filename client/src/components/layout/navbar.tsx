"use client";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Menu, X, FileText, Settings, LogOut, User } from "lucide-react";
import { LAYER_ORDER } from "@/lib/constants";
import { Avatar } from "@/components/ui/avatar";

// Temporary auth state - replace with your auth logic later
const useAuth = () => {
  const [isAuthenticated] = useState(false); // Change to true to test authenticated state
  return {
    isAuthenticated,
    user: isAuthenticated ? {
      name: "John Doe",
      email: "john@devsync.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevSync"
    } : null
  };
};

const navigation = [
  { name: "Documents", href: "#documents" },
  { name: "Features", href: "#features" },
  { name: "Templates", href: "#templates" },
  { name: "Pricing", href: "#pricing" },
];

const userNavigation = [
  { name: "Dashboard", href: "#", icon: FileText },
  { name: "Settings", href: "#", icon: Settings },
  { name: "Profile", href: "#", icon: User },
  { name: "Sign out", href: "#", icon: LogOut },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const { isAuthenticated, user } = useAuth();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.header
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: LAYER_ORDER.navbar }}
        className="fixed inset-x-0 top-0 isolate"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 to-black/0 dark:from-black/50 dark:to-black/0 backdrop-blur-xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        <Container>
          <nav className="flex items-center justify-between h-16 px-4">
            <motion.a
              href="#"
              className="relative flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <span className="text-[1.7rem] font-black tracking-tighter text-white" style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.04em',
                }}>
                  Dev<span className="text-purple-400/90">Sync</span>
                </span>
                <div className="ml-1.5 h-1.5 w-1.5 rounded-full bg-purple-400/90 animate-pulse" />
              </div>
            </motion.a>

            <div className="hidden lg:flex lg:items-center lg:gap-x-8">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative px-3 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-purple-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex lg:items-center lg:gap-4">
                {isAuthenticated ? (
                  <div className="relative">
                    <motion.button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Avatar
                        src={user?.avatar}
                        alt={user?.name}
                        fallback={user?.name?.[0] || "U"}
                        className="ring-2 ring-purple-500/20 hover:ring-purple-500/40 transition-all"
                      />
                    </motion.button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          style={{ zIndex: LAYER_ORDER.dropdown }}
                          className="absolute right-0 mt-2 w-64 origin-top-right"
                        >
                          <div className="rounded-lg bg-black/90 backdrop-blur-xl shadow-lg ring-1 ring-white/10">
                            <div className="p-4 border-b border-white/10">
                              <div className="flex items-center gap-3">
                                <Avatar
                                  src={user?.avatar}
                                  alt={user?.name}
                                  size="sm"
                                />
                                <div>
                                  <p className="text-sm font-medium text-white">{user?.name}</p>
                                  <p className="text-sm text-neutral-400 truncate">{user?.email}</p>
                                </div>
                              </div>
                            </div>
                            <div className="py-2">
                              {userNavigation.map((item) => (
                                <motion.a
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:bg-white/5 transition-colors"
                                  whileHover={{ x: 2 }}
                                >
                                  <item.icon className="w-4 h-4 text-neutral-400" />
                                  {item.name}
                                </motion.a>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      Sign in
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      Sign up
                    </Button>
                  </div>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-2 text-neutral-300 hover:bg-white/5 rounded-md"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </nav>
        </Container>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ zIndex: LAYER_ORDER.modal }}
                className="fixed inset-0 lg:hidden isolate"
              >
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md" />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  className="fixed inset-y-0 right-0 w-full max-w-sm bg-black/80 shadow-xl backdrop-blur-xl"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-4 h-20 border-b border-white/10">
                      <div className="flex items-center">
                        <span className="text-[1.7rem] font-black tracking-tighter text-white" style={{
                          fontFamily: "'Inter', sans-serif",
                          letterSpacing: '-0.04em',
                        }}>
                          Dev<span className="text-purple-400/90">Sync</span>
                        </span>
                        <div className="ml-1.5 h-1.5 w-1.5 rounded-full bg-purple-400/90 animate-pulse" />
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-neutral-300 hover:bg-white/5 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <div className="flex-1 overflow-y-auto py-6 px-4">
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2.5 text-base font-medium text-neutral-300 rounded-md hover:bg-white/5"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      {/* Mobile Auth Buttons */}
                      {!isAuthenticated && (
                        <div className="mt-8 space-y-3">
                          <Button
                            variant="aceternity"
                            className="w-full"
                          >
                            <div className="relative flex items-center justify-center gap-2 z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
                              <span>Sign in</span>
                              <svg
                                fill="none"
                                height="16"
                                viewBox="0 0 24 24"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.75 8.75L14.25 12L10.75 15.25"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            </div>
                          </Button>
                          <Button
                            variant="aceternity"
                            className="w-full"
                          >
                            <div className="relative flex items-center justify-center gap-2 z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
                              <span>Sign up</span>
                              <svg
                                fill="none"
                                height="16"
                                viewBox="0 0 24 24"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.75 8.75L14.25 12L10.75 15.25"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            </div>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
}