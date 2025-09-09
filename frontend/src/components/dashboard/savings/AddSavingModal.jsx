import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

const AddSavingModal = ({ onClose, onSave, editingSaving, onDelete }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editingSaving) {
      setValue("amount", editingSaving.amount || 0);
      setValue(
        "date",
        editingSaving.date
          ? format(new Date(editingSaving.date), "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd")
      );
      setValue("title", editingSaving.title || "");
    } else {
      reset();
      setValue("date", format(new Date(), "yyyy-MM-dd"));
    }
  }, [editingSaving, reset, setValue]);

  const onSubmit = (data) => {
    onSave({
      ...data,
    });
    onClose();
    reset();
  };

  const handleDelete = () => {
    if (editingSaving && onDelete) {
      onDelete(editingSaving._id);
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {editingSaving ? "Edit Saving Entry" : "Add New Saving"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className={errors.amount ? "border-red-500" : ""}
              {...register("amount", {
                required: "Amount is required",
                min: { value: 0.01, message: "Amount must be greater than 0" },
                valueAsNumber: true,
              })}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <Input
              type="date"
              className={errors.date ? "border-red-500" : ""}
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Note / Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Input
              type="text"
              placeholder="e.g., Bonus, Gift, etc."
              className={errors.note ? "border-red-500" : ""}
              {...register("title")}
            />
            {errors.note && (
              <p className="text-red-500 text-xs mt-1">{errors.note.message}</p>
            )}
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between pt-4">
            {editingSaving && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="w-full sm:w-auto"
              >
                Delete
              </Button>
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
              >
                {editingSaving ? "Update" : "Add"} Saving
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSavingModal;
