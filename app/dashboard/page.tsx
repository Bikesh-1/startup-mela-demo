"use client";

import LoginNavbar from "../../components/loginNavbar";
import {
  House,
  Users,
  Wallet,
  Activity,
  UserRound,
  Settings,
  Bell,
} from "lucide-react";
import { useState } from "react";
import Home from "../../components/home";
import Sidebarmsg from "../../components/sidebarusermsg";
import Image from "next/image";


const menuItems = [
  { id: "home", label: "Home", icon: House },
  { id: "group", label: "Groups", icon: Users },
  { id: "friend", label: "Friends", icon: Users },
  { id: "contribution", label: "Contribution", icon: Wallet },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "notification", label: "Notifications", icon: Bell },
  { id: "Profile", label: "Profile", icon: UserRound },
  { id: "setting", label: "Setting", icon: Settings },
];

export default function Dashboard() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <LoginNavbar />
      <div className="flex">
        <div className="bg-black w-64 h-dvh p-2 relative z-20 flex justify-between flex-col">

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center m-4">
              <Image
                    src="/whitelogo.png"
                    alt="logo"
                    width={150}
                    height={150}
                />
            </div>
                      
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded font-medium text-sm transition-all text-left ${
                    page === item.id
                      ? "bg-[#4f47ea81] text-white shadow-md"
                      : "text-[#dadada] hover:bg-zinc-800"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>
          <Sidebarmsg/>
        </div>
        <div className="flex-1 p-8 overflow-y-auto">
          {page === "home" && <Home />}
          {page === "group" && (
            <h1 className="text-3xl font-bold">Group Page</h1>
          )}
          {page === "friend" && (
            <h1 className="text-3xl font-bold">Friend Page</h1>
          )}
          {page === "contribution" && (
            <h1 className="text-3xl font-bold">Contribution Page</h1>
          )}

          {page === "activity" && (
            <h1 className="text-3xl font-bold">Activity Page</h1>
          )}

          {page === "notification" && (
            <h1 className="text-3xl font-bold">notification Page</h1>
          )}

          {page === "profile" && (
            <h1 className="text-3xl font-bold">Friend List Page</h1>
          )}

          {page === "setting" && (
            <h1 className="text-3xl font-bold">Setting Page</h1>
          )}
        </div>
      </div>
    </div>
  );
}