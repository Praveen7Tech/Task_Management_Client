import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>

    <div className="relative">
      <Input
        id={id}
        type={inputType}
        placeholder={placeholder}
        className={`h-11 bg-secondary/50 border-border placeholder:text-muted-foreground/50 focus-visible:ring-ring ${
          error ? "border-destructive focus-visible:ring-destructive" : ""
        }`}
        {...props}
      />
      {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
    </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default FormField;