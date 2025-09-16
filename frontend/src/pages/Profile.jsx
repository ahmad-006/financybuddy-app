import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { AvatarSelectionModal } from "@/components/profile/AvatarSelectionModal";
import { toast } from "react-toastify";

import { ResetPasswordModal } from "@/components/profile/ResetPasswordModal";
import { fetchUser, resetPassword, updateUser } from "@/utils/fetchData";
import { useForm } from "react-hook-form";

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
  const [isChangingPass, setIsChangingPass] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetchUser();
      setUser(res);

      if (res?.name) {
        const nameParts = res.name.split(" ");
        setValue("firstName", nameParts[0] || "");
        setValue("lastName", nameParts[1] || "");
      }
      setValue("username", res?.username || "");
      setValue("avatar", res?.avatar);
    };

    fetchUserData();
  }, [setValue]);

  const handleAvatarSelect = async (newAvatarUrl) => {
    setValue("avatar", newAvatarUrl);
    setModalOpen(false);
  };

  const handleSaveChanges = async (formData) => {
    setIsChangingPass(true);
    const { firstName, lastName, username, avatar } = formData;
    const name = `${firstName} ${lastName}`;
    const data = { name, username, avatar };
    try {
      const res = await updateUser(data);
      console.log(res);
      if (!res) throw new Error(res);
      toast.success("Changes Saved!");
    } catch (error) {
      console.log(error.message);
      toast.error(error);
    } finally {
      setIsChangingPass(false);
    }
  };

  const handleResetPassword = async (formData) => {
    console.log("Resetting password with data:", formData);
    const { oldPassword, newPassword } = formData;
    const data = { oldPassword, newPassword };
    try {
      const res = await resetPassword(data);
      console.log(res);
      toast.success("Password Changed Successfully");
    } catch (error) {
      toast.error(error);
    }
    setResetPasswordModalOpen(false);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-100 text-gray-900">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md">
        <p className="font-bold">Profile Management</p>
        <p>
          Manage your personal information and customize your application
          settings here. You can update your name, email, and profile picture.
          You can also set your default currency and other preferences to tailor
          the application to your needs.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">User Profile</h1>

        <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
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

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit(handleSaveChanges)}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("username", { required: "Username is required" })}
              className="bg-gray-50 border-gray-300 text-gray-900"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
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
            >
              Save Changes
            </Button>
          </div>
        </form>

        {isResetPasswordModalOpen && (
          <ResetPasswordModal
            onOpenChange={setResetPasswordModalOpen}
            onSave={handleResetPassword}
            loading={isChangingPass}
          />
        )}
      </div>
    </div>
  );
}
