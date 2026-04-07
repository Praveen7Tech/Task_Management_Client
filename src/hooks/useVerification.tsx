import { useEffect, useRef, useState } from "react";
import { AuthApi } from "../api/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OTP_LENGTH = 5;
const RESEND_TIME = 60;

export const useVerification = (email: string) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const navigate = useNavigate()

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isAuthenticated = !!email;
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true }); 
    }
  }, [isAuthenticated, navigate])

  // TIMER
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

  // INPUT CHANGE
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // BACKSPACE
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // RESET
  const resetOtp = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
  };

  const resetTimer = () => {
    setTimer(RESEND_TIME);
    setCanResend(false);
  };

  const getOtpCode = () => otp.join("");

  // VERIFY OTP
  const verifyOtp = async () => {
    const code = getOtpCode();

    if (code.length < OTP_LENGTH) {
      toast.error("Please enter full 5 digit code!");
      return false;
    }

    try {
      setVerifyLoading(true);

      const result = await AuthApi.verifyOtp(email, code);
      toast.success(result.message);

      return true;
    } catch (err) {
      console.error(err)
      return false;
    } finally {
      setVerifyLoading(false);
    }
  };

  // RESEND OTP
  const resendOtp = async () => {
    try {
      setResendLoading(true);

      const result = await AuthApi.resendOtp(email);
      toast.success(result.message);

      resetOtp();
      resetTimer();
    } catch (error) {
        console.error(error)
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = () => {
    return `00:${timer.toString().padStart(2, "0")}`;
  };

  return {
    otp,
    inputRefs,
    canResend,
    resendLoading,
    verifyLoading,
    handleChange,
    handleKeyDown,
    verifyOtp,
    resendOtp,
    formatTime,
  };
};