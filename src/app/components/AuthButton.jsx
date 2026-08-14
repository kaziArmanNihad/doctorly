"use client";

import { ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useAuth } from "@/app/providers/AuthProvider";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

function AuthButton() {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.error("Logout Successfully!")
      redirect("/")
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div className="h-9 w-20 animate-pulse rounded-md bg-[#E2E0D6]" />;
  }

  if (user?.email) {
    return (
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-1.5 rounded-md bg-[#0F3D3A] px-4 py-2 text-sm font-medium text-[#F6F5F0] transition-all hover:bg-[#0C332F] active:scale-[0.98] cursor-pointer hover:text-red-500 "
      >
        Logout
        <LogOut size={14} />
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-1.5 rounded-md bg-[#0F3D3A] px-4 py-2 text-sm font-medium text-[#F6F5F0] transition-all hover:bg-[#0C332F] active:scale-[0.98] cursor-pointer"
    >
      Sign In
      <ArrowRight size={14} />
    </Link>
  );
}

export default AuthButton;
