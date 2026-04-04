import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import AuthLayout from "../layouts/AuthLayout";
import FormField from "../components/FormField";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof registerSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof FormData;
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    navigate("/verify-otp");
  };

  return (
    <AuthLayout title="Create an account" subtitle="Start managing your tasks today">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField id="name" label="Full Name" placeholder="John Doe" value={form.name} onChange={handleChange} error={errors.name} />
        <FormField id="email" label="Email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} error={errors.email} />
        <FormField id="password" label="Password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} error={errors.password} />
        <FormField id="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
        <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mt-2">
          Create Account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
