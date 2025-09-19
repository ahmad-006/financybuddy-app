import React, { useState } from "react";
import { Plus, DollarSign } from "lucide-react";
import AddSavingModal from "../components/dashboard/savings/AddSavingModal";
import SavingCard from "../components/dashboard/savings/SavingCard";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTransaction,
  deleteTransaction,
  fetchTransactions,
  updateTransaction,
} from "@/utils/fetchData";

export default function SavingsPage() {
  const [open, setOpen] = useState(false);
  const [editingSaving, setEditingSaving] = useState(null);

  const queryClient = useQueryClient();

  //initial fetch using react query
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const savings =
    transactions?.transactions?.filter((t) => t.type === "saving") || [];

  // mutation functions declaration (update,add,delete)
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        exact: true,
      });
      toast.success("Saving deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete transaction");
    },
  });

  const addMutation = useMutation({
    mutationFn: (data) => addTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        exact: true,
      });
      toast.success("Saving added successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        exact: true,
      });
      toast.success("Saving updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update transaction");
    },
  });

  const totalSavings = Array.isArray(savings)
    ? savings.reduce((sum, s) => sum + s.amount, 0)
    : 0;
  const savingsThisMonth = Array.isArray(savings)
    ? savings
        .filter((s) => {
          const savingDate = new Date(s.date);
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          return (
            savingDate.getMonth() === currentMonth &&
            savingDate.getFullYear() === currentYear
          );
        })
        .reduce((sum, s) => sum + s.amount, 0)
    : 0;

  const handleAddNew = () => {
    setEditingSaving(null);
    setOpen(true);
  };

  const handleEdit = (saving) => {
    setEditingSaving(saving);
    setOpen(true);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleSave = (data) => {
    if (editingSaving) {
      const id = editingSaving._id;
      // update
      updateMutation.mutate({ id, data });
    } else {
      //adding
      addMutation.mutate({
        ...data,
        budgetType: "none",
        type: "saving",
        category: "savings",
      });
    }

    setOpen(false);
    setEditingSaving(null);
  };

  //handling modal close button
  const handleModalClose = () => {
    setOpen(false);
    setEditingSaving(null);
  };

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 bg-gray-50 text-gray-900 min-h-screen">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 sm:p-4 mb-6 rounded-md">
        <p className="font-bold">Savings Tracker</p>
        <p className="text-sm">
          Track your progress towards your savings goals. Monitor contributions
          and see how close you are to reaching your targets.
        </p>
      </div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Savings</h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Saving
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Savings</p>
            <p className="text-3xl font-bold text-blue-900">
              PKR {totalSavings.toLocaleString()}
            </p>
          </div>
          <DollarSign className="w-10 h-10 text-blue-400" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">This Month</p>
            <p className="text-3xl font-bold text-green-900">
              +PKR {savingsThisMonth.toLocaleString()}
            </p>
          </div>
          <DollarSign className="w-10 h-10 text-green-400" />
        </div>
      </div>

      {/* Savings History List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">History</h2>
        {savings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 mb-4">
              <DollarSign className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No savings entries yet
            </h3>
            <p className="text-gray-500 max-w-xs">
              Click "Add Saving" to start tracking your progress.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {savings
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((saving) => (
                <SavingCard
                  key={saving._id}
                  saving={saving}
                  onEdit={handleEdit}
                  currency={"PKR"}
                />
              ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <AddSavingModal
          onClose={handleModalClose}
          onSave={handleSave}
          editingSaving={editingSaving}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
