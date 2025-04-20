import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserProfile() {
        const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // 👈 STEP 1 HERE

      try {
        const response = await fetch("http://localhost:5000/get-profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setEmail(data.email);
        } else {
          alert("Failed to load user profile");
        }
      } catch (error) {
        console.error(error);
        alert("Server error while fetching profile");
      }
    }

    fetchUserProfile();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setSuccessMessage("");

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    if (newPassword.length <= 7) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const resData = await response.text();

      if (response.ok) {
        setSuccessMessage("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setPasswordError(resData || "Failed to update password.");
        setTimeout(() => setPasswordError(""), 5000);
      }
    } catch (err) {
      console.error(err);
      setPasswordError("Server error. Please try again later.");
      setTimeout(() => setPasswordError(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout title="Profile" subtitle="Update your profile and change your password">
      <div className="w-full max-w-md mx-auto">
        <Card className="neumorph border-surveil-dark-300">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your profile and change your password</CardDescription>
          </CardHeader>

          <form onSubmit={handleChangePassword}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  disabled
                  className="bg-surveil-dark-300 border-surveil-dark-200 text-white opacity-100 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-surveil-dark-300 border-surveil-dark-200 text-white opacity-100 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={isPasswordVisible ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-surveil-dark-300 border-surveil-dark-200"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    className="absolute right-0 top-2.5 h-4 w-8 text-gray-500"
                  >
                    {isPasswordVisible ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={isNewPasswordVisible ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="••••••••"
                    required
                    className="bg-surveil-dark-300 border-surveil-dark-200"
                  />
                  <button
                    type="button"
                    onClick={() => setIsNewPasswordVisible((prev) => !prev)}
                    className="absolute right-0 top-2.5 h-4 w-8 text-gray-500"
                  >
                    {isNewPasswordVisible ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmNewPassword"
                    type={isConfirmNewPasswordVisible ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => {
                      setConfirmNewPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="••••••••"
                    required
                    className="bg-surveil-dark-300 border-surveil-dark-200"
                  />
                  <button
                    type="button"
                    onClick={() => setIsConfirmNewPasswordVisible((prev) => !prev)}
                    className="absolute right-0 top-2.5 h-4 w-8 text-gray-500"
                  >
                    {isConfirmNewPasswordVisible ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            </CardContent>

            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-surveil-blue-600 hover:bg-surveil-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2025 SurveilX. All rights reserved.</p>
        </div>
      </div>
    </AppLayout>
  );
}
