"use client";

import { ArrowRight, LogOut, Menu, X } from "lucide-react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import auth from "../firebase/firebase.config";
import { useAuth } from "@/app/providers/AuthProvider";

function MobileMenu({ navLinks }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, loading } = useAuth();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMenu();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setMenuOpen((value) => !value)}
        className="flex h-9 w-9 items-center justify-center rounded-md text-[#0F3D3A] transition-colors hover:bg-[#EAE9E1]"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute top-16 right-0 left-0 border-t border-[#E2E0D6] bg-[#F6F5F0] shadow-sm"
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

            {!loading &&
              (user?.email ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-md bg-[#0F3D3A] px-4 py-2.5 text-sm font-medium text-[#F6F5F0] transition-all hover:bg-[#0C332F] active:scale-[0.98]"
                >
                  Logout
                  <LogOut size={14} />
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-md bg-[#0F3D3A] px-4 py-2.5 text-sm font-medium text-[#F6F5F0] transition-all hover:bg-[#0C332F] active:scale-[0.98]"
                >
                  Sign In
                  <ArrowRight size={14} />
                </Link>
              ))}
          </nav>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
