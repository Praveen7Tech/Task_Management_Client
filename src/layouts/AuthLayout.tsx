import { CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12" style={{ background: "var(--auth-gradient)" }}>
        <div className="max-w-md text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
              <CheckSquare className="w-7 h-7 text-accent-foreground" />
            </div>
            <span className="text-3xl font-heading font-bold text-primary-foreground">TaskFlow</span>
          </div>
          <h2 className="text-2xl font-heading font-semibold text-primary-foreground mb-4">
            Manage your tasks with clarity
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Stay organized, meet deadlines, and collaborate seamlessly with your team. TaskFlow makes productivity effortless.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 text-primary-foreground/60">
            <div>
              <p className="text-3xl font-heading font-bold text-accent">2.4k+</p>
              <p className="text-sm mt-1">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-accent">50k+</p>
              <p className="text-sm mt-1">Tasks Done</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-accent">99%</p>
              <p className="text-sm mt-1">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">TaskFlow</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">{title}</h1>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
