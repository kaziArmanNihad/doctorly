"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  Activity,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import api from "../lib/api";
import { redirect } from "next/navigation";

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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      // firebase - creating user
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      // Updating display name
      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      if (!user) {
        throw new Error("Firebase user was not created.");
      }

      // sending data in the db
      await api.post("/user", {
        name: data.name,
        email: data.email,
        password: data.password,
        isActive: true,
        role: "admin",
      });

      // clearing form
      reset();
      redirect("/");
      toast.success("Account created — welcome to Doctorly.");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.log("error while register: ", err);
    }
  };

  const handleGoogleSignUp = () => {
    toast("Connecting to Google...", {
      icon: "🔒",
    });

    // google stuff
  };

  const inputBase =
    "w-full rounded-md border border-[#DCE3DC] bg-white px-3.5 py-2.5 pl-10 text-[14px] text-[#16241F] placeholder:text-[#A6AEA8] outline-none transition-all focus:border-[#0F3D3A] focus:ring-2 focus:ring-[#0F3D3A]/10";

  return (
    <div className="min-h-screen w-full bg-[#F6F5F0] font-sans text-[#16241F] antialiased">
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

      {/* Main container */}
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center p-4 sm:p-6 lg:p-8">
        {/* Registration card */}
        <div className="flex w-full overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,61,58,0.08)] lg:min-h-[680px]">
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

            {/* Brand content */}
            <div className="relative max-w-sm">
              <h2 className="font-serif-display text-[30px] leading-tight font-[560]">
                Set up your clinic&apos;s record in minutes
              </h2>

              <p className="mt-4 text-[14px] leading-relaxed text-[#DCE7E3]">
                Create an account to start managing doctors, patients, and
                analytics from one secure dashboard.
              </p>
            </div>

            {/* Copyright */}
            <p className="relative text-[12px] text-[#9FB3AC]">
              © {new Date().getFullYear()} Doctorly. All rights reserved.
            </p>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
            <div className="w-full max-w-sm space-y-2">
              {/* Heading */}
              <div>
                <h1 className="font-serif-display text-[28px] font-[560] text-[#0F1F1B]">
                  Create your account
                </h1>

                <p className="mt-2 text-[14px] text-[#5C6863]">
                  Get started with Doctorly in a few seconds.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* Full name */}
                <Field label="Full name" error={errors.name}>
                  <div className="relative">
                    <User
                      size={16}
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#8A938D]"
                    />

                    <input
                      type="text"
                      placeholder="Jordan Lee"
                      autoComplete="name"
                      className={`${inputBase} ${
                        errors.name
                          ? "border-[#B3432D] focus:border-[#B3432D] focus:ring-[#B3432D]/10"
                          : ""
                      }`}
                      {...register("name", {
                        required: "Enter your full name.",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters.",
                        },
                      })}
                    />
                  </div>
                </Field>

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
                      placeholder="Create a password"
                      autoComplete="new-password"
                      className={`${inputBase} pr-10 ${
                        errors.password
                          ? "border-[#B3432D] focus:border-[#B3432D] focus:ring-[#B3432D]/10"
                          : ""
                      }`}
                      {...register("password", {
                        required: "Enter a password.",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters.",
                        },
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                          message:
                            "Include at least one letter and one number.",
                        },
                      })}
                    />

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

                {/* Confirm password */}
                <Field label="Confirm password" error={errors.confirmPassword}>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#8A938D]"
                    />

                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      className={`${inputBase} pr-10 ${
                        errors.confirmPassword
                          ? "border-[#B3432D] focus:border-[#B3432D] focus:ring-[#B3432D]/10"
                          : ""
                      }`}
                      {...register("confirmPassword", {
                        required: "Confirm your password.",
                        validate: (value) =>
                          value === getValues("password") ||
                          "Passwords don't match.",
                      })}
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm((value) => !value)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-[#8A938D] transition-colors hover:text-[#0F3D3A]"
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>

                {/* Terms */}
                <div>
                  <label className="flex items-start gap-2 text-[13px] leading-relaxed text-[#5C6863]">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-[#DCE3DC] text-[#0F3D3A] focus:ring-[#0F3D3A]"
                      {...register("terms", {
                        required: "You must accept the terms to continue.",
                      })}
                    />

                    <span>
                      I agree to the{" "}
                      <a
                        href="#"
                        className="font-medium text-[#0F3D3A] hover:underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="font-medium text-[#0F3D3A] hover:underline"
                      >
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>

                  {errors.terms && (
                    <p className="mt-1.5 text-[12.5px] text-[#B3432D]">
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-md bg-[#0F3D3A] px-5 py-3 text-sm font-medium text-[#F6F5F0] transition-all hover:bg-[#0C332F] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#E2E0D6]" />

                <span className="text-[12px] whitespace-nowrap text-[#8A938D]">
                  or sign up with email
                </span>

                <div className="h-px flex-1 bg-[#E2E0D6]" />
              </div>

              {/* Google signup */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-md border border-[#DCE3DC] bg-white px-4 py-2.5 text-[14px] font-medium text-[#16241F] transition-all hover:border-[#C8D2CB] hover:bg-[#F6F5F0] active:scale-[0.99]"
              >
                <FcGoogle size={24} />
                Continue with Google
              </button>

              {/* Login */}
              <p className="mt-7 text-center text-[13.5px] text-[#5C6863]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[#0F3D3A] hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
