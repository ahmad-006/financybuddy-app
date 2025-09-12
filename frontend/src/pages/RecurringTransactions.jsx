import React, { useState } from "react";
import { Plus } from "lucide-react";
import RecurringTransactionModal from "../components/dashboard/transactions/RecurringTransactionModal";
import RecurringTransactionCard from "../components/dashboard/transactions/RecurringTransactionCard";
import {
  addRecurringTransaction,
  deleteRecurringTransaction,
  fetchRecurringTransactions,
  updateRecurringTransaction,
} from "@/utils/fetchData";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RecurringTransactions = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingRecurringTransaction, setEditingRecurringTransaction] =
    useState(null);

  const queryClient = useQueryClient();

  // Fetch recurring transactions
  const { data: transactions, error: fetchError } = useQuery({
    queryKey: ["recurringTransactions"],
    queryFn: fetchRecurringTransactions,
  });

  if (fetchError)
    toast.error(fetchError?.message || "Error fetching transactions");

  // Normalize id
  const recurringTransactions =
    transactions?.transactions.map((t) => ({
      ...t,
      id: t.id || t._id,
    })) || [];

  // Mutations
  const addMutation = useMutation({
    mutationFn: (data) => addRecurringTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurringTransactions"] });
      toast.success();
    },

    onError: (err) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateRecurringTransaction(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recurringTransactions"] }),
    onError: (err) =>
      toast.error(err.message || "Failed to update transaction"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteRecurringTransaction(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recurringTransactions"] }),
    onError: (err) =>
      toast.error(err.message || "Failed to delete transaction"),
  });

  // Save handler
  const handleSaveRecurringTransaction = (transactionData) => {
    const { title, amount, type, category, frequency, nextDate, isActive } =
      transactionData;

    const data = {
      title,
      amount,
      type,
      category: category.toLowerCase(),
      frequency: frequency.toLowerCase(),
      nextDate,
      isActive,
    };
    console.log(data);

    if (editingRecurringTransaction?.id) {
      updateMutation.mutate({ id: editingRecurringTransaction.id, data });
    } else {
      addMutation.mutate(data);
    }

    setShowModal(false);
    setEditingRecurringTransaction(null);
  };

  // Edit handler
  const handleEditRecurringTransaction = (transaction) => {
    setEditingRecurringTransaction(transaction);
    setShowModal(true);
  };

  const handlePauseRecurringTransaction = (isActive, id) => {
    updateMutation.mutate({ id, data: { isActive: !isActive } });
  };

  const handleDeleteRecurringTransaction = (id) => {
    deleteMutation.mutate(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRecurringTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md">
        <p className="font-bold">Recurring Transactions Management</p>
        <p>
          Automate your finances by managing recurring transactions. This page
          is for expenses and incomes that happen regularly, like monthly
          subscriptions (Netflix, Spotify), weekly allowances, or regular bill
          payments. By setting them up here, the application can automatically
          add them to your transaction list on the scheduled date, so you don't
          have to enter them manually every time. You can also pause or resume
          them as needed. This gives you a more accurate picture of your future
          cash flow.
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Recurring Transactions
          </h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <Plus className="inline-block w-5 h-5 mr-2" />
            Add New
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recurringTransactions.map((transaction) => (
            <RecurringTransactionCard
              key={transaction.id}
              transaction={transaction}
              onEdit={handleEditRecurringTransaction}
              onPause={(isActive) =>
                handlePauseRecurringTransaction(isActive, transaction.id)
              }
              onDelete={handleDeleteRecurringTransaction}
            />
          ))}
        </div>

        {showModal && (
          <RecurringTransactionModal
            onClose={handleCloseModal}
            onSave={handleSaveRecurringTransaction}
            editingTransaction={editingRecurringTransaction}
            onDelete={handleDeleteRecurringTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default RecurringTransactions;
