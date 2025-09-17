import React from "react";
import { format } from "date-fns";
import { DollarSign, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const SavingCard = ({ saving, onEdit, currency = "$" }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between hover:shadow-md hover:scale-[1.01] transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            {saving.title || "Saving Entry"}
          </p>
          <p className="text-sm text-gray-500">
            {format(new Date(saving.date), "MMMM d, yyyy")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold text-lg text-green-600">
          +{currency} {saving.amount.toLocaleString()}
        </p>
        <Button
          className="p-2 sm:p-2.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors flex-shrink-0"
          onClick={() => onEdit(saving)}
          aria-label="Edit saving"
        >
          <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SavingCard;
