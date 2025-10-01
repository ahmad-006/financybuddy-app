import { useEffect, useMemo, useState } from "react";
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
import TestSelect from "@/components/TestSelect";

const RecurringTransactionModal = ({
  onOpenChange,
  onSave,
  editingTransaction,
  onDelete,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [frequency, setFrequency] = useState("Monthly");

  const categories = useMemo(
    () => [
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
      setFrequency(editingTransaction.frequency || "Monthly");
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
      setFrequency("Monthly");
      setValue("isActive", true);
      setValue("nextDate", format(new Date(), "yyyy-MM-dd"));
    }
  }, [editingTransaction, reset, setValue, categories]);

  const onSubmit = async (data) => {
    await onSave({
      ...data,
      frequency,
      id: editingTransaction ? editingTransaction.id : `rt${Date.now()}`,
    });
    reset();
    onOpenChange(false);
  };

  const handleDelete = async () => {
    if (editingTransaction && onDelete) {
      await onDelete(editingTransaction.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {editingTransaction
              ? "Edit Recurring Transaction"
              : "Add New Recurring Transaction"}
          </DialogTitle>
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-md flex items-center gap-2 mt-2">
            <span className="text-lg">💡</span>
            <p className="text-sm">
              Recurring transactions help you automate your finances. Set them
              up once, and they will be added automatically.
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-2">
            <div className="text-sm font-medium">Title</div>
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

          <div className="space-y-2">
            <div className="text-sm font-medium">Amount</div>
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

          {!editingTransaction && (
            <>
              <div className="space-y-2">
                <div className="text-sm font-medium">Type</div>
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

              <div className="space-y-2">
                <div className="text-sm font-medium">Category</div>
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
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="space-y-2">
            <div className="text-sm font-medium">Frequency</div>
            <TestSelect />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Next Due Date</div>
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
            <div className="text-sm font-medium">Auto-Add</div>
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
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading
                  ? editingTransaction
                    ? "Updating..."
                    : "Adding..."
                  : editingTransaction
                    ? "Update"
                    : "Add"}{" "}
                Recurring Transaction
                {console.log(isLoading)}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RecurringTransactionModal;
