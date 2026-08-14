import { Activity } from "lucide-react";
import Link from "next/link";

import MobileMenu from "@/app/components/MobileMenu";
import AuthButton from "@/app/components/AuthButton";

const navLinks = [
  { label: "Product", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Patient", href: "/patients" },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E0D6] bg-[#F6F5F0]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Doctorly home"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0F3D3A] text-[#F6F5F0]">
            <Activity size={15} strokeWidth={2} />
          </div>

          <span className="font-serif-display text-[19px] font-[560] tracking-tight text-[#0F3D3A]">
            Doctorly
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#5C6863] transition-colors hover:text-[#0F3D3A]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:block">
          <AuthButton />
        </div>

        {/* Mobile */}
        <MobileMenu navLinks={navLinks} />
      </div>
    </header>
  );
}

export default Navbar;
