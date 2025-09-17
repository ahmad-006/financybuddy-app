import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { format } from "date-fns";
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
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function TransactionModal({
  open,
  onOpenChange,
  onSave,
  editingTransaction,
  onDelete,
  isLoading,
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const transactionType = watch("type");

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
    // This effect handles setting form values when the modal opens
    if (open) {
      if (editingTransaction) {
        setValue("title", editingTransaction.title || "");
        setValue("amount", editingTransaction.amount);
        setValue("category", editingTransaction.category?.toLowerCase());
        setValue("type", editingTransaction.type?.toLowerCase());
        setValue(
          "budgetType",
          editingTransaction.budgetType?.toLowerCase() || "monthly"
        );
        if (editingTransaction.date) {
          try {
            setValue(
              "date",
              format(new Date(editingTransaction.date), "yyyy-MM-dd")
            );
          } catch (e) {
            console.error("Error formatting date:", e);
            setValue("date", format(new Date(), "yyyy-MM-dd"));
          }
        }
      } else {
        // Explicitly reset the form for a new transaction
        reset({
          date: format(new Date(), "yyyy-MM-dd"),
          type: "expense",
          budgetType: "monthly",
          title: "",
          amount: "",
          category: "",
        });
      }
    }
  }, [editingTransaction, open, reset, setValue]);

  useEffect(() => {
    // This effect reacts to user changing the transaction type
    if (transactionType === "saving") {
      setValue("category", "savings");
      setValue("budgetType", "none");
    }
  }, [transactionType, setValue]);

  const onSubmit = async (data) => {
    try {
      await onSave(data);
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save transaction:", error);
    }
  };

  const handleDelete = async () => {
    if (editingTransaction && onDelete) {
      await onDelete(editingTransaction._id);
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {editingTransaction ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md flex items-center gap-2 mt-2">
            <span className="text-lg">💡</span>
            <p className="text-sm">
              For accurate tracking, please use the exact budget name (e.g., "Gas Bill", "Netflix Subscription") for your transactions.
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-2">
            <div className="text-sm font-medium">Title</div>
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="e.g., Coffee, Rent, Salary"
              readOnly={!!editingTransaction}
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
              {...register("amount", {
                required: "Amount is required",
                valueAsNumber: true,
              })}
              type="number"
              step="0.01"
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Type</div>
            <Controller
              name="type"
              control={control}
              rules={{ required: "Type is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="saving">Saving</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Category</div>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!!editingTransaction || transactionType === "saving"}
                >
                  <SelectTrigger
                    className={errors.category ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72 overflow-y-auto">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
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

          <div className="space-y-2">
            <div className="text-sm font-medium">Budget Type</div>
            <Controller
              name="budgetType"
              control={control}
              rules={{ required: "Budget Type is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={transactionType === "saving"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="special">Special</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.budgetType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.budgetType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Date</div>
            <Input
              {...register("date", { required: "Date is required" })}
              type="date"
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between pt-4">
            <div>
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
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (editingTransaction ? "Updating..." : "Adding...") : (editingTransaction ? "Update" : "Add")} Transaction
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
