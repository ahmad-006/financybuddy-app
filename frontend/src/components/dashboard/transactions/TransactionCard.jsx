import { format, formatDistanceToNow, isToday } from "date-fns";

export default function TransactionCard({ transaction, onEdit, onDelete }) {
  const isIncome = transaction.type === "income";
  const isSaving = transaction.type === "saving";

  const bgColor = isSaving
    ? "bg-blue-100"
    : isIncome
      ? "bg-green-100"
      : "bg-red-100";
  const borderColor = isSaving
    ? "border-blue-300"
    : isIncome
      ? "border-green-300"
      : "border-red-300";
  const amountColor = isSaving
    ? "text-blue-700"
    : isIncome
      ? "text-green-700"
      : "text-red-700";
  const iconBg = isSaving
    ? "bg-blue-500"
    : isIncome
      ? "bg-green-500"
      : "bg-red-500";

  const formatTransactionDate = (dateString) => {
    if (!dateString) return "";

    try {
      let date;
      // The previous fix was too aggressive. This is more robust.
      // It handles both date-only strings and full ISO strings correctly.
      if (dateString.includes("T")) {
        date = new Date(dateString); // For full ISO strings
      } else {
        // For 'YYYY-MM-DD' strings, this prevents timezone issues.
        const [year, month, day] = dateString.split("-").map(Number);
        date = new Date(year, month - 1, day);
      }

      // Check if the created date is valid
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      return {
        full: format(date, "MMMM d, yyyy"), // Changed format to full month name
        relative: isToday(date)
          ? "Today"
          : formatDistanceToNow(date, { addSuffix: true }),
      };
    } catch (error) {
      console.error(`Failed to format date '${dateString}':`, error.message);
      return { full: dateString, relative: "Invalid Date" };
    }
  };

  const dateInfo = formatTransactionDate(transaction.date);

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      food: "🍕",
      shopping: "🛒",
      travel: "✈️",
      salary: "💰",
      rent: "🏠",
      utilities: "💡",
      entertainment: "🎬",
      transportation: "🚗",
      healthcare: "🏥",
      default: isIncome ? "💰" : "💸",
    };

    const lowerCategory = category?.toLowerCase() || "";
    return categoryIcons[lowerCategory] || categoryIcons.default;
  };

  return (
    <div
      className={`w-full ${bgColor} ${borderColor} p-3 sm:p-4 rounded-lg border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:shadow-md hover:scale-[1.01] transition-all duration-200`}
    >
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div
          className={`${iconBg} w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0`}
        >
          {getCategoryIcon(transaction.category)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 truncate">
            {transaction.title}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-gray-600 capitalize ">
              {transaction.category}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${isIncome ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} capitalize whitespace-nowrap`}
            >
              {transaction.type}
            </span>
            {transaction.budgetType && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize whitespace-nowrap">
                {transaction.budgetType}
              </span>
            )}
            {transaction.date && (
              <span
                className="text-xs text-gray-600 whitespace-nowrap "
                title={dateInfo.full}
              >
                {dateInfo.relative}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-2 sm:gap-3">
        <div className="text-right min-w-0">
          <p
            className={`font-bold text-base sm:text-lg ${amountColor} whitespace-nowrap`}
          >
            PKR {transaction.amount?.toLocaleString()}
          </p>
          {transaction.date && (
            <p className="text-xs text-gray-500 mt-1 hidden md:block">
              {dateInfo.full}
            </p>
          )}
        </div>

        {(onEdit || onDelete) && (
          <div className="flex gap-2 sm:gap-3 ml-2">
            {onEdit && (
              <button
                onClick={() => onEdit(transaction)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex-shrink-0"
                aria-label="Edit transaction"
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
