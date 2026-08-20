"use client";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#0F3D3A]/[0.06] text-[#0F3D3A]">
      <Icon size={16} strokeWidth={1.75} />
    </div>
    <div>
      <div className="text-[11.5px] tracking-wide text-[#8A938D] uppercase">
        {label}
      </div>
      <div className="text-[14px] text-[#16241F]">{value}</div>
    </div>
  </div>
);

const Field = ({ label, error, children }) => (
  <div>
    <label className="mb-1.5 block text-[13px] font-[500] text-[#16241F]">
      {label}
    </label>
    {children}
    {error && (
      <p className="mt-1.5 text-[12.5px] text-[#B3432D]">{error.message}</p>
    )}
  </div>
);

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async () => {
    try {
      // Replace with your actual API call, e.g.:

      // console.log(data)
      await new Promise((resolve) => setTimeout(resolve, 900));

      toast.success("Message sent — we'll get back to you shortly.");
      reset();
    } catch (err) {
      console.log("error :", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputBase =
    "w-full rounded-md border bg-white px-3.5 py-2.5 text-[14px] text-[#16241F] placeholder:text-[#A6AEA8] outline-none transition-colors focus:border-[#0F3D3A] focus:ring-1 focus:ring-[#0F3D3A]";

  return (
    <div className="w-full bg-[#F6F5F0] font-sans text-[#16241F] antialiased">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0F3D3A",
            color: "#F6F5F0",
            fontSize: "13.5px",
            borderRadius: "8px",
          },
          success: { iconTheme: { primary: "#E0A94A", secondary: "#0F3D3A" } },
        }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-[12px] font-[500] tracking-wide text-[#0F3D3A] uppercase">
            Contact
          </span>
          <h1 className="font-serif-display mt-3 text-[36px] leading-[1.1] font-[560] tracking-tight text-[#0F1F1B] md:text-[42px]">
            We&#39;re glad to hear from you
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[#4B564F]">
            Whether you&#39;re a clinic exploring Doctorly, an administrator
            with a question about an account, or a patient with a question about
            your record — send us a message and a real person will respond.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          {/* Info panel */}
          <div className="md:col-span-2">
            <div className="rounded-xl border border-[#DCE3DC] bg-white p-7">
              <h2 className="font-serif-display text-[19px] font-[560] text-[#0F1F1B]">
                Reach us directly
              </h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#5C6863]">
                For urgent account or access issues, email is the fastest way to
                reach the team.
              </p>

              <div className="mt-7 flex flex-col gap-6">
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value="support@doctorly.app"
                />
                <InfoRow icon={Phone} label="Phone" value="+1 (415) 555-0148" />
                <InfoRow
                  icon={MapPin}
                  label="Office"
                  value="204 Harbor Row, Suite 5, Boston, MA"
                />
                <InfoRow
                  icon={Clock}
                  label="Hours"
                  value="Mon – Fri, 9:00 AM – 6:00 PM EST"
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-xl border border-[#DCE3DC] bg-white p-7 md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <input
                    type="text"
                    placeholder="Jordan Lee"
                    className={`${inputBase} ${
                      errors.name ? "border-[#B3432D]" : "border-[#DCE3DC]"
                    }`}
                    {...register("name", {
                      required: "Enter your full name.",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters.",
                      },
                    })}
                  />
                </Field>

                <Field label="Email address" error={errors.email}>
                  <input
                    type="email"
                    placeholder="jordan@clinic.com"
                    className={`${inputBase} ${
                      errors.email ? "border-[#B3432D]" : "border-[#DCE3DC]"
                    }`}
                    {...register("email", {
                      required: "Enter your email address.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address.",
                      },
                    })}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Phone number (optional)" error={errors.phone}>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className={`${inputBase} ${
                      errors.phone ? "border-[#B3432D]" : "border-[#DCE3DC]"
                    }`}
                    {...register("phone", {
                      pattern: {
                        value: /^[0-9+\-\s()]{7,20}$/,
                        message: "Enter a valid phone number.",
                      },
                    })}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Subject" error={errors.subject}>
                  <select
                    defaultValue=""
                    className={`${inputBase} ${
                      errors.subject ? "border-[#B3432D]" : "border-[#DCE3DC]"
                    }`}
                    {...register("subject", {
                      required: "Select a subject.",
                    })}
                  >
                    <option value="" disabled>
                      Choose a topic
                    </option>
                    <option value="clinic-demo">Clinic demo request</option>
                    <option value="account-access">Account access</option>
                    <option value="patient-record">
                      Question about my record
                    </option>
                    <option value="other">Something else</option>
                  </select>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Message" error={errors.message}>
                  <textarea
                    rows={5}
                    placeholder="Tell us a little about what you need..."
                    className={`${inputBase} resize-none ${
                      errors.message ? "border-[#B3432D]" : "border-[#DCE3DC]"
                    }`}
                    {...register("message", {
                      required: "Enter a message.",
                      minLength: {
                        value: 20,
                        message: "Message should be at least 20 characters.",
                      },
                    })}
                  />
                </Field>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-md bg-[#0F3D3A] px-5 py-3 text-sm font-[500] text-[#F6F5F0] transition-colors hover:bg-[#0C332F] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <Send size={15} />
                  </>
                )}
              </button>

              <p className="mt-4 text-[12px] text-[#8A938D]">
                By sending this message, you agree to be contacted about your
                inquiry. We don&#39;t share your details with third parties.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
