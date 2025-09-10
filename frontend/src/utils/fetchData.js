import axios from "axios";

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
  const res = await axios.get("http://localhost:8000/api/v1/monthlyBudgets");
  if (!res.data) throw new Error("No monthly budgets found");

  return res.data.data;
};
// Add a new Budget
const addMonthlyBudget = async (data) => {
  const res = await axios.post(
    "http://localhost:8000/api/v1/monthlyBudgets",
    data
  );
  if (!res.data) throw new Error("Failed to add transaction");
  return res.data.data; // Corrected path
};

// Update a Budget
const updateMonthlyBudget = async (id, data) => {
  const res = await axios.patch(
    `http://localhost:8000/api/v1/monthlyBudgets/${id}`,
    data
  );
  if (!res.data) throw new Error("Failed to update transaction");
  return res.data.data; // Corrected path
};

// Delete a Budget
const deleteMonthlyBudget = async (id) => {
  await axios.delete(`http://localhost:8000/api/v1/monthlyBudgets/${id}`);
  return id; // return the deleted ID to update cache
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
};
