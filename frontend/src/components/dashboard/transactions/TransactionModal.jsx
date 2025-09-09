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
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { format } from "date-fns";

export default function TransactionModal({
  open,
  onOpenChange,
  onSave,
  editingTransaction,
  onDelete,
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

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
    if (editingTransaction) {
      setValue("title", editingTransaction.title || "");
      setValue("amount", editingTransaction.amount);
      setValue("category", editingTransaction.category);
      setValue("type", editingTransaction.type);
      setValue("budgetType", editingTransaction.budgetType || "monthly"); // Added budgetType

      if (editingTransaction.date) {
        try {
          const date = new Date(editingTransaction.date);
          setValue("date", format(date, "yyyy-MM-dd"));
        } catch (error) {
          setValue("date", editingTransaction.date);
          console.log(error);
        }
      }
    } else {
      setValue("date", format(new Date(), "yyyy-MM-dd"));
      setValue("title", "");
      setValue("amount", "");
      setValue("category", "");
      setValue("type", "expense");
      setValue("budgetType", "monthly"); // Default for new transactions
    }
  }, [editingTransaction, reset, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    onSave({
      ...data,
      id: editingTransaction ? editingTransaction.id : Date.now(),
    });
    reset();
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (editingTransaction && onDelete) {
      onDelete(editingTransaction.id);
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {editingTransaction ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Title Field */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Title</div>
            <Input
              type="text"
              placeholder="e.g., YouTube Premium, Rent, Salary"
              className={errors.title ? "border-red-500" : ""}
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Amount Field */}
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

          {/* Category Field */}
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
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
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

          {/* Type Field */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Type</div>
            <Controller
              name="type"
              control={control}
              rules={{ required: "Please select a type" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.type ? "border-red-500" : ""}
                  >
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
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Date Field */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Date</div>
            <Input
              type="date"
              className={errors.date ? "border-red-500" : ""}
              {...register("date", {
                required: "Date is required",
              })}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Budget Type Field */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Budget Type</div>
            <Controller
              name="budgetType"
              control={control}
              rules={{ required: "Budget Type is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.budgetType ? "border-red-500" : ""}
                  >
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

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between pt-4">
            <div>
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
              >
                {editingTransaction ? "Update" : "Add"} Transaction
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
