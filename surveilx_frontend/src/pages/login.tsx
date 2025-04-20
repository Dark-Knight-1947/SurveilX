import { useState } from "react";
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
import { Camera, Shield, LogIn, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // ✅ Save token to localStorage
        localStorage.setItem("token", data.token);

        // 🔁 Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Invalid credentials");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Try again.");
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
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
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin} method="POST" action="/login">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email ID</Label>
                <Input 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required 
                  className="bg-surveil-dark-300 border-surveil-dark-200"
                />
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
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    required 
                    className="bg-surveil-dark-300 border-surveil-dark-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-2.5 text-gray-500"
                  >
                    {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
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
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
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
    </div>
  );
}
