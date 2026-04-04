import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { AuthApi } from "../api/auth.api";
import toast from "react-hot-toast";

const OTP_LENGTH = 5;
const RESEND_TIME = 60; 

const VerifyOtp = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");

  const [timer, setTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ⏱️ TIMER EFFECT
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔢 HANDLE INPUT CHANGE
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setError("");

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ⌫ HANDLE BACKSPACE
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ✅ VERIFY OTP
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length < OTP_LENGTH) {
      setError("Please enter the full 6-digit code");
      return;
    }

    try {
      const result = await AuthApi.verifyOtp(code)
      toast.success(result.message)
      navigate("/");
    } catch (err) {
      setError("Invalid OTP. Try again.");
    }
  };

  // 🔁 RESEND OTP
  const handleResendOtp = async () => {
    try {
      const result = await AuthApi.resendOtp()
      toast.success(result.message)

      setOtp(Array(OTP_LENGTH).fill(""));
      setError("");

      // restart timer
      setTimer(RESEND_TIME);
      setCanResend(false);

      // focus first input
      inputRefs.current[0]?.focus();
    } catch (err) {
      console.error(err);
    }
  };

  // ⏱️ FORMAT TIMER
  const formatTime = (time: number) => {
    const seconds = time % 60;
    return `00:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We sent a 6-digit code to your email address"
    >
      <form onSubmit={handleVerify} className="space-y-6">

        {/* OTP INPUTS */}
        <div className="flex gap-3 justify-center">
          {otp.map((digit, i) => (
            <Input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-12 h-14 text-center text-xl font-heading font-semibold bg-secondary/50 border-border focus-visible:ring-ring ${
                error ? "border-destructive" : ""
              }`}
            />
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-xs text-destructive text-center">{error}</p>
        )}

        {/* VERIFY BUTTON */}
        <Button
          type="submit"
          className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        >
          Verify & Continue
        </Button>

        {/* TIMER / RESEND */}
        <div className="text-center text-sm text-muted-foreground">
          {!canResend ? (
            <p>Resend code in {formatTime(timer)}</p>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-accent font-medium hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

      </form>
    </AuthLayout>
  );
};

export default VerifyOtp;