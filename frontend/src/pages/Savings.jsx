import React, { useState, useEffect } from "react";
import { Plus, DollarSign } from "lucide-react";
import AddSavingModal from "../components/dashboard/savings/AddSavingModal";
import SavingCard from "../components/dashboard/savings/SavingCard";

import axios from "axios";
import { toast } from "react-toastify";

export default function SavingsPage({ userId = "u1" }) {
  const [open, setOpen] = useState(false);
  const [savings, setSavings] = useState([]);
  const [editingSaving, setEditingSaving] = useState(null);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    const fetchSavings = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/transactions");

      const { transactions } = res.data.data;
      console.log(transactions);
      console.log(transactions.filter((t) => t.type === "saving"));
      setSavings(transactions.filter((t) => t.type === "saving"));
      console.log(savings);
    };
    fetchSavings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasChanged]);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/transactions/${id}`);
      setSavings((prevSavings) => prevSavings.filter((s) => s._id !== id));
      setHasChanged((t) => !t);
      toast.success("Saving Deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingSaving) {
        const updateID = editingSaving._id;
        const res = await axios.patch(
          `http://localhost:8000/api/v1/transactions/${updateID}`,
          data
        );
        const updatedTransaction = res.data.data.transaction;
        setSavings((prevSavings) =>
          prevSavings.map((s) =>
            s._id === updateID ? updatedTransaction : s
          )
        );
        toast.success("Saving Edited");
      } else {
        // Add
        const res = await axios.post(
          `http://localhost:8000/api/v1/transactions`,
          { ...data, budgetType: "none", type: "saving", category: "saving" }
        );
        const newSaving = res.data.data.transaction;
        setSavings((prevSavings) => [...prevSavings, newSaving]);
        toast.success("Saving Added");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOpen(false);
      setHasChanged((t) => !t);
      setEditingSaving(null);
    }
  };

  const handleModalClose = () => {
    setOpen(false);
    setEditingSaving(null);
  };

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 bg-gray-50 text-gray-900 min-h-screen">
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
