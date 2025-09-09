import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Plus, FileText } from "lucide-react";
import TransactionModal from "../components/dashboard/transactions/TransactionModal";
import TransactionCard from "../components/dashboard/transactions/TransactionCard";
import TransactionFilterBar from "../components/dashboard/transactions/FilterBar";
import axios from "axios";
import { toast } from "react-toastify";

// Main Transactions Page
export default function Transactions() {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [hasChanged, setHasChanged] = useState(false);
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
    const fetching = async () => {
      setIsLoading(true); // Start loading
      try {
        const data = await axios.get(
          "http://localhost:8000/api/v1/transactions"
        );
        const { transactions } = data.data.data;
        setTransactions(transactions);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetching();
  }, [hasChanged]);

  // Filter transactions based on filter criteria and sort by date (latest first)
  const filteredTransactions = transactions
    .filter((transaction) => {
      // ... (filtering logic remains the same)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const categoryLower = transaction.category.toLowerCase();
        if (!categoryLower.includes(searchLower)) {
          return false;
        }
      }
      if (filters.type && filters.type !== "all") {
        if (transaction.type !== filters.type) {
          return false;
        }
      }
      if (filters.category && filters.category !== "all") {
        const categoryLower = transaction.category.toLowerCase();
        if (categoryLower !== filters.category.toLowerCase()) {
          return false;
        }
      }
      if (filters.minPrice && transaction.amount < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && transaction.amount > filters.maxPrice) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // ... (sorting logic remains the same)
      if (filters.minPrice || filters.maxPrice) {
        return a.amount - b.amount;
      }
      if (filters.priceSort === "price-asc") {
        return a.amount - b.amount;
      } else if (filters.priceSort === "price-desc") {
        return b.amount - a.amount;
      } else {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (filters.sortBy === "oldest") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      }
    });

  // FUNCTIONS (remain the same)
  const handleAdd = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/transactions",
        data
      );
      const newTransaction = res.data.data.transaction;
      setTransactions((prev) => [...prev, newTransaction]);
      toast.success("Transaction Added");
      setHasChanged((p) => !p);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setOpen(true);
  };

  const handleUpdate = async (data) => {
    try {
      const updateID = editingTransaction._id;
      const res = await axios.patch(
        `http://localhost:8000/api/v1/transactions/${updateID}`,
        data
      );
      const updatedTransaction = res.data.data.transaction;
      setTransactions((prev) =>
        prev.map((t) => (t._id === updateID ? updatedTransaction : t))
      );
      setEditingTransaction(null);
      toast.success("transaction updated");
      setHasChanged((p) => !p);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/transactions/${id}`
      );
      setTransactions(transactions.filter((t) => t._id !== id));
      toast.success("Transaction deleted");
      setHasChanged((p) => !p);
    } catch (error) {
      toast.error(error.message);
    }
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (filteredTransactions.length === 0) {
      return (
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
      );
    }

    return (
      <>
        <div className="space-y-3">
          {filteredTransactions.map((t) => (
            <TransactionCard
              key={t._id}
              transaction={t}
              onEdit={handleEdit}
              onDelete={() => handleDelete(t._id)}
            />
          ))}
        </div>
        {!open && (
          <Button
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700"
            onClick={() => setOpen(true)}
          >
            <Plus />
          </Button>
        )}
      </>
    );
  };

  return (
    <div className="relative p-4 bg-white text-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {!isLoading && (
              <>
                {filteredTransactions.length}{" "}
                {filteredTransactions.length === 1
                  ? "transaction"
                  : "transactions"}
              </>
            )}
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <TransactionFilterBar filters={filters} setFilters={setFilters} />

      {/* Content Area */}
      <div className="mt-6">{renderContent()}</div>

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
