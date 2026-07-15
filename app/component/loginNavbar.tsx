"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type UserDetails = {
  id: string;
  name: string;
};

export default function LoginNavbar() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [popup, setPopup] = useState(false);
  const [name, setName] = useState("");
  const [dateOfbirth, setDateOfbirth] = useState("");
  const [mobileNumber, setMobileNumber] = useState("")
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchUserDetails() {
      const res = await fetch("/api/userdetails");
      const data = await res.json();

      setUserDetails(data.userDetails);
    }

    fetchUserDetails();
  }, []);
  const handleUserdetails = async (e: React.FormEvent) => {
    e.preventDefault();
     setLoading(true);
    try {
      const res = await fetch("/api/userdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          dateOfbirth,
          mobileNumber
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPopup(false)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch{
      toast.error("An unexpected error occurred. Please try again later.")
    }finally {
    setLoading(false);
  }
  }
  return (
    <div className="w-full p-4 mt-5 h-10 font-mono flex items-center justify-between relative z-10">
      <div>
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={150}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => (setPopup(true))}
          disabled={!!userDetails}
          className={`px-2 py-1 rounded border ${userDetails
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "border-[#0a0a0a] text-black"
            }`}
        >
          {userDetails ? "Details Added" : "+ Add your details"}
        </button>

        <button className="text-white bg-[#4F47EA] px-2 py-1 rounded">
          + Create Group
        </button>

        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="text-white bg-[#0a0a0a] px-2 py-1 rounded"
        >
          Logout
        </button>
      </div>
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-md border border-neutral-800 bg-[#0a0a0a] p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-[#dadada] text-center">
              Complete Your Profile
            </h2>

            <p className="mt-2 text-center text-sm text-neutral-400">
              Fill in your details to continue.
            </p>

            <form
              onSubmit={handleUserdetails}
              className="mt-6 flex flex-col gap-5"
            >
              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-[#dadada] outline-none transition focus:border-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dateOfbirth}
                  onChange={(e) => setDateOfbirth(e.target.value)}
                  className="w-full rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-[#dadada] outline-none transition focus:border-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Mobile Number
                </label>
                <input
                  type="number"
                  placeholder="9876543210"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-[#dadada] outline-none transition focus:border-white"
                />
              </div>

              <div className="mt-2 flex gap-3">
                <button
                disabled={loading}
                  type="submit"
                  className="flex-1 rounded cursor-pointer bg-[#dadada] px-2 py-1  font-semibold text-[#0a0a0a]"
                >
                  {loading ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => setPopup(false)}
                  className="flex-1 rounded cursor-pointer border border-neutral-700 px-2 py-1 text-[#dadada] transition hover:bg-neutral-900"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}