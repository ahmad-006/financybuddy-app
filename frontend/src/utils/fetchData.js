import axios from "axios";
import { toast } from "react-toastify";

// Fetch all transactions
const fetchTransactions = async () => {
  const res = await axios.get("http://localhost:8000/api/v1/transactions");
  if (!res.data) throw new Error("No transactions found");
  return res.data.data; // assuming your API returns { data: { ... } }
};

// Add a new transaction
const addTransaction = async (data) => {
  const res = await axios.post(
    "http://localhost:8000/api/v1/transactions",
    data
  );
  if (!res.data) throw new Error("Failed to add transaction");
  return res.data.data; // Corrected path
};

// Update a transaction
const updateTransaction = async (id, data) => {
  const res = await axios.patch(
    `http://localhost:8000/api/v1/transactions/${id}`,
    data
  );
  if (!res.data) throw new Error("Failed to update transaction");
  return res.data.data; // Corrected path
};

// Delete a transaction
const deleteTransaction = async (id) => {
  await axios.delete(`http://localhost:8000/api/v1/transactions/${id}`);
  return id; // return the deleted ID to update cache
};

// Fetch budgets
const fetchMonthlyBudgets = async () => {
  const res = await axios.get("http://localhost:8000/api/v1/specialBudgets");
  if (!res.data) throw new Error("No special budgets found");

  return res.data.data;
};
// Add a new Budget
const addMonthlyBudget = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/specialBudgets",
      data
    );
    if (!res.data) throw new Error("Failed to add transaction");
    return res.data.data; // Corrected path
  } catch (error) {
    toast.error(error);
    return error;
  }
};

// Update a Budget
const updateMonthlyBudget = async (id, data) => {
  const res = await axios.patch(
    `http://localhost:8000/api/v1/specialBudgets/${id}`,
    data
  );
  if (!res.data) {
    console.log("hello");
    throw new Error("Failed to update transaction");
  }

  return res.data.data;
};

// Delete a Budget
const deleteMonthlyBudget = async (id) => {
  await axios.delete(`http://localhost:8000/api/v1/specialBudgets/${id}`);
  return id; // return the deleted ID to update cache
};

// Fetch budgets
const fetchSpecialBudgets = async () => {
  const res = await axios.get("http://localhost:8000/api/v1/specialBudgets");
  if (!res.data) throw new Error("No special budgets found");

  return res.data.data;
};
// Add a new Budget
const addSpecialBudget = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/specialBudgets",
      data
    );
    if (!res.data) throw new Error("Failed to add transaction");
    return res.data.data; // Corrected path
  } catch (error) {
    toast.error(error);
    return error;
  }
};

// Update a Budget
const updateSpecialBudget = async (id, data) => {
  const res = await axios.patch(
    `http://localhost:8000/api/v1/specialBudgets/${id}`,
    data
  );
  if (!res.data) {
    console.log("hello");
    throw new Error("Failed to update transaction");
  }

  return res.data.data;
};

// Delete a Budget
const deleteSpecialBudget = async (id) => {
  await axios.delete(`http://localhost:8000/api/v1/specialBudgets/${id}`);
  return id; // return the deleted ID to update cache
};

// Fetch current user
const fetchUser = async () => {
  const res = await axios.get("http://localhost:8000/api/v1/users/me");
  if (!res.data) throw new Error("No user found");
  return res.data.data.user; // Assuming user data is nested under data.user
};

export {
  fetchTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  fetchMonthlyBudgets,
  addMonthlyBudget,
  deleteMonthlyBudget,
  updateMonthlyBudget,
  fetchUser,
  addSpecialBudget,
  fetchSpecialBudgets,
  updateSpecialBudget,
  deleteSpecialBudget,
};
