import React from "react";
import { Switch } from "@/components/ui/switch"; // Assuming you have a Switch component
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

const RecurringTransactionCard = ({
  transaction,
  onEdit,
  onPause,
  onDelete,
}) => {
  const isExpense = transaction.type === "expense";
  const amountColorClass = isExpense ? "text-red-600" : "text-green-600";

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all duration-200 hover:shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-gray-900 text-lg sm:text-xl truncate pr-2">
          {transaction.title}
        </h3>
        <span
          className={`text-lg sm:text-xl font-extrabold ${amountColorClass} flex-shrink-0`}
        >
          PKR
          {isExpense ? " -" : " +"}
          {(parseFloat(transaction.amount) || 0).toFixed(2)}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-700 mb-5">
        <p>
          <strong>Frequency:</strong> {transaction.frequency}
        </p>
        <p>
          <strong>Next Due:</strong>{" "}
          {new Date(transaction.nextDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Category:</strong> {transaction.category}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center border-t border-gray-200 pt-4 mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-800">Auto-Add:</span>
          <Switch
            checked={transaction.isActive}
            onCheckedChange={() => onPause(transaction.isActive)}
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700"
            onClick={() => onEdit(transaction)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => onDelete(transaction._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecurringTransactionCard;
