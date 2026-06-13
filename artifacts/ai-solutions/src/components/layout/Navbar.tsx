import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Articles", href: "/articles" },
  { name: "Events", href: "/events" },
];

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.5)]">
            <span className="font-bold text-background text-xl">AI</span>
          </div>
          <span className="font-display font-bold text-xl tracking-wide text-foreground">
            AI-SOLUTIONS
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wider uppercase transition-colors hover:text-primary ${
                location === link.href ? "text-primary font-medium" : "text-muted-foreground"
              }`}
              data-testid={`link-${link.name.toLowerCase()}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="px-6 py-2 bg-primary/10 text-primary border border-primary/20 rounded hover:bg-primary hover:text-background hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all uppercase tracking-wider text-sm font-medium"
          data-testid="button-contact"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
