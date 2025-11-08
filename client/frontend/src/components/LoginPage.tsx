import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    birthdate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Temporary validation (we’ll replace this with real verification)
    if (!formData.name || !formData.password || !formData.birthdate) {
      alert("Please fill in all fields before signing in.");
      return;
    }

    console.log("Login submitted:", formData);
    // future: handle login verification here
  };

  return (
    <div className="flex h-screen">
      {/* Left side image */}
      <div className="w-1/2 bg-[url('https://static.vecteezy.com/system/resources/thumbnails/020/933/072/small/abstract-blur-gradient-background-vector.jpg')] bg-cover bg-center" />

      {/* Right side login form */}
      <div className="w-1/2 flex flex-col justify-center overflow-y-auto p-12">
        <div className="max-w-md mx-auto w-full space-y-8">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600">
            Sign in to continue your health journey.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 mt-8 text-lg"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-semibold">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-lg p-3"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-lg font-semibold"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="text-lg p-3"
                placeholder="Enter your password"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="birthdate"
                className="text-lg font-semibold"
              >
                Birthdate
              </Label>
              <Input
                id="birthdate"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleChange}
                className="text-lg p-3"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold mt-6"
            >
              Sign In
            </Button>
          </form>

          <p className="text-gray-500 text-center mt-6 text-base">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
