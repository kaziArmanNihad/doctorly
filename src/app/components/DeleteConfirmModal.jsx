import { AlertTriangle, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function DeleteConfirmModal({ patient, onClose, onConfirm }) {
  const [loading, setLoading] = useState(false);

  if (!patient) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);

      // Replace with API request later.
      await new Promise((resolve) => setTimeout(resolve, 400));

      onConfirm(patient._id);

      toast.success(`${patient.name} deleted.`);

      onClose();
    } catch {
      toast.error("Failed to delete patient.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1F1B]/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-[#F6F5F0] p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B3432D]/10 text-[#B3432D]">
            <AlertTriangle size={18} />
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="text-[#8A938D] hover:text-[#0F3D3A] disabled:opacity-50"
            aria-label="Close delete confirmation"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="mt-4 font-serif-display text-[18px] font-[560] text-[#0F1F1B]">
          Delete {patient.name}?
        </h2>

        <p className="mt-1.5 text-[13.5px] leading-5 text-[#5C6863]">
          This will permanently remove this patient&#39;s record. This can&#39;t
          be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-md border border-[#DCE3DC] px-4 py-2 text-[13.5px] font-[500] text-[#5C6863] transition-colors hover:bg-white disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-md bg-[#B3432D] px-4 py-2 text-[13.5px] font-[500] text-white transition-colors hover:bg-[#96341F] disabled:opacity-70"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}

            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
