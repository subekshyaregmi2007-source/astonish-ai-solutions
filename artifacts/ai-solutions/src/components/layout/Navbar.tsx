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
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(38,38,38,0.8)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto px-6 md:px-16 flex items-center justify-between max-w-[1440px] py-5">
        <Link href="/" className="font-bold text-[#e5e2e1] text-xl uppercase tracking-tight" data-testid="link-home">
          AI-Solutions
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
            >
              <Link
                href={link.href}
                className={`text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 ${
                  location === link.href
                    ? "text-[#8B5CF6] border-b border-[#8B5CF6] pb-0.5"
                    : "text-[#cbc3d7] hover:text-[#e5e2e1]"
                }`}
                data-testid={`link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link
            href="/contact"
            className="px-8 py-3 bg-[#8B5CF6] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#7C3AED] transition-colors duration-200 inline-block"
            data-testid="button-contact"
          >
            Get Started
          </Link>
        </motion.div>

        <button
          className="md:hidden p-2 text-[#cbc3d7]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0a0a0a] border-b border-[#262626] px-6 py-6 space-y-5 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] py-1.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block text-center mt-4 px-8 py-3 bg-[#8B5CF6] text-white text-[11px] font-semibold uppercase tracking-[0.2em]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
