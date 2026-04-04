import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import AuthLayout from "../layouts/AuthLayout";
import FormField from "../components/custom/FormField";
import { Button } from "../components/ui/button";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof loginSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
   
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue managing your tasks">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField id="email" label="Email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} error={errors.email} />
        <FormField id="password" label="Password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} error={errors.password} />
        <div className="flex justify-end">
          <Link to="#" className="text-xs text-accent hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
          Sign In
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/register" className="text-accent font-medium hover:underline">Sign up</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
