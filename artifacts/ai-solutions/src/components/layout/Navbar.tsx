import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

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

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-[#262626]/60">
      <div className="mx-auto px-6 md:px-16 h-18 flex items-center justify-between max-w-[1440px] py-5">
        <Link href="/" className="font-bold text-[#e5e2e1] text-xl uppercase tracking-tight" data-testid="link-home">
          AI-Solutions
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                location === link.href
                  ? "text-[#8B5CF6] border-b border-[#8B5CF6] pb-0.5"
                  : "text-[#cbc3d7] hover:text-[#e5e2e1]"
              }`}
              data-testid={`link-${link.name.toLowerCase()}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="px-8 py-3 bg-[#8B5CF6] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#7C3AED] transition-colors"
            data-testid="button-contact"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-[#cbc3d7]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-[#262626] px-6 py-6 space-y-5">
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
        </div>
      )}
    </nav>
  );
}
