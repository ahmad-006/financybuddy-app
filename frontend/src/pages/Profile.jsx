import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { AvatarSelectionModal } from "@/components/profile/AvatarSelectionModal";
import { toast } from "react-toastify";

import { ResetPasswordModal } from "@/components/profile/ResetPasswordModal";
import {
  fetchUser,
  resetPassword,
  updateUser,
  fetchTransactions,
} from "@/utils/fetchData";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: transactionsData } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const transactions = transactionsData?.transactions || [];

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalSpending = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalSavings = transactions
    .filter((t) => t.type === "saving")
    .reduce((sum, t) => sum + t.amount, 0);
  const numberOfTransactions = transactions.length;

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const res = await fetchUser();
        setUser(res);

        if (res?.name) {
          const nameParts = res.name.split(" ");
          setValue("firstName", nameParts[0] || "");
          setValue("lastName", nameParts[1] || "");
        }
        setValue("avatar", res?.avatar);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to fetch user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [setValue]);

  const handleAvatarSelect = async (newAvatarUrl) => {
    setValue("avatar", newAvatarUrl);
    setModalOpen(false);
  };

  const handleSaveChanges = async (data) => {
    setIsSaving(true);
    const { firstName, lastName, avatar } = data;
    const name = `${firstName} ${lastName}`;
    const updatedUser = { ...user, name, avatar };
    try {
      await updateUser(updatedUser);
      toast.success("Changes Saved!");
    } catch (error) {
      toast.error(error.message || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetPassword = async (data) => {
    setIsChangingPass(true);

    const { oldPassword, newPassword } = data;
    const passwordData = { oldPassword, newPassword };
    try {
      await resetPassword(passwordData);
      toast.success("Password Changed Successfully");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsChangingPass(false);
      setResetPasswordModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-100 text-gray-900">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 sm:p-4 mb-6 rounded-md">
        <p className="font-bold">Profile Management</p>
        <p className="text-sm">
          Manage your personal information and financial overview here. Update
          your name and profile picture, view your email and membership date,
          and reset your password. Get a quick glance at your total income,
          spending, and savings, along with your transaction count.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Financial Summary (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Financial Summary
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-lg font-semibold text-blue-700">
                  PKR {totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Total Spending</p>
                <p className="text-lg font-semibold text-red-700">
                  PKR {totalSpending.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Total Savings</p>
                <p className="text-lg font-semibold text-green-700">
                  PKR {totalSavings.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Number of Transactions</p>
                <p className="text-lg font-semibold text-gray-700">
                  {numberOfTransactions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: User Profile and Form (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">
              User Profile
            </h1>

            <div className="flex flex-col md:flex-row gap-6">
              {isLoading ? (
                <div className="flex items-center justify-center w-full h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <>
                  {/* Avatar Section */}
                  <div className="md:w-1/3">
                    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-200">
                          <img
                            src={watch("avatar")}
                            alt={`${user.name}'s avatar`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-transparent border-gray-300 hover:bg-gray-200"
                          >
                            Change Avatar
                          </Button>
                        </DialogTrigger>
                      </div>

                      <AvatarSelectionModal onAvatarSelect={handleAvatarSelect} />
                    </Dialog>
                  </div>

                  {/* Profile Form */}
                  <div className="md:w-2/3">
                    <form
                      onSubmit={handleSubmit(handleSaveChanges)}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            {...register("firstName", {
                              required: "First name is required",
                            })}
                            className="bg-gray-50 border-gray-300 text-gray-900"
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            {...register("lastName")}
                            className="bg-gray-50 border-gray-300 text-gray-900"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={user.email || ""}
                          readOnly
                          className="bg-gray-50 border-gray-300 text-gray-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="memberSince">Member Since</Label>
                        <Input
                          id="memberSince"
                          value={
                            user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString()
                              : ""
                          }
                          readOnly
                          className="bg-gray-50 border-gray-300 text-gray-900"
                        />
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button
                          type="button"
                          className="bg-blue-600 hover:bg-blue-700 text-white mr-4"
                          onClick={() => setResetPasswordModalOpen(true)}
                        >
                          Reset Password
                        </Button>
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          disabled={isSaving}
                        >
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          onOpenChange={setResetPasswordModalOpen}
          onSave={handleResetPassword}
          loading={isChangingPass}
        />
      )}
    </div>
  );
}
