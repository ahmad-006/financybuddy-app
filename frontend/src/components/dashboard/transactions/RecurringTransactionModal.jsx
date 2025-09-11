import { useEffect, useMemo } from "react";
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
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";

const RecurringTransactionModal = ({
  onClose,
  onSave,
  editingTransaction,
  onDelete,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const categories = useMemo(
    () => [
      "Entertainment",
      "Housing",
      "Income",
      "Food",
      "Shopping",
      "Utilities",
      "Transportation",
      "Dining Out",
    ],
    []
  );

  const frequencies = ["Daily", "Weekly", "Monthly", "Yearly"];

  // Populate form values when editing
  useEffect(() => {
    if (editingTransaction) {
      setValue("title", editingTransaction.title || "");
      setValue("amount", editingTransaction.amount ?? 0);
      setValue("type", editingTransaction.type || "expense");
      setValue("category", editingTransaction.category || categories[0]);
      setValue("frequency", editingTransaction.frequency || "Monthly");
      setValue("isActive", editingTransaction.isActive ?? true);
      setValue(
        "nextDate",
        editingTransaction.nextDate
          ? format(new Date(editingTransaction.nextDate), "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd")
      );
    } else {
      reset();
      setValue("type", "expense");
      setValue("frequency", "Monthly");
      setValue("isActive", true);
      setValue("nextDate", format(new Date(), "yyyy-MM-dd"));
    }
  }, [editingTransaction, reset, setValue, categories]);

  const onSubmit = (data) => {
    onSave({
      ...data,
      id: editingTransaction ? editingTransaction.id : `rt${Date.now()}`,
    });
    reset();
  };

  const handleDelete = () => {
    if (editingTransaction && onDelete) {
      onDelete(editingTransaction.id);
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {editingTransaction
              ? "Edit Recurring Transaction"
              : "Add New Recurring Transaction"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Input
              type="text"
              placeholder="e.g., Netflix Subscription"
              className={errors.title ? "border-red-500" : ""}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

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

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <Controller
              name="type"
              control={control}
              rules={{ required: "Type is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.type ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
            )}
          </div>

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
                  <SelectTrigger
                    className={errors.category ? "border-red-500" : ""}
                  >
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

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <Controller
              name="frequency"
              control={control}
              rules={{ required: "Frequency is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.frequency ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map((freq) => (
                      <SelectItem key={freq} value={freq}>
                        {freq}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.frequency && (
              <p className="text-red-500 text-xs mt-1">
                {errors.frequency.message}
              </p>
            )}
          </div>

          {/* Next Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Next Due Date
            </label>
            <Input
              type="date"
              className={errors.nextDate ? "border-red-500" : ""}
              {...register("nextDate", {
                required: "Next Due Date is required",
              })}
            />
            {errors.nextDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.nextDate.message}
              </p>
            )}
          </div>

          {/* Auto-Add Switch */}
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Auto-Add
            </label>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
                />
              )}
            />
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between pt-4">
            {editingTransaction && onDelete && (
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
                {editingTransaction ? "Update" : "Add"} Recurring Transaction
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RecurringTransactionModal;
