import React, { useState } from "react";

import { Plus } from "lucide-react";
import RecurringTransactionModal from "../components/dashboard/transactions/RecurringTransactionModal";
import RecurringTransactionCard from "../components/dashboard/transactions/RecurringTransactionCard";

const RecurringTransactions = () => {
  const [showModal, setShowModal] = useState(false);
  const [recurringTransactions, setRecurringTransactions] = useState([
    // Dummy Data for now - This will be fetched from the database later
    {
      id: "rt1",
      title: "Netflix Subscription",
      amount: 15,
      type: "expense",
      frequency: "Monthly",
      nextDue: "2025-10-05",
      category: "Entertainment",
      autoAdd: true,
    },
    {
      id: "rt2",
      title: "Rent",
      amount: 1200,
      type: "expense",
      frequency: "Monthly",
      nextDue: "2025-10-01",
      category: "Housing",
      autoAdd: true,
    },
    {
      id: "rt3",
      title: "Salary",
      amount: 3000,
      type: "income",
      frequency: "Monthly",
      nextDue: "2025-09-30",
      category: "Income",
      autoAdd: true,
    },
  ]);
  const [editingRecurringTransaction, setEditingRecurringTransaction] =
    useState(null);

  const handleSaveRecurringTransaction = (transactionData) => {
    if (editingRecurringTransaction) {
      setRecurringTransactions((prev) =>
        prev.map((t) =>
          t.id === editingRecurringTransaction.id
            ? { ...t, ...transactionData }
            : t
        )
      );
    } else {
      setRecurringTransactions((prev) => [
        ...prev,
        { ...transactionData, id: `rt${Date.now()}` }, // Generate a temporary ID
      ]);
    }
    setShowModal(false);
    setEditingRecurringTransaction(null);
  };

  const handleEditRecurringTransaction = (transaction) => {
    setEditingRecurringTransaction(transaction);
    setShowModal(true);
  };

  const handlePauseRecurringTransaction = (id) => {
    setRecurringTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, autoAdd: !t.autoAdd } : t))
    );
  };

  const handleDeleteRecurringTransaction = (id) => {
    setRecurringTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRecurringTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 ">
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
              onPause={handlePauseRecurringTransaction}
              onDelete={handleDeleteRecurringTransaction}
            />
          ))}
        </div>

        {showModal && (
          <RecurringTransactionModal
            onClose={handleCloseModal}
            onSave={handleSaveRecurringTransaction}
            editingTransaction={editingRecurringTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default RecurringTransactions;
