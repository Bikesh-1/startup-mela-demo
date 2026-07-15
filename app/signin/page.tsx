"use client"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import Navbar from "../component/navbar";
import { toast } from "sonner";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter()
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (result?.error) {
                console.log("Invalid Email or Password");
            } else {
                toast.success("Login Successful");
                router.push("/dashboard");
            }
        } catch (error) {
            console.log(error);
            setMessage("Something went wrong")

        }
    }

    return (
        <div className="min-h-screen w-full relative">
            {/* Dashed Top Left Fade Grid */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #e7e5e4 1px, transparent 1px), linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 0",
                    maskImage: `repeating-linear-gradient(to right,black 0px,black 3px,transparent 3px,transparent 8px),
                    repeating-linear-gradient(to bottom,black 0px,black 3px,transparent 3px,transparent 8px),
                    radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)`,
                    WebkitMaskImage: `repeating-linear-gradient(to right,black 0px,black 3px,transparent 3px,transparent 8px),repeating-linear-gradient(to bottom,black 0px,black 3px,transparent 3px,transparent 8px),radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)`,
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in",
                }}
            />
            <div className="flex items-center justify-center w-full h-screen relative z-10">
                <Navbar />
                <div className="bg-[#0a0a0a] w-98 h-2/3 font-mono text-white p-4 rounded-2xl flex items-center justify-center flex-col">
                    <h1 className="text-xl font-black">Welcome back</h1>
                    <p className="text-xs text-stone-400 mt-2 mb-6 text-center w-80">
                        Sign in to continue managing your shared savings.
                    </p>

                    <form onSubmit={handleLogin}>
                        <label className="text-xs text-stone-300 block mb-2">
                            Email
                        </label>
                        <input
                            className="w-80 border border-white px-2 rounded-md py-1"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <br />
                        <label className="text-xs text-stone-300 block mb-2">
                            Password
                        </label>
                        <input
                            className="w-80 border border-white px-2 rounded-md py-1"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="w-80 flex justify-end mt-2">
                            <button
                                type="button"
                                className="text-[11px] text-stone-400 hover:text-white cursor-pointer">
                                Forgot password?
                            </button>
                        </div>
                        <br />
                        <button
                            className="w-80 text-[#0a0a0a] bg-white px-2 py-1 rounded cursor-pointer"
                            type="submit">
                            Sign in
                        </button>
                    </form>
                    {message && (
                        <p className="text-xs mt-4 text-center w-80">
                            {message}
                        </p>
                    )}
                    <p className="text-xs text-stone-400 mt-6">
                        Dont have an account?{" "}
                        <span
                            className="text-white underline cursor-pointer"
                            onClick={() => router.push("/signup")}
                        >
                            Create one
                        </span>
                    </p>

                </div>
            </div>
        </div>

    )
}