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
      className={`w-full ${bgColor} ${borderColor} p-3 sm:p-4 rounded-lg border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`}
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
          <div className="flex gap-1 sm:gap-2 ml-2">
            {onEdit && (
              <button
                onClick={() => onEdit(transaction)}
                className="p-1.5 sm:p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors flex-shrink-0"
                aria-label="Edit transaction"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(transaction._id)}
                className="p-1.5 sm:p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors flex-shrink-0"
                aria-label="Delete transaction"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
