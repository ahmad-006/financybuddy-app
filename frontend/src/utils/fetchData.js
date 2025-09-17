/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true; // 👈 allow cookies in all requests

const baseURL = "http://localhost:8000";

// Fetch all transactions
const fetchTransactions = async () => {
  const res = await axios.get(`${baseURL}/api/v1/transactions`);
  if (!res.data) throw new Error("No transactions found");
  return res.data.data; // { data: { ... } }
};

// Add a new transaction
const addTransaction = async (data) => {
  const res = await axios.post(
    `${baseURL}/api/v1/transactions`,
    data
  );
  if (!res.data) throw new Error("Failed to add transaction");
  return res.data.data; // Corrected path
};

// Update a transaction
const updateTransaction = async (id, data) => {
  const res = await axios.patch(
    `${baseURL}/api/v1/transactions/${id}`,
    data
  );
  if (!res.data) throw new Error("Failed to update transaction");
  return res.data.data; // Corrected path
};

// Delete a transaction
const deleteTransaction = async (id) => {
  await axios.delete(`${baseURL}/api/v1/transactions/${id}`);
  return id; // return the deleted ID to update cache
};

// Fetch budgets
const fetchMonthlyBudgets = async () => {
  const res = await axios.get(`${baseURL}/api/v1/monthlyBudgets`);
  if (!res.data) throw new Error("No special budgets found");

  return res.data.data;
};
// Add a new Budget
const addMonthlyBudget = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/v1/monthlyBudgets`,
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
    `${baseURL}/api/v1/monthlyBudgets/${id}`,
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
  await axios.delete(`${baseURL}/api/v1/monthlyBudgets/${id}`);
  return id; // return the deleted ID to update cache
};

// Fetch budgets
const fetchSpecialBudgets = async () => {
  const res = await axios.get(`${baseURL}/api/v1/specialBudgets`);
  if (!res.data) throw new Error("No special budgets found");

  return res.data.data;
};
// Add a new Budget
const addSpecialBudget = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/v1/specialBudgets`,
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
    `${baseURL}/api/v1/specialBudgets/${id}`,
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
  await axios.delete(`${baseURL}/api/v1/specialBudgets/${id}`);
  return id; // return the deleted ID to update cache
};

// Fetch all recurring transactions
const fetchRecurringTransactions = async () => {
  try {
    const res = await axios.get(
      `${baseURL}/api/v1/recurringTransactions`
    );
    if (!res.data) throw new Error("No recurring transactions found");
    return res.data.data; // assuming API returns { data: [...] }
  } catch (error) {
    toast.error("Failed to fetch recurring transactions");
    return error.message;
  }
};

// Add a new recurring transaction
const addRecurringTransaction = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/v1/recurringTransactions`,
      data
    );
    if (!res.data) throw new Error("Failed to add recurring transaction");
    return res.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    return error;
  }
};

// Update a recurring transaction
const updateRecurringTransaction = async (id, data) => {
  try {
    const res = await axios.patch(
      `${baseURL}/api/v1/recurringTransactions/${id}`,
      data
    );
    if (!res.data) throw new Error("Failed to update recurring transaction");
    return res.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    return error;
  }
};

// Delete a recurring transaction
const deleteRecurringTransaction = async (id) => {
  try {
    await axios.delete(
      `${baseURL}/api/v1/recurringTransactions/${id}`
    );
    return id; // return the deleted ID for cache update
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    return error;
  }
};

// Register user (send OTP)
const registerUser = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/v1/auth/register`,
      data,
      { withCredentials: true } // important for cookies
    );
    if (!res.data) throw new Error(res.data.message);
    return res.data; // { status, message }
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    return error;
  }
};

// Verify OTP
const verifyOTP = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/v1/auth/verify-otp`,
      data,
      { withCredentials: true }
    );
    console.log(res);
    if (!res.data) throw new Error(res.data.message);
    return res.data; // { status, message }
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    return error?.response?.data?.message || error;
  }
};

// Login user
const loginUser = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/v1/auth/login`,
      data,
      { withCredentials: true }
    );
    if (!res.data) throw new Error(res.data.message);
    return res.data; // { status, message }
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    return error?.response?.data?.message || error;
  }
};

// Logout user
const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${baseURL}/api/v1/auth/signout`,
      {},
      { withCredentials: true }
    );
    if (!res.data) throw new Error(res.data.message);
    return res.data; // { status, message }
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    return error?.response?.data?.message || error;
  }
};

// Verify user (check if JWT cookie is valid)
const verifyUser = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/v1/auth/verify`, {
      withCredentials: true,
    });
    if (!res.data) throw new Error(res.data.message);
    return true; // { status, message }
  } catch (error) {
    return false;
  }
};

//! USER

const fetchUser = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/v1/users/get`, {
      withCredentials: true,
    });
    if (!res.data) throw new Error("No user data found");
    return res.data.data.user;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

const updateUser = async (data) => {
  try {
    const res = await axios.patch(
      `${baseURL}/api/v1/users/update`,
      data,
      {
        withCredentials: true,
      }
    );
    if (!res.data) throw new Error("No user data found");
    return res.data.data.user;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

const resetPassword = async (data) => {
  try {
    const res = await axios.patch(
      `${baseURL}/api/v1/users/reset-password`,
      data,
      {
        withCredentials: true,
      }
    );
    if (!res.data) throw new Error("No user data found");
    return res.data.message;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

// Send password reset link to user email
const sendPasswordResetLink = async (email) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/v1/users/forgot-password`,
      { email }
    );
    if (!res.data) throw new Error("Failed to send reset link");
    toast.success(res.data.message || "Check your email for the reset link!");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    return error;
  }
};

const resetForgotPassword = async (token, newPassword) => {
  console.log(
    `${baseURL}/api/v1/users/reset-password/${token}`,
    newPassword
  );
  try {
    const res = await axios.post(
      `${baseURL}/api/v1/users/reset-password/${token}`,
      { newPassword },
      { withCredentials: true } // in case backend uses cookies
    );

    if (!res.data) throw new Error(res);

    return res.data;
  } catch (error) {
    return error;
  }
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
  addSpecialBudget,
  fetchSpecialBudgets,
  updateSpecialBudget,
  deleteSpecialBudget,
  fetchRecurringTransactions,
  addRecurringTransaction,
  updateRecurringTransaction,
  deleteRecurringTransaction,
  registerUser,
  verifyOTP,
  loginUser,
  logoutUser,
  verifyUser,
  fetchUser,
  updateUser,
  resetPassword,
  sendPasswordResetLink,
  resetForgotPassword,
};
