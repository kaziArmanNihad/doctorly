"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  Activity,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";

const PulseBackdrop = () => (
  <svg
    viewBox="0 0 400 800"
    preserveAspectRatio="xMidYMid slice"
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
    aria-hidden="true"
  >
    <path
      d="M0,400 L120,400 L140,400 L155,370 L175,430 L195,400 L220,400 L280,400 L300,400 L315,370 L335,430 L355,400 L400,400"
      fill="none"
      stroke="#F6F5F0"
      strokeWidth="2"
    />
  </svg>
);

const Field = ({ label, error, children }) => (
  <div>
    <label className="mb-1.5 block text-[13px] font-medium text-[#16241F]">
      {label}
    </label>

    {children}

    {error && (
      <p className="mt-1.5 text-[12.5px] text-[#B3432D]">{error.message}</p>
    )}
  </div>
);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      if (!result) {
        console.log("something went wrong while signin firebase:", err);
        toast.error("Signed in failed!");
      }

      // clearing form
      reset();
      router.push("/");
      toast.success("Signed in successfully.");
    } catch (error) {
      console.error("Login error:", error);
      toast.success("Incorrect email or password.");
      reset();
    }
  };

  const handleGoogleSignIn = () => {
    toast("Connecting to Google...", {
      icon: "🔒",
    });
  };

  const inputBase =
    "w-full rounded-md border border-[#DCE3DC] bg-white px-3.5 py-2.5 pl-10 text-[14px] text-[#16241F] placeholder:text-[#A6AEA8] outline-none transition-all focus:border-[#0F3D3A] focus:ring-2 focus:ring-[#0F3D3A]/10";

  return (
    <div className="min-h-screen w-full bg-[#F6F5F0] font-sans text-[#16241F] antialiased">
      {/* Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0F3D3A",
            color: "#F6F5F0",
            fontSize: "13.5px",
            borderRadius: "8px",
          },
          success: {
            iconTheme: {
              primary: "#E0A94A",
              secondary: "#0F3D3A",
            },
          },
        }}
      />

      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center p-4 sm:p-6 lg:p-8">
        <div className="flex w-full overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,61,58,0.08)] lg:min-h-[680px]">
          {/* Brand */}
          <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-[#0F3D3A] px-10 py-12 text-[#F6F5F0] lg:flex">
            <PulseBackdrop />

            {/* Logo */}
            <div className="relative flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F6F5F0]/10">
                <Activity size={15} strokeWidth={2} />
              </div>

              <span className="font-serif-display text-[19px] font-[560] tracking-tight">
                Doctorly
              </span>
            </div>

            {/* Brand message */}
            <div className="relative max-w-sm">
              <h2 className="font-serif-display text-[30px] leading-tight font-[560]">
                Every doctor. Every patient. One clear record.
              </h2>

              <p className="mt-4 text-[14px] leading-relaxed text-[#DCE7E3]">
                Sign in to search, filter, and manage your clinic&apos;s doctor
                and patient records in one secure place.
              </p>
            </div>

            {/* Copyright */}
            <p className="relative text-[12px] text-[#9FB3AC]">
              © {new Date().getFullYear()} Doctorly. All rights reserved.
            </p>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
            <div className="w-full max-w-sm">
              {/* Heading */}
              <div>
                <h1 className="font-serif-display text-[28px] font-[560] text-[#0F1F1B]">
                  Welcome back
                </h1>

                <p className="mt-2 text-[14px] leading-relaxed text-[#5C6863]">
                  Sign in to your Doctorly account to continue.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* Email */}
                <Field label="Email address" error={errors.email}>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#8A938D]"
                    />

                    <input
                      type="email"
                      placeholder="jordan@clinic.com"
                      autoComplete="email"
                      className={`${inputBase} ${
                        errors.email
                          ? "border-[#B3432D] focus:border-[#B3432D] focus:ring-[#B3432D]/10"
                          : ""
                      }`}
                      {...register("email", {
                        required: "Enter your email address.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address.",
                        },
                      })}
                    />
                  </div>
                </Field>

                {/* Password */}
                <Field label="Password" error={errors.password}>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#8A938D]"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className={`${inputBase} pr-10 ${
                        errors.password
                          ? "border-[#B3432D] focus:border-[#B3432D] focus:ring-[#B3432D]/10"
                          : ""
                      }`}
                      {...register("password", {
                        required: "Enter your password.",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters.",
                        },
                      })}
                    />

                    {/* Password visibility */}
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-[#8A938D] transition-colors hover:text-[#0F3D3A]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>

                <div className="flex items-center justify-between gap-4 text-[13px]">
                  <label className="flex items-center gap-2 text-[#5C6863]">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-[#DCE3DC] text-[#0F3D3A] focus:ring-[#0F3D3A]"
                      {...register("remember")}
                    />

                    <span>Remember me</span>
                  </label>

                  <a
                    href="#"
                    className="font-medium text-[#0F3D3A] transition-colors hover:text-[#0C332F] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-md bg-[#0F3D3A] px-5 py-3 text-sm font-medium text-[#F6F5F0] transition-all hover:bg-[#0C332F] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>

              {/* divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#E2E0D6]" />

                <span className="text-[12px] whitespace-nowrap text-[#8A938D]">
                  or sign in with email
                </span>

                <div className="h-px flex-1 bg-[#E2E0D6]" />
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-md border border-[#DCE3DC] bg-white px-4 py-2.5 text-[14px] font-medium text-[#16241F] transition-all hover:border-[#C8D2CB] hover:bg-[#F6F5F0] active:scale-[0.99]"
              >
                <FcGoogle size={24} />
                Continue with Google
              </button>

              <p className="mt-7 text-center text-[13.5px] text-[#5C6863]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-[#0F3D3A] transition-colors hover:text-[#0C332F] hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
