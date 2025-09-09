import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Plus, FileText } from "lucide-react";
import TransactionModal from "../components/dashboard/transactions/TransactionModal";
import TransactionCard from "../components/dashboard/transactions/TransactionCard";
import { mockTransactions } from "../data/data";
import TransactionFilterBar from "../components/dashboard/transactions/FilterBar";
import { calcSpending } from "../utils/helperFuncs";

// Main Transactions Page
export default function Transactions() {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    category: "",
    sortBy: "latest",
    minPrice: "",
    maxPrice: "",
    priceSort: "",
  });

  useEffect(() => {
    setTransactions(mockTransactions);
    calcSpending([{ category: "food" }], "food");
  }, []);

  // Filter transactions based on filter criteria and sort by date (latest first)
  const filteredTransactions = transactions
    .filter((transaction) => {
      // 1. Check if search filter matches
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const categoryLower = transaction.category.toLowerCase();
        if (!categoryLower.includes(searchLower)) {
          return false;
        }
      }

      // 2. Check if type filter matches
      if (filters.type && filters.type !== "all") {
        if (transaction.type !== filters.type) {
          return false;
        }
      }

      // 3. Check if category filter matches
      if (filters.category && filters.category !== "all") {
        const categoryLower = transaction.category.toLowerCase();
        if (categoryLower !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // 4. Check if price filter matches
      if (filters.minPrice && transaction.amount < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && transaction.amount > filters.maxPrice) {
        return false;
      }

      // if all matches
      return true;
    })
    .sort((a, b) => {
      if (filters.minPrice || filters.maxPrice) {
        return a.amount - b.amount;
      }
      if (filters.priceSort === "price-asc") {
        return a.amount - b.amount; // Lowest price first
      } else if (filters.priceSort === "price-desc") {
        return b.amount - a.amount;
      } else {
        // Default to sorting by date
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (filters.sortBy === "oldest") {
          return dateA - dateB; // Oldest dates first
        } else {
          return dateB - dateA; // Latest dates first (default)
        }
      }
    });

  // FUNCTIONS
  const handleAdd = (data) => {
    const { amount, category, date, type } = data;
    setTransactions([
      ...transactions,
      {
        ...data,
        id: `t${transactions.length + 1}`,
      },
    ]);

    mockTransactions.push({
      id: `t${mockTransactions.length + 1}`,
      userId: "u1",
      title: category,
      type,
      amount,
      category,
      date,
    });
    console.log(mockTransactions);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setOpen(true);
  };

  const handleUpdate = (data) => {
    console.log(mockTransactions);
    setTransactions(
      transactions.map((t) =>
        t.id === editingTransaction.id ? { ...t, ...data } : t
      )
    );

    const editIndex = mockTransactions.findIndex(
      (t) => t.id === editingTransaction.id
    );

    if (editIndex !== -1) {
      mockTransactions[editIndex] = {
        ...mockTransactions[editIndex],
        ...data,
      };
    }
    console.log(mockTransactions);
    setEditingTransaction(null);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleSave = (data) => {
    if (editingTransaction) {
      handleUpdate(data);
    } else {
      handleAdd(data);
    }
  };

  const handleModalClose = () => {
    setOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="relative p-4 bg-white text-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {filteredTransactions.length}{" "}
            {filteredTransactions.length === 1 ? "transaction" : "transactions"}
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <TransactionFilterBar filters={filters} setFilters={setFilters} />

      {/* Empty State or Transaction List */}
      {filteredTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border border-gray-300">
              <FileText className="h-10 w-10 text-blue-600" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gray-100 rounded-full p-1 border border-gray-300">
              <Plus className="h-4 w-4 text-blue-600" />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2">
            {transactions.length === 0
              ? "No transactions yet"
              : "No matching transactions"}
          </h2>
          <p className="text-gray-600 max-w-xs mb-8">
            {transactions.length === 0
              ? "Start tracking your finances by adding your first transaction"
              : "Try adjusting your search or filters to find what you're looking for"}
          </p>

          <Button
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      ) : (
        <>
          {/* Transaction List */}
          <div className="space-y-3">
            {filteredTransactions.map((t) => (
              <TransactionCard
                key={t.id}
                transaction={t}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Floating + Button if modal is not open */}
          {!open && (
            <Button
              className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700"
              onClick={() => setOpen(true)}
            >
              <Plus />
            </Button>
          )}
        </>
      )}

      {/* Modal */}
      <TransactionModal
        open={open}
        onOpenChange={handleModalClose}
        onSave={handleSave}
        onDelete={handleDelete}
        editingTransaction={editingTransaction}
      />
    </div>
  );
}
