import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

const SpecialBudgetModal = ({ onClose, onSave, editingBudget, onDelete, isLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: editingBudget?.title || "",
      category: editingBudget?.category || "",
      limit: editingBudget?.limit || 0,
      startDate: editingBudget?.startDate
        ? format(new Date(editingBudget.startDate), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      endDate: editingBudget?.endDate
        ? format(new Date(editingBudget.endDate), "yyyy-MM-dd")
        : "",
    },
  });

  const categories = [
    "Food",
    "Dining Out",
    "Shopping",
    "Housing",
    "Utilities",
    "Transportation",
    "Entertainment",
    "Income",
    "Philanthropy",
    "Healthcare",
    "Education",
    "Subscriptions",
    "Savings",
  ];

  useEffect(() => {
    if (editingBudget) {
      setValue("title", editingBudget.title || "");
      setValue("category", editingBudget.category || "");
      setValue("limit", editingBudget.limit || 0);
      setValue(
        "startDate",
        editingBudget.startDate
          ? format(new Date(editingBudget.startDate), "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd")
      );
      setValue(
        "endDate",
        editingBudget.endDate
          ? format(new Date(editingBudget.endDate), "yyyy-MM-dd")
          : ""
      );
    } else {
      reset();
      setValue("title", "");
      setValue("category", "");
      setValue("limit", 0);
      setValue("startDate", format(new Date(), "yyyy-MM-dd"));
      setValue("endDate", "");
    }
  }, [editingBudget, reset, setValue]);

  const onSubmit = async (data) => {
    await onSave({
      ...data,
      _id: editingBudget ? editingBudget._id : undefined,
    });
    onClose();
    reset();
  };

  const handleDelete = async () => {
    if (editingBudget && onDelete) {
      await onDelete(editingBudget._id);
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {editingBudget ? "Edit Special Budget" : "Add New Special Budget"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
      
          


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            {editingBudget ? (
              <Input value={editingBudget.title} disabled readOnly />
            ) : (
              <Input
                type="text"
                placeholder="Enter budget title"
                className={errors.title ? "border-red-500" : ""}
                {...register("title", { required: "Title is required" })}
              />
            )}
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

     
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            {editingBudget ? (
              <Input value={editingBudget.category} disabled readOnly />
            ) : (
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72 overflow-y-auto">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

    
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className={errors.limit ? "border-red-500" : ""}
              {...register("limit", {
                required: "Amount is required",
                min: { value: 0.01, message: "Amount must be greater than 0" },
                valueAsNumber: true,
              })}
            />
            {errors.limit && (
              <p className="text-red-500 text-xs mt-1">
                {errors.limit.message}
              </p>
            )}
          </div>

    
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <Input
              type="date"
              className={errors.startDate ? "border-red-500" : ""}
              {...register("startDate", { required: "Start Date is required" })}
            />
            {errors.startDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>

    
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <Input
              type="date"
              className={errors.endDate ? "border-red-500" : ""}
              {...register("endDate", {
                required: "End Date is required",
                validate: (value) =>
                  new Date(value) >= new Date(control._formValues.startDate) ||
                  "End Date must be after Start Date",
              })}
            />
            {errors.endDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between pt-4">
            {editingBudget && onDelete && (
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
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (editingBudget ? "Updating..." : "Adding...") : (editingBudget ? "Update" : "Add")} Special Budget
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialBudgetModal;
