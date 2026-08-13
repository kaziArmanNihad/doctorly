import { Loader2, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Field from "./Field";
import { createDoctor } from "../utils/doctorData";

const inputBase =
  "w-full rounded-md border bg-white px-3.5 py-2.5 text-[14px] text-[#16241F] placeholder:text-[#A6AEA8] outline-none transition-colors focus:border-[#0F3D3A] focus:ring-1 focus:ring-[#0F3D3A]";

function AddDoctorModal({ open, onClose, onCreate }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  if (!open) return null;

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    onCreate(createDoctor(data));

    toast.success("Doctor added.");

    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0F1F1B]/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-[#F6F5F0] p-6 shadow-xl">
        <ModalHeader title="Add doctor" onClose={onClose} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
          <Field label="Full name" error={errors.name}>
            <input
              className={`${inputBase} ${
                errors.name ? "border-[#B3432D]" : "border-[#DCE3DC]"
              }`}
              placeholder="Dr. Jordan Lee"
              {...register("name", {
                required: "Enter the doctor's name.",
              })}
            />
          </Field>

          <Field label="Specialization" error={errors.specialization}>
            <input
              className={`${inputBase} ${
                errors.specialization ? "border-[#B3432D]" : "border-[#DCE3DC]"
              }`}
              placeholder="Cardiology"
              {...register("specialization", {
                required: "Enter a specialization.",
              })}
            />
          </Field>

          <Field label="Hospital" error={errors.hospital}>
            <input
              className={`${inputBase} ${
                errors.hospital ? "border-[#B3432D]" : "border-[#DCE3DC]"
              }`}
              placeholder="Green Valley Hospital"
              {...register("hospital", {
                required: "Enter a hospital.",
              })}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone" error={errors.phone}>
              <input
                className={`${inputBase} ${
                  errors.phone ? "border-[#B3432D]" : "border-[#DCE3DC]"
                }`}
                placeholder="+1 555 000 0000"
                {...register("phone", {
                  required: "Enter a phone number.",
                  pattern: {
                    value: /^[0-9+\-\s()]{7,20}$/,
                    message: "Invalid phone number.",
                  },
                })}
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                className={`${inputBase} ${
                  errors.email ? "border-[#B3432D]" : "border-[#DCE3DC]"
                }`}
                placeholder="doctor@doctorly.app"
                {...register("email", {
                  required: "Enter an email address.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address.",
                  },
                })}
              />
            </Field>
          </div>

          <SubmitButton
            loading={isSubmitting}
            loadingText="Adding..."
            text="Add doctor"
          />
        </form>
      </div>
    </div>
  );
}

function ModalHeader({ title, onClose }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="font-serif-display text-[20px] font-[560] text-[#0F1F1B]">
        {title}
      </h2>

      <button
        onClick={onClose}
        className="text-[#8A938D] hover:text-[#0F3D3A]"
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </div>
  );
}

function SubmitButton({ loading, loadingText, text }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 flex items-center justify-center gap-2 rounded-md bg-[#0F3D3A] px-5 py-2.5 text-sm font-[500] text-[#F6F5F0] transition-colors hover:bg-[#0C332F] disabled:opacity-70"
    >
      {loading ? (
        <Loader2 size={15} className="animate-spin" />
      ) : (
        <Plus size={15} />
      )}

      {loading ? loadingText : text}
    </button>
  );
}

export default AddDoctorModal;
