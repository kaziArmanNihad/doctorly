import { Loader2, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Field from "./Field";
import { createPatient } from "../utils/doctorData";

const inputBase =
  "w-full rounded-md border bg-white px-3.5 py-2.5 text-[14px] text-[#16241F] placeholder:text-[#A6AEA8] outline-none transition-colors focus:border-[#0F3D3A] focus:ring-1 focus:ring-[#0F3D3A]";

function AddPatientModal({
  open,
  onClose,
  onCreate,
  doctorName,
}) {
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
    try {
      // Replace with your API request later.
      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      const patient = createPatient(data);

      onCreate(patient);

      toast.success("Patient added.");

      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to add patient.");
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1F1B]/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-[#F6F5F0] p-6 shadow-xl">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="font-serif-display text-[19px] font-[560] text-[#0F1F1B]">
            Add patient
          </h2>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-[#8A938D] transition-colors hover:text-[#0F3D3A] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close add patient modal"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-5 text-[13px] text-[#8A938D]">
          Under {doctorName}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
          <Field
            label="Patient name"
            error={errors.name}
          >
            <input
              type="text"
              autoFocus
              placeholder="Riley Morgan"
              className={`${inputBase} ${
                errors.name
                  ? "border-[#B3432D]"
                  : "border-[#DCE3DC]"
              }`}
              {...register("name", {
                required:
                  "Enter the patient's name.",
                minLength: {
                  value: 2,
                  message:
                    "Name must be at least 2 characters.",
                },
              })}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Age"
              error={errors.age}
            >
              <input
                type="number"
                min="0"
                max="120"
                placeholder="34"
                className={`${inputBase} ${
                  errors.age
                    ? "border-[#B3432D]"
                    : "border-[#DCE3DC]"
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

            <Field
              label="Condition"
              error={errors.condition}
            >
              <input
                type="text"
                placeholder="Hypertension"
                className={`${inputBase} ${
                  errors.condition
                    ? "border-[#B3432D]"
                    : "border-[#DCE3DC]"
                }`}
                {...register("condition", {
                  required:
                    "Enter the patient's condition.",
                })}
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-md bg-[#0F3D3A] px-5 py-2.5 text-sm font-[500] text-[#F6F5F0] transition-colors hover:bg-[#0C332F] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2
                size={15}
                className="animate-spin"
              />
            ) : (
              <Plus size={15} />
            )}

            {isSubmitting
              ? "Adding..."
              : "Add patient"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPatientModal;