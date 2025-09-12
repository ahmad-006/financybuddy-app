import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { mockProfiles } from "@/data/data";
import { AvatarSelectionModal } from "@/components/profile/AvatarSelectionModal";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState(mockProfiles[0]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [firstName, setFirstName] = useState(user.name.split(" ")[0]);
  const [lastName, setLastName] = useState(
    user.name.split(" ").slice(1).join(" ")
  );
  const [username, setUsername] = useState(user.username);

  const handleAvatarSelect = (newAvatarUrl) => {
    setUser({ ...user, avatar: newAvatarUrl });
    setModalOpen(false);
  };

  const handleSaveChanges = () => {
    const updatedName = `${firstName} ${lastName}`;
    const updatedUser = { ...user, name: updatedName, username: username };

    // Update the mockProfiles array in memory
    const userIndex = mockProfiles.findIndex((p) => p.id === updatedUser.id);
    if (userIndex !== -1) {
      mockProfiles.splice(userIndex, 1, updatedUser);
    }

    setUser(updatedUser);
    toast.success("Chnages Saved!");
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-100 text-gray-900">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md">
        <p className="font-bold">Profile Management</p>
        <p>Manage your personal information and customize your application settings here. You can update your name, email, and profile picture. You can also set your default currency and other preferences to tailor the application to your needs.</p>
      </div>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">User Profile</h1>

        <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-200">
              <img
                src={user.avatar}
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
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-50 border-gray-300 text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-50 border-gray-300 text-gray-900"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border-gray-300 text-gray-900"
            />
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
