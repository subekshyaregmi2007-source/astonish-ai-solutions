import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
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
              ? "rgba(8, 6, 14, 0.55)"
              : "transparent",
            backdropFilter: scrolled ? "blur(28px) saturate(180%) brightness(0.9)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(28px) saturate(180%) brightness(0.9)" : "none",
            boxShadow: scrolled
              ? "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(110,231,183,0.08)"
              : "none",
          }}
        >
          {/* Iridescent top shimmer line — only when scrolled */}
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
                    "linear-gradient(90deg, transparent 0%, rgba(110,231,183,0.5) 20%, rgba(200,160,255,0.9) 40%, rgba(110,231,183,0.7) 55%, rgba(100,200,255,0.4) 75%, transparent 100%)",
                  filter: "blur(0.5px)",
                }}
              />
            )}
          </AnimatePresence>

          {/* Nav content */}
          <div className="flex items-center justify-between px-6 py-4 md:px-8">
            <Link
              href="/"
              className="font-bold text-[#e5e2e1] text-[15px] uppercase tracking-widest shrink-0"
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
                        ? "text-[#c4b5fd]"
                        : "text-[#a8c4b0] hover:text-[#e5e2e1]"
                    }`}
                    data-testid={`link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                    {location === link.href && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{
                          background: "linear-gradient(90deg, transparent, #a7f3d0, transparent)",
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="hidden md:block shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <Link
                href="/contact"
                className="relative px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white overflow-hidden inline-flex items-center"
                style={{
                  background: scrolled
                    ? "rgba(139, 92, 246, 0.75)"
                    : "rgba(139, 92, 246, 1)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "9999px",
                  boxShadow: "0 0 0 1px rgba(167,243,208,0.3), inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(110,231,183,0.25)",
                }}
                data-testid="button-contact"
              >
                <span className="relative z-10">Get Started</span>
              </Link>
            </motion.div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-[#a8c4b0]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile menu — full-width sheet below */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(8,6,14,0.82)",
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 16px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8c4b0] py-2 hover:text-[#a7f3d0] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block text-center mt-4 px-8 py-3 text-white text-[11px] font-semibold uppercase tracking-[0.2em] rounded-full"
                style={{
                  background: "rgba(139, 92, 246, 0.85)",
                  boxShadow: "0 0 0 1px rgba(167,243,208,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
