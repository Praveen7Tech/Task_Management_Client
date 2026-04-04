import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>

      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`h-11 bg-secondary/50 border-border placeholder:text-muted-foreground/50 focus-visible:ring-ring ${
          error ? "border-destructive focus-visible:ring-destructive" : ""
        }`}
        {...props}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default FormField;