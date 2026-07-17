"use client";
import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { toast } from "sonner";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const PAGES = [
  { to: "/atelier", label: "Atelier" },
] as const;

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeTheme = (localStorage.getItem("vk_theme") as "dark" | "light") || "dark";
      setTheme(activeTheme);
      const root = window.document.documentElement;
      if (activeTheme === "light") {
        root.classList.remove("dark");
        root.classList.add("light");
      } else {
        root.classList.remove("light");
        root.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("vk_theme", newTheme);
    if (newTheme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
    toast.success(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} Mode activated`);
  };

  const handleSection = (id: string) => {
    if (onHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      {/* Brand logo on the far left */}
      <div className="absolute left-6 top-6 flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 group">
          <span
            className="h-2 w-2 rounded-full bg-primary"
            style={{ animation: "neon-pulse 2s ease-in-out infinite" }}
          />
          <span className="font-mono text-sm tracking-wider text-muted-foreground font-semibold group-hover:text-primary transition-colors">
            VK
          </span>
        </Link>
      </div>

      {/* Centered Navigation for Desktop */}
      <nav className="glass hidden md:flex items-center gap-1 rounded-full px-2 py-2 text-sm">
        {SECTIONS.map((n) =>
          onHome ? (
            <button
              key={n.id}
              onClick={() => handleSection(n.id)}
              className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground cursor-pointer"
            >
              {n.label}
            </button>
          ) : (
            <Link
              key={n.id}
              to="/"
              hash={n.id}
              className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {n.label}
            </Link>
          )
        )}

        <span className="mx-1 hidden h-4 w-px bg-white/10 md:inline-block" />

        {PAGES.map((p) => (
          <Link
            key={p.to}
            to={p.to}
            className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            activeProps={{
              className:
                "rounded-full px-3 py-1.5 bg-primary/10 text-primary shadow-[0_0_20px_oklch(0.85_0.18_195/0.25)]",
            }}
          >
            {p.label}
          </Link>
        ))}

        <span className="mx-1 hidden h-4 w-px bg-white/10 md:inline-block" />

        {/* Desktop Theme Switch Button */}
        <button
          onClick={toggleTheme}
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground cursor-pointer flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </nav>

      {/* Mobile Menu & Theme Button Container */}
      <div className="absolute right-6 top-5 flex items-center gap-2 md:hidden">
        <button
          onClick={toggleTheme}
          className="glass p-2 rounded-full text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="glass p-2 rounded-full text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-4 top-20 z-40 md:hidden"
            >
              <div className="glass rounded-3xl p-6 flex flex-col gap-4 shadow-2xl border border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary/60 mb-2 px-3">// SECTIONS</span>
                  {SECTIONS.map((n) =>
                    onHome ? (
                      <button
                        key={n.id}
                        onClick={() => {
                          handleSection(n.id);
                          setMobileOpen(false);
                        }}
                        className="w-full text-left rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground cursor-pointer"
                      >
                        {n.label}
                      </button>
                    ) : (
                      <Link
                        key={n.id}
                        to="/"
                        hash={n.id}
                        onClick={() => setMobileOpen(false)}
                        className="w-full text-left rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                      >
                        {n.label}
                      </Link>
                    )
                  )}
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary/60 mb-2 px-3">// PAGES</span>
                  {PAGES.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-left rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                      activeProps={{
                        className: "bg-primary/10 text-primary shadow-[0_0_20px_oklch(0.85_0.18_195/0.25)] font-medium",
                      }}
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
