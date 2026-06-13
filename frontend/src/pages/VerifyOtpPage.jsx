import React, { useState, useRef, useEffect } from "react";
import { ShipWheelIcon } from "lucide-react";
import { useVerifyOtp } from "../hooks/auth.hook";

const OTP_LENGTH = 6;

const VerifyOtpPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);

  const { isPending, error, verifyOtpMutation } = useVerifyOtp();

  useEffect(() => {
    // Lấy email từ localStorage (đã được lưu khi đăng ký thành công)
    const storedEmail = localStorage.getItem("email") || "";
    setEmail(storedEmail);

    // Auto-focus ô input đầu tiên khi component mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Chỉ cho phép nhập 1 chữ số
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus ô tiếp theo
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Auto-submit khi đã nhập đủ 6 số
    if (value && index === OTP_LENGTH - 1) {
      const fullOtp = newOtp.join("");
      if (fullOtp.length === OTP_LENGTH) {
        verifyOtpMutation({ email, otp: fullOtp });
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Nhấn Backspace: Xóa ô hiện tại và focus về ô trước đó
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Chỉ xử lý nếu chuỗi copy/paste là chuỗi số
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, OTP_LENGTH).split("");
    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);

    // Tìm ô trống tiếp theo hoặc ô cuối cùng để focus
    const focusIndex = Math.min(digits.length, OTP_LENGTH - 1);
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }

    // Tự động submit nếu chuỗi paste có đủ 6 ký tự
    if (digits.length >= OTP_LENGTH) {
      const fullOtp = newOtp.join("");
      verifyOtpMutation({ email, otp: fullOtp });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length === OTP_LENGTH) {
      verifyOtpMutation({ email, otp: fullOtp });
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="dracula"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/images/Chat-amico.png"
                alt="OTP Verification"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Verify Your Email</h2>

              <p className="opacity-70">
                Enter the verification code sent to your email to activate your
                account.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          {/* LOGO */}
          <div className="mb-6 flex items-center gap-2">
            <ShipWheelIcon className="size-9 text-primary" />

            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message || error.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Verify your email</h2>

              <p className="text-sm opacity-70 mt-2">
                We've sent a 6-digit verification code to{" "}
                {email ? (
                  <span className="font-semibold text-primary">{email}</span>
                ) : (
                  "your email address"
                )}
                .
              </p>
            </div>

            {/* OTP INPUTS */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="input input-bordered w-14 h-14 text-center text-xl font-bold"
                  disabled={isPending}
                />
              ))}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending || otp.join("").length < OTP_LENGTH}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </button>

            {/* RESEND */}
            <div className="text-center">
              <p className="text-sm opacity-70">Didn't receive the code?</p>

              <p className="text-xs opacity-50 mt-1">
                Please go back to signup and try again.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
