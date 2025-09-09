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

const SpecialBudgetModal = ({
  onClose,
  onSave,
  editingBudget,
  onDelete,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: editingBudget?.category || "",
      monthlyLimit: editingBudget?.monthlyLimit || 0,
      startDate: editingBudget?.startDate ? format(new Date(editingBudget.startDate), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
      endDate: editingBudget?.endDate ? format(new Date(editingBudget.endDate), "yyyy-MM-dd") : "",
    },
  });

  const categories = [
    "Food",
    "Shopping",
    "Salary",
    "Utilities",
    "Entertainment",
    "Housing",
    "Transportation",
    "Dining Out",
    "Income",
  ];

  useEffect(() => {
    if (editingBudget) {
      setValue("category", editingBudget.category || "");
      setValue("monthlyLimit", editingBudget.monthlyLimit || 0);
      setValue("startDate", editingBudget.startDate ? format(new Date(editingBudget.startDate), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"));
      setValue("endDate", editingBudget.endDate ? format(new Date(editingBudget.endDate), "yyyy-MM-dd") : "");
    } else {
      reset();
      setValue("startDate", format(new Date(), "yyyy-MM-dd"));
      setValue("endDate", "");
    }
  }, [editingBudget, reset, setValue]);

  const onSubmit = (data) => {
    onSave({
      ...data,
      id: editingBudget ? editingBudget.id : `sb${Date.now()}`,
    });
    onClose();
    reset();
  };

  const handleDelete = () => {
    if (editingBudget && onDelete) {
      onDelete(editingBudget.id);
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
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Monthly Limit (Amount) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className={errors.monthlyLimit ? "border-red-500" : ""}
              {...register("monthlyLimit", {
                required: "Amount is required",
                min: { value: 0.01, message: "Amount must be greater than 0" },
                valueAsNumber: true,
              })}
            />
            {errors.monthlyLimit && (
              <p className="text-red-500 text-xs mt-1">
                {errors.monthlyLimit.message}
              </p>
            )}
          </div>

          {/* Start Date */}
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

          {/* End Date */}
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
              >
                Delete
              </Button>
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                {editingBudget ? "Update" : "Add"} Special Budget
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialBudgetModal;
