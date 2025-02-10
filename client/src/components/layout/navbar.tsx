"use client";
import { Avatar } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";
import { LAYER_ORDER } from "@/lib/constants";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  FileText,
  LogOut,
  Menu,
  Settings,
  User,
  X,
  Sparkles,
  LayoutTemplate,
  CreditCard,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Features", href: "/features", icon: Sparkles },
  { name: "Templates", href: "/templates", icon: LayoutTemplate },
  { name: "Pricing", href: "/pricing", icon: CreditCard },
];

const userNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Profile", href: "/profile", icon: User },
  {
    name: "Sign out",
    href: "/auth/signout",
    icon: LogOut,
    onClick: () => signOut(),
  },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const { data: session, status } = useSession();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  const authItems =
    status === "loading" ? (
      <div className="h-15 w-32 bg-neutral-800 animate-pulse rounded" />
    ) : session ? (
      <>
        <span className="text-gray-700">Welcome, {session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <Link
          href="/auth/signin"
          className="text-neutral-300 hover:text-white transition-colors duration-300"
        >
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Sign Up
        </Link>
      </>
    );

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
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 to-black/0 dark:from-black/70 dark:to-black/0 backdrop-blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        <Container>
          <nav className="flex items-center justify-between h-20 px-6">
            <motion.a
              href="/"
              className="group flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="h-9 w-9 rounded-xl bg-purple-500/20 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <div className="h-3.5 w-3.5 rounded-sm bg-purple-500 group-hover:bg-purple-400 transition-colors duration-300" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                DevSync
              </span>
            </motion.a>

            <div className="hidden lg:flex lg:items-center lg:gap-x-10">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="group relative px-3 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-300"
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden lg:flex lg:items-center lg:gap-5">
                {status === "loading" ? (
                  <div className="h-10 w-10 rounded-full bg-neutral-800 animate-pulse" />
                ) : session ? (
                  <div className="relative">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserMenuOpen(!userMenuOpen);
                      }}
                      className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Avatar
                        src={session.user?.image ?? undefined}
                        alt={session.user?.name ?? undefined}
                        fallback={session.user?.name?.[0] || "U"}
                        className="ring-2 ring-purple-500/30 hover:ring-purple-500/50 transition-all duration-300 shadow-lg"
                      />
                    </motion.button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0"
                            onClick={() => setUserMenuOpen(false)}
                            style={{ zIndex: LAYER_ORDER.dropdown - 1 }}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            style={{ zIndex: LAYER_ORDER.dropdown }}
                            className="absolute right-0 mt-3 w-72 origin-top-right"
                          >
                            <div className="rounded-xl bg-black/90 backdrop-blur-xl shadow-2xl ring-1 ring-white/10">
                              <div className="p-5 border-b border-white/10">
                                <div className="flex items-center gap-4">
                                  <Avatar
                                    src={session.user?.image ?? undefined}
                                    alt={session.user?.name ?? undefined}
                                    size="md"
                                    className="ring-2 ring-purple-500/20"
                                  />
                                  <div>
                                    <p className="text-base font-semibold text-white">
                                      {session.user?.name}
                                    </p>
                                    <p className="text-sm text-neutral-400 truncate mt-0.5">
                                      {session.user?.email}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="py-2">
                                {userNavigation.map((item) => (
                                  <motion.button
                                    key={item.name}
                                    onClick={item.onClick}
                                    className="flex items-center gap-3 px-5 py-3 text-sm text-neutral-300 hover:bg-white/5 transition-colors duration-200 w-full"
                                    whileHover={{ x: 4 }}
                                  >
                                    <item.icon className="w-4 h-4 text-neutral-400" />
                                    {item.name}
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">{authItems}</div>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-2.5 text-neutral-300 hover:bg-white/5 rounded-lg"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
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
              <div className="fixed inset-0 bg-black/70 backdrop-blur-xl" />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-full max-w-sm bg-black/90 shadow-2xl backdrop-blur-2xl"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-6 h-24 border-b border-white/10">
                    <div className="flex items-center">
                      <span
                        className="text-2xl font-black tracking-tighter text-white"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          letterSpacing: "-0.04em",
                        }}
                      >
                        Dev<span className="text-purple-400">Sync</span>
                      </span>
                      <div className="ml-2 h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 text-neutral-300 hover:bg-white/5 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                  <div className="flex-1 overflow-y-auto py-8 px-6">
                    {status === "loading" ? (
                      <div className="space-y-4 px-4">
                        <div className="h-12 bg-neutral-800 rounded-lg animate-pulse" />
                        <div className="h-12 bg-neutral-800 rounded-lg animate-pulse" />
                        <div className="h-12 bg-neutral-800 rounded-lg animate-pulse" />
                      </div>
                    ) : session ? (
                      <>
                        <div className="flex items-center gap-4 mb-8 px-4">
                          <Avatar
                            src={session.user?.image ?? undefined}
                            alt={session.user?.name ?? undefined}
                            size="md"
                            className="ring-2 ring-purple-500/20"
                          />
                          <div>
                            <p className="text-base font-semibold text-white">
                              {session.user?.name}
                            </p>
                            <p className="text-sm text-neutral-400 truncate mt-0.5">
                              {session.user?.email}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {navigation.map((item) => (
                            <motion.a
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-neutral-300 rounded-lg hover:bg-white/5 transition-colors duration-200"
                              whileHover={{ x: 4 }}
                            >
                              <item.icon className="w-5 h-5 text-neutral-400" />
                              {item.name}
                            </motion.a>
                          ))}
                        </div>
                        <div className="absolute bottom-8 left-6 right-6">
                          {userNavigation
                            .filter((item) => item.name === "Sign out")
                            .map((item) => (
                              <motion.button
                                key={item.name}
                                onClick={item.onClick}
                                className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-neutral-300 rounded-lg hover:bg-white/5 transition-colors duration-200 w-full"
                                whileHover={{ x: 4 }}
                              >
                                <item.icon className="w-5 h-5 text-neutral-400" />
                                {item.name}
                              </motion.button>
                            ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          {navigation.map((item) => (
                            <motion.a
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-neutral-300 rounded-lg hover:bg-white/5 transition-colors duration-200"
                              whileHover={{ x: 4 }}
                            >
                              <item.icon className="w-5 h-5 text-neutral-400" />
                              {item.name}
                            </motion.a>
                          ))}
                        </div>
                        <div className="mt-10 space-y-4">{authItems}</div>
                      </>
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
