import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../layouts/AuthLayout";
import FormField from "../components/custom/FormField";
import { Button } from "../components/ui/button";
import { AuthApi } from "../api/auth.api";
import toast from "react-hot-toast";
import { store } from "../app/store/store";
import { setCredentials } from "../app/slices/auth.slice";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await AuthApi.login(data);
      if(result){
        store.dispatch(setCredentials(result.user))
      }
      toast.success(result.message);

      navigate("/dashboard"); 
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue managing your tasks">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/" className="text-accent font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;