import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useVerification } from "../hooks/useVerification";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const {otp,inputRefs, canResend,resendLoading,verifyLoading,handleChange,
    handleKeyDown,verifyOtp,resendOtp,formatTime } = useVerification(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await verifyOtp();
    if (success) {
      navigate("/login", {replace: true});
    }
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We sent a 5-digit code to your email address"
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="flex gap-3 justify-center">
          {otp.map((digit, i) => (
            <Input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-heading font-semibold bg-secondary/50 border-border focus-visible:ring-ring"
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={verifyLoading}
          className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        >
          {verifyLoading ? "Verifying..." : "Verify & Continue"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          {!canResend ? (
            <p>Resend code in {formatTime()}</p>
          ) : (
            <button
              type="button"
              onClick={resendOtp}
              disabled={resendLoading}
              className="text-accent font-medium hover:underline"
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>

      </form>
    </AuthLayout>
  );
};

export default VerifyOtp;