import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../layouts/AuthLayout";
import { Button } from "../components/ui/button";
import FormField from "../components/custom/FormField";
import { AuthApi } from "../api/auth.api";
import toast from "react-hot-toast";

const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
    email: z.string().trim().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { name, email, password } = data;

      const result = await AuthApi.register({ name, email, password });
      toast.success(result.message)

      navigate("/verify-otp");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout title="Create an account" subtitle="Start managing your tasks today">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <FormField
          id="name"
          label="Full Name"
          placeholder="John Doe"
          {...register("name")}
          error={errors.name?.message}
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
        />

        <FormField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mt-2"
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-accent font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;