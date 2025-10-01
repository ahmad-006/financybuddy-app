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

const AddSavingModal = ({ isOpen, onClose, onAddSaving, saving, isLoading, onDelete }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (saving) {
      setValue("amount", saving.amount || 0);
      setValue(
        "date",
        saving.date
          ? format(new Date(saving.date), "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd")
      );
      setValue("title", saving.title || "");
    } else {
      reset();
      setValue("date", format(new Date(), "yyyy-MM-dd"));
    }
  }, [saving, reset, setValue]);

  const onSubmit = async (data) => {
    await onAddSaving({
      ...data,
    });
    onClose();
    reset();
  };

  const handleDelete = async () => {
    if (saving && onDelete) {
      await onDelete(saving._id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {saving ? "Edit Saving Entry" : "Add New Saving"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
   
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
            {saving && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="w-full sm:w-auto"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
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
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (saving ? "Updating..." : "Adding...") : (saving ? "Update" : "Add")} Saving
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


export default AddSavingModal;
