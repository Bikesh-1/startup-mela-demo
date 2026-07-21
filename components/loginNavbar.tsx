"use client";

import { signOut } from "next-auth/react";
import { Plus } from 'lucide-react';
import { useState } from "react";
import { toast } from "sonner";
import { Bell } from 'lucide-react';
import { useUserDetails } from "@/hooks/useUserDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserDetails } from "@/services/user.service";
import Image from "next/image";


export default function LoginNavbar() {

  const [popup, setPopup] = useState(false);
  const [name, setName] = useState("");
  const [dateOfbirth, setDateOfbirth] = useState("");
  const [mobileNumber, setMobileNumber] = useState("")
  // important

  const { data: userDetails } = useUserDetails();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUserDetails,

    onSuccess: (data) => {
      toast.success(data.message);
      setPopup(false);

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      })
    },

    onError: (error: Error) => {
      toast.error(error.message)
    }
  })

  const handleUserdetails = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      name,
      dateOfbirth,
      mobileNumber,
    });
  };

  return (
    <div className="w-full p-8 h-10  flex items-center justify-between absolute ">
      <Image
                    src="/logo.png"
                    alt="logo"
                    width={150}
                    height={150}
                />
      <div className="flex items-center gap-8">
        <button
          onClick={() => (setPopup(true))}
          disabled={!!userDetails}
          className={`px-3 py-2 rounded-lg font-medium text-[15px] border ${userDetails
            ? "text-black border border-[#dadada] bg-white cursor-not-allowed"
            : "border-[#0a0a0a] text-black"
            }`}
        >
          {userDetails ? "Details  Added" : "+ Add your details"}
        </button>

        <button className="text-white bg-[#4F47EA] px-3 py-2 rounded-lg text-[15px] font-medium cursor-pointer flex items-center justify-center gap-2">
          <Plus size={12} />{" "}Create Group
        </button>
        <button
          className="text-black border border-[#dadada] bg-white px-2 py-2 rounded-lg text-[15px] font-medium cursor-pointer"
        >
          <Bell size={19} />
        </button>
        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="text-black border border-[#dadada] bg-white px-3 py-2 rounded-lg text-[15px] font-medium cursor-pointer"
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
                  disabled={mutation.isPending}
                  type="submit"
                  className="flex-1 rounded cursor-pointer bg-[#dadada] px-2 py-1  font-semibold text-[#0a0a0a]"
                >
                  {mutation.isPending ? "Saving..." : "Save"}
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