"use client";

import Navbar from "@/components/navbar";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [loading, setLoading] = useState(false);
    async function resendEmail() {
        if (!email) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/resend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }

        } catch {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            {/* Dashed Top Left Fade Grid */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)
      `,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 0",
                    maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
      `,
                    WebkitMaskImage: `
  repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
      `,
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in",
                }}
            />
            <div>
                <Navbar />
                <div className="w-105 rounded-lg p-8 relative z-20 bg-black text-white">



                    <h1 className="text-2xl font-bold text-center mt-6">
                        Check your email
                    </h1>

                    <p className="text-center text-stone-400 mt-4">

                        We have sent a verification link to

                    </p>

                    <p className="text-center font-medium mt-2 break-all">

                        {email}

                    </p>

                    <p className="text-center text-sm text-stone-500 mt-6">

                        Click the verification link in your inbox to activate your account.

                    </p>

                    <button
                        onClick={resendEmail}
                        disabled={loading}
                        className="mt-8 w-full text-black border border-[#dadada] bg-white px-2 py-2 rounded-lg text-[15px] font-medium cursor-pointer"
                    >
                        {loading
                            ? "Sending..."
                            : "Resend Verification Email"}
                    </button>

                    <button
                        onClick={() => router.push("/signin")}
                        className="mt-3 w-full rounded-lg border border-white px-3 py-2 text-[15px] font-medium cursor-pointer"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>

    );
}