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


  const { data: transactions, isLoading: isFetching, error: fetchError } = useQuery({
    queryKey: ["recurringTransactions"],
    queryFn: fetchRecurringTransactions,
  });



  //converting mongodb _id to id
  const recurringTransactions =
    transactions?.transactions?.map((t) => ({
      ...t,
      id: t.id || t._id,
    })) || [];

  // Mutations
  const addMutation = useMutation({
    mutationFn: (data) => addRecurringTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurringTransactions"] });
      toast.success("Recurring transaction added successfully");
      setShowModal(false);
      setEditingRecurringTransaction(null);
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateRecurringTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurringTransactions"] });
      toast.success("Recurring transaction updated successfully");
      setShowModal(false);
      setEditingRecurringTransaction(null);
    },
    onError: (err) =>
      toast.error(err.message || "Failed to update transaction"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteRecurringTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurringTransactions"] });
      toast.success("Recurring transaction deleted successfully");
    },
    onError: (err) =>
      toast.error(err.message || "Failed to delete transaction"),
  });

  const isPageLoading = isFetching;

  // Save handler
  const handleSaveRecurringTransaction = async (transactionData) => {
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
    if (editingRecurringTransaction?.id) {
      await updateMutation.mutateAsync({ id: editingRecurringTransaction.id, data });
    } else {
      await addMutation.mutateAsync(data);
    }
  };

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

  const handleModalOpenChange = (isOpen) => {
    if (!isOpen) {
      setShowModal(false);
      setEditingRecurringTransaction(null);
    }
  };

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Recurring Transactions
            </h1>
            <button
              disabled
              className="bg-blue-400 text-white px-3 py-2 sm:px-4 rounded-lg shadow-md cursor-not-allowed flex items-center justify-center"
            >
              <Plus className="inline-block w-5 h-5 sm:mr-2" />
              <span className="hidden sm:inline">Add New</span>
            </button>
          </div>

          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading transactions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 sm:p-4 mb-6 rounded-md">
        <p className="font-bold">Recurring Transactions Management</p>
        <p className="text-sm">
          Automate your finances by managing recurring transactions. Set up
          regular expenses and incomes to automatically add them to your
          transaction list.
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Recurring Transactions
          </h1>
          <button
            className="bg-blue-600 text-white px-3 py-2 sm:px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            onClick={() => setShowModal(true)}
          >
            <Plus className="inline-block w-5 h-5 sm:mr-2" />
            <span className="hidden sm:inline">Add New</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recurringTransactions.length > 0 ? (
            recurringTransactions.map((transaction) => (
              <RecurringTransactionCard
                key={transaction.id}
                transaction={transaction}
                onEdit={handleEditRecurringTransaction}
                onPause={(isActive) =>
                  handlePauseRecurringTransaction(isActive, transaction.id)
                }
                onDelete={handleDeleteRecurringTransaction}
                isMutating={updateMutation.isPending || deleteMutation.isPending}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No recurring transactions yet
              </h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                Click "Add New" to set up transactions that repeat
                automatically.
              </p>
            </div>
          )}
        </div>

        {showModal && (
          <RecurringTransactionModal
            onOpenChange={handleModalOpenChange}
            onSave={handleSaveRecurringTransaction}
            editingTransaction={editingRecurringTransaction}
            onDelete={handleDeleteRecurringTransaction}
            isLoading={addMutation.isPending || updateMutation.isPending || deleteMutation.isPending}
          />
        )}
      </div>
    </div>
  );
};

export default RecurringTransactions;
