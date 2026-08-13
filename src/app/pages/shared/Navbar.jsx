import { Activity, ArrowRight } from "lucide-react";
import Link from "next/link";
import MobileMenu from "@/app/components/MobileMenu";

const navLinks = [
  { label: "Product", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Patient", href: "/patient" },
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

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-md bg-[#0F3D3A] px-4 py-2 text-sm font-medium text-[#F6F5F0] transition-all hover:bg-[#0C332F] active:scale-[0.98]"
          >
            Sign In
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <MobileMenu navLinks={navLinks} />
        {/* <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-[#0F3D3A] transition-colors hover:bg-[#EAE9E1] md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button> */}
      </div>

      {/* Mobile Navigation */}
      {/* {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#E2E0D6] bg-[#F6F5F0] md:hidden"
        >
          <nav
            className="mx-auto flex max-w-6xl flex-col px-6 py-5"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="border-b border-[#E2E0D6] py-3.5 text-sm font-medium text-[#5C6863] transition-colors hover:text-[#0F3D3A]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={closeMenu}
              className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-md bg-[#0F3D3A] px-4 py-2.5 text-sm font-medium text-[#F6F5F0] transition-all hover:bg-[#0C332F] active:scale-[0.98]"
            >
              Sign In
              <ArrowRight size={14} />
            </Link>
          </nav>
        </div>
      )} */}
    </header>
  );
}

export default Navbar;
