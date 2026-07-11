"use client"

import { useEffect, useState } from "react";

type UserDetails = {
  name: string;
  mobileNumber: string;
  dateOfbirth: string;
  user: {
    coustumerId: string;
  };
};

export default function Userdetails() {
  const [userdetails, setUserdetails] = useState<UserDetails | null>(null);


  useEffect(() => {
    const getUserdetails = async () => {
      try {
        const res = await fetch("/api/userdetails");

        const data = await res.json();
        if (res.ok) {
          setUserdetails(data.userDetails)
        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    };
    getUserdetails();
  }, [])
  return (
    <div className="flex items-center justify-center">
      <div className="w-96 rounded-3xl border border-[#202020] bg-[#0a0a0a] p-6 font-mono shadow-[0_0_40px_rgba(79,71,234,0.12)] transition-all duration-300 hover:border-[#4F47EA]/50">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Profile
            </p>
          </div>

          <div className="h-3 w-3 rounded-full bg-[#4F47EA] shadow-[0_0_15px_#4F47EA]" />
        </div>

        {userdetails ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-[#4F47EA]/30 bg-[#4F47EA]/10 p-3">
              <p className="text-xs uppercase tracking-widest text-gray-400">
                Customer ID
              </p>
              <p className="mt-1 text-lg font-black text-[#4F47EA]">
                {userdetails.user.coustumerId}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-[#1d1d1d] pb-2">
                <span className="text-gray-400">Name</span>
                <span className="font-bold text-white">
                  {userdetails.name}
                </span>
              </div>

              <div className="flex justify-between border-b border-[#1d1d1d] pb-2">
                <span className="text-gray-400">Mobile</span>
                <span className="font-bold text-white">
                  {userdetails.mobileNumber}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">DOB</span>
                <span className="font-bold text-white">
                  {userdetails.dateOfbirth}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 flex justify-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}
      </div>
    </div>
  )
}