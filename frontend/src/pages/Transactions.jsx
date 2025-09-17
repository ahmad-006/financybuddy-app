import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Plus, FileText } from "lucide-react";
import TransactionModal from "../components/dashboard/transactions/TransactionModal";
import TransactionCard from "../components/dashboard/transactions/TransactionCard";
import TransactionFilterBar from "../components/dashboard/transactions/FilterBar";

import { toast } from "react-toastify";
import {
  addTransaction,
  deleteTransaction,
  fetchTransactions,
  updateTransaction,
} from "@/utils/fetchData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Main Transactions Page
export default function Transactions() {
  const [open, setOpen] = useState(false);
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

  //accessing query Client
  const queryClient = useQueryClient();

  //initial fetch using react query
  const {
    data: transactions,
    isLoading,
    error: fetchError,
  } = useQuery({ queryKey: ["transactions"], queryFn: fetchTransactions });

  if (fetchError)
    toast.error(fetchError?.message || "error fetching transactions");

  //handling mutations like adding, deleting , updating
  const addMutation = useMutation({
    mutationFn: (data) => addTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        exact: true,
      });
      toast.success("Transaction added successfully");
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
      toast.success("Transaction updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update transaction");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        exact: true,
      });
      toast.success("Transaction deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete transaction");
    },
  });

  // Filter transactions based on filter criteria and sort by date (latest first)
  const filteredTransactions = (transactions?.transactions || [])
    .filter((transaction) => {
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

  // FUNCTIONS Mutating Data
  const handleAdd = async (data) => {
    addMutation.mutateAsync(data);
    
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setOpen(true);
  };

  const handleUpdate = async (data) => {
    const id = editingTransaction._id;
    updateMutation.mutateAsync({ id, data });
    setEditingTransaction(null);
  };

  const handleDelete = async (id) => {
    deleteMutation.mutateAsync(id);
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

  //rendering on the basis of conditions in Main section
  const renderContent = () => {
    //showing loading when data is being fetched
    if (isLoading) {
      return (
        <div className="min-h-screen flex justify-center items-center bg-white">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    //when there are no transactions
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
            {(transactions?.transactions || []).length === 0
              ? "No transactions yet"
              : "No matching transactions"}
          </h2>
          <p className="text-gray-600 max-w-xs mb-8">
            {(transactions?.transactions || []).length === 0
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
        <div className="space-y-3 pb-20">
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
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 sm:p-4 mb-6 rounded-md">
        <p className="font-bold">All Transactions</p>
        <p className="text-sm">
          A comprehensive list of your financial transactions. Add, edit, or filter entries by date, type, or category to understand your financial habits.
        </p>
      </div>
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
