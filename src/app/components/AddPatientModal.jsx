import { Loader2, Plus, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Field from "./Field";

const inputBase =
  "w-full rounded-md border bg-white px-3.5 py-2.5 text-[14px] text-[#16241F] placeholder:text-[#A6AEA8] outline-none transition-colors focus:border-[#0F3D3A] focus:ring-1 focus:ring-[#0F3D3A]";

function AddPatientModal({
  open,
  onClose,
  onCreate,
  doctors = [],
  defaultDoctorId = "",
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      condition: "",
      doctor: defaultDoctorId,
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: "",
        age: "",
        gender: "",
        condition: "",
        doctor: defaultDoctorId,
        phone: "",
        email: "",
      });
    }
  }, [open, defaultDoctorId, reset]);

  if (!open) return null;

  const handleClose = () => {
    if (isSubmitting) return;

    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      await onCreate(data);
      reset();
      onClose();
    } catch (err) {
      console.log(err, "error from add patient modal");

      toast.error(err?.response?.data?.message || "Couldn't add patient.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1F1B]/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-[#F6F5F0] p-6 shadow-xl">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-serif-display text-[20px] font-[560] text-[#0F1F1B]">
              Add patient
            </h2>

            <p className="mt-1 text-[13px] text-[#8A938D]">
              Add a new patient to the system.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-[#8A938D] transition-colors hover:text-[#0F3D3A] disabled:opacity-50"
            aria-label="Close add patient modal"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
          {/* Name */}
          <Field label="Full name" error={errors.name}>
            <input
              autoFocus
              type="text"
              placeholder="Riley Morgan"
              className={`${inputBase} ${
                errors.name ? "border-[#B3432D]" : "border-[#DCE3DC]"
              }`}
              {...register("name", {
                required: "Enter the patient's name.",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters.",
                },
              })}
            />
          </Field>

          {/* Email */}
          <Field label="Email" error={errors.email}>
            <input
              type="email"
              placeholder="patient@example.com"
              className={`${inputBase} ${
                errors.email ? "border-[#B3432D]" : "border-[#DCE3DC]"
              }`}
              {...register("email", {
                required: "Enter the patient's email.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address.",
                },
              })}
            />
          </Field>

          {/* Age + Gender */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Age" error={errors.age}>
              <input
                type="number"
                min="0"
                max="120"
                placeholder="34"
                className={`${inputBase} ${
                  errors.age ? "border-[#B3432D]" : "border-[#DCE3DC]"
                }`}
                {...register("age", {
                  required: "Age is required.",
                  min: {
                    value: 0,
                    message: "Invalid age.",
                  },
                  max: {
                    value: 120,
                    message: "Invalid age.",
                  },
                  valueAsNumber: true,
                })}
              />
            </Field>

            <Field label="Gender" error={errors.gender}>
              <select
                className={`${inputBase} ${
                  errors.gender ? "border-[#B3432D]" : "border-[#DCE3DC]"
                }`}
                {...register("gender", {
                  required: "Select the patient's gender.",
                })}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </Field>
          </div>

          {/* Condition + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Condition" error={errors.condition}>
              <input
                type="text"
                placeholder="Hypertension"
                className={`${inputBase} ${
                  errors.condition ? "border-[#B3432D]" : "border-[#DCE3DC]"
                }`}
                {...register("condition", {
                  required: "Enter the patient's condition.",
                })}
              />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input
                type="tel"
                placeholder="+1 415 555 0100"
                className={`${inputBase} ${
                  errors.phone ? "border-[#B3432D]" : "border-[#DCE3DC]"
                }`}
                {...register("phone", {
                  required: "Enter a phone number.",
                  pattern: {
                    value: /^[0-9+\-\s()]{7,20}$/,
                    message: "Invalid phone number.",
                  },
                })}
              />
            </Field>
          </div>

          {/* Doctor */}
          <Field label="Assigned doctor" error={errors.doctor}>
            <select
              className={`${inputBase} ${
                errors.doctor ? "border-[#B3432D]" : "border-[#DCE3DC]"
              }`}
              {...register("doctor", {
                required: "Select the assigned doctor.",
                setValueAs: (v) => (v ? v.trim() : v),
              })}
            >
              <option value="">Select a doctor</option>

              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </Field>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-md bg-[#0F3D3A] px-5 py-2.5 text-sm font-[500] text-[#F6F5F0] transition-colors hover:bg-[#0C332F] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Plus size={15} />
            )}

            {isSubmitting ? "Adding..." : "Add patient"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPatientModal;
