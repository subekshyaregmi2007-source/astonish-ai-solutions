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
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#F3F4F6]">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home">
          <div className="w-4 h-4 bg-primary rounded-sm"></div>
          <span className="font-bold text-[#111827] text-lg">
            AI-Solutions
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#111827] ${
                location === link.href ? "text-[#111827]" : "text-[#374151]"
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
            className="px-5 py-2.5 bg-[#111827] text-white rounded-lg hover:bg-[#1f2937] transition-colors text-sm font-medium"
            data-testid="button-contact"
          >
            Contact Us
          </Link>
        </div>

        <button 
          className="md:hidden p-2 text-[#374151]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#F3F4F6] px-6 py-4 space-y-4 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-[#374151] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block text-center mt-4 px-5 py-2.5 bg-[#111827] text-white rounded-lg text-sm font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}