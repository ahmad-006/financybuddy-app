import React from "react";
import { format } from "date-fns";
import { DollarSign, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const SavingCard = ({ saving, onEdit, currency = "$" }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
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
        <Button variant="ghost" size="icon" onClick={() => onEdit(saving)}>
          <Edit className="w-5 h-5 text-gray-500" />
        </Button>
      </div>
    </div>
  );
};

export default SavingCard;
