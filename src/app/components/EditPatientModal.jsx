import { Loader2, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Field from "./Field";
import { updatePatient } from "../utils/patientData";

const inputBase =
  "w-full rounded-md border bg-white px-3.5 py-2.5 text-[14px] text-[#16241F] placeholder:text-[#A6AEA8] outline-none transition-colors focus:border-[#0F3D3A] focus:ring-1 focus:ring-[#0F3D3A]";

function EditPatientModal({ patient, onClose, onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  /*
   * Important:
   * When the selected patient changes,
   * update the form values.
   */
  useEffect(() => {
    if (!patient) return;

    reset({
      name: patient.name,
      age: patient.age,
      condition: patient.condition,
      doctor: patient.doctor,
      phone: patient.phone,
    });
  }, [patient, reset]);

  if (!patient) return null;

  const onSubmit = async (data) => {
    try {
      // Replace with API call later.
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedPatient = updatePatient(data);

      onSave(patient.id, updatedPatient);

      toast.success("Patient updated.");

      onClose();
    } catch {
      toast.error("Failed to update patient.");
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0F1F1B]/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-[#F6F5F0] p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif-display text-[20px] font-[560] text-[#0F1F1B]">
            Edit patient
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-[#8A938D] transition-colors hover:text-[#0F3D3A] disabled:opacity-50"
            aria-label="Close edit patient modal"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
          <Field label="Full name" error={errors.name}>
            <input
              autoFocus
              type="text"
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

          <div className="grid grid-cols-2 gap-4">
            <Field label="Age" error={errors.age}>
              <input
                type="number"
                min="0"
                max="120"
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

            <Field label="Condition" error={errors.condition}>
              <input
                type="text"
                className={`${inputBase} ${
                  errors.condition ? "border-[#B3432D]" : "border-[#DCE3DC]"
                }`}
                {...register("condition", {
                  required: "Enter the patient's condition.",
                })}
              />
            </Field>
          </div>

          <Field label="Assigned doctor" error={errors.doctor}>
            <input
              type="text"
              className={`${inputBase} ${
                errors.doctor ? "border-[#B3432D]" : "border-[#DCE3DC]"
              }`}
              {...register("doctor", {
                required: "Enter the assigned doctor.",
              })}
            />
          </Field>

          <Field label="Phone" error={errors.phone}>
            <input
              type="tel"
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-md bg-[#0F3D3A] px-5 py-2.5 text-sm font-[500] text-[#F6F5F0] transition-colors hover:bg-[#0C332F] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting && <Loader2 size={15} className="animate-spin" />}

            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPatientModal;
