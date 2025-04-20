import { Button } from "@/components/ui/button";
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
import { Link } from "react-router-dom";
import { useState } from "react";
import { Camera, Shield, User, Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }
  
    if (password.length <= 7) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }
  
    if (usernameError) return;
  
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      console.log(response);
      // const data = await response.json();
      // console.log(data);
  
      if (response.ok) {
        alert("Sign up successful!");
        window.location.href = "/dashboard";
      } else {
        alert( "Signup failed");
      }
    } catch (err) {
      alert("Server error");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase(); // Convert to lowercase
    setUsername(value);
    validateUsername(value);
  };

  const validateUsername = (value: string) => {
    const regex = /^[a-z_][a-z0-9_]*$/;
    if (!regex.test(value)) {
      setUsernameError('Username must start with a letter or underscore, contain only lowercase letters, numbers, and underscores.');
    } else {
      setUsernameError('');
    }
  };

  const validateEmail = (value: string) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value === confirmPassword) {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === password) {
      setPasswordError('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-surveil-dark-400">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4">
            <div className="relative">
              <Camera className="h-16 w-16 text-surveil-blue-500" />
              <Shield className="h-8 w-8 text-surveil-green-500 absolute -bottom-1 -right-1" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">SurveilX</h1>
          <p className="text-gray-400 mt-1">AI-Powered Integrated Surveillance System</p>
        </div>

        <Card className="w-full neumorph border-surveil-dark-300">
          <div>          
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create a new account to access the system</CardDescription>
          </CardHeader>
          </div>

          <form onSubmit={handleSignUp} action="/" method="POST">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                  required
                  className="bg-surveil-dark-300 border-surveil-dark-200"
                />
                {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-surveil-dark-300 border-surveil-dark-200"
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    required
                    className="bg-surveil-dark-300 border-surveil-dark-200"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-0 top-2.5 h-4 w-8 text-gray-500"
                  >
                    {isPasswordVisible ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="••••••••"
                    required
                    className="bg-surveil-dark-300 border-surveil-dark-200"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-0 top-2.5 h-4 w-8 text-gray-500"
                  >
                    {isConfirmPasswordVisible ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-surveil-blue-600 hover:bg-surveil-blue-700"
                // disabled={isLoading || usernameError || passwordError || emailError}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Signing up...
                  </>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    Sign Up
                  </>
                )}
              </Button>

              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Already have an account?</p>
                <Link to="/login" className="text-surveil-blue-400 hover:underline">
                  Login here
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2025 SurveilX. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
