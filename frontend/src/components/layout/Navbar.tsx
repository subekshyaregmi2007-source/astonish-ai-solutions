import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Articles", href: "/articles" },
  { name: "Events", href: "/events" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <motion.div
          className="relative w-full max-w-[1200px] overflow-hidden"
          animate={{
            borderRadius: scrolled ? "9999px" : "0px",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: scrolled
              ? "rgba(244, 251, 246, 0.88)"
              : "transparent",
            backdropFilter: scrolled ? "blur(28px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(28px) saturate(180%)" : "none",
            boxShadow: scrolled
              ? "0 0 0 1px rgba(46,139,87,0.15), 0 8px 32px rgba(46,139,87,0.1), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(46,139,87,0.06)"
              : "none",
          }}
        >
          {/* Green shimmer top line — only when scrolled */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0.6 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.6 }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(46,139,87,0.4) 20%, rgba(91,168,122,0.8) 40%, rgba(46,139,87,0.5) 55%, rgba(125,196,154,0.3) 75%, transparent 100%)",
                  filter: "blur(0.5px)",
                }}
              />
            )}
          </AnimatePresence>

          {/* Nav content */}
          <div className="flex items-center justify-between px-6 py-4 md:px-8">
            <Link
              href="/"
              className="font-bold text-[#1A3326] text-[15px] uppercase tracking-widest shrink-0"
              data-testid="link-home"
            >
              AI-Solutions
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`relative text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 ${
                      location === link.href
                        ? "text-[#2E8B57]"
                        : "text-[#3D6B52] hover:text-[#1A3326]"
                    }`}
                    data-testid={`link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                    {location === link.href && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{
                          background: "linear-gradient(90deg, transparent, #5BA87A, transparent)",
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="hidden md:flex items-center gap-3 shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <Link
                href="/contact"
                className="relative px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white overflow-hidden inline-flex items-center"
                style={{
                  background: scrolled
                    ? "rgba(46, 139, 87, 0.85)"
                    : "rgba(46, 139, 87, 1)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "9999px",
                  boxShadow: "0 0 0 1px rgba(91,168,122,0.4), inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 16px rgba(46,139,87,0.3)",
                }}
                data-testid="button-contact"
              >
                <span className="relative z-10">Get Started</span>
              </Link>
              
              {/* Admin Link */}
              <Link
                href="/admin"
                className="p-2 text-[#3D6B52] hover:text-[#2E8B57] transition-colors opacity-50 hover:opacity-100"
                title="Admin Portal"
                data-testid="link-admin"
              >
                <Lock className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-[#3D6B52]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(240, 249, 244, 0.95)",
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              boxShadow: "0 0 0 1px rgba(46,139,87,0.15), 0 16px 48px rgba(46,139,87,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] py-2 hover:text-[#2E8B57] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block text-center mt-4 px-8 py-3 text-white text-[11px] font-semibold uppercase tracking-[0.2em] rounded-full"
                style={{
                  background: "rgba(46, 139, 87, 0.9)",
                  boxShadow: "0 0 0 1px rgba(91,168,122,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
              
              {/* Admin Link for Mobile */}
              <Link
                href="/admin"
                className="flex items-center justify-center gap-2 mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] py-2 hover:text-[#2E8B57] transition-colors opacity-60"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
