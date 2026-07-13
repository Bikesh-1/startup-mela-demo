"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoginNavbar from "../component/loginNavbar";

export default function Creategroup() {
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
    const [dueDate, setDuedate] = useState("");
    const [totalAmount, setTotalamount] = useState<number>(0);
    const router = useRouter();
    const handlegroupCreation = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/group/creategroup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    groupName,
                    description,
                    monthlyContribution,
                    dueDate,
                    totalAmount,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                console.log(data)
                // setMessage(data.message);
                router.push("/dashboard")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen w-full relative bg-[#dadada] ">

            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, #0a0a0a 1px, transparent 1px),
        linear-gradient(to bottom, #0a0a0a 1px, transparent 1px)
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
            radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
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
            radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
      `,
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in",
                }}
            />
            <div className="absolute top-8 left-1/2 -translate-1/2 z-10 w-full">
                <LoginNavbar />
            </div>

            <div className="w-full h-screen flex items-center justify-center font-mono relative z-10">
                <div className="w-2/3 h-screen flex items-center justify-center">
                    <div className="bg-[#0a0a0a] w-1/2 h-[75vh] rounded-xl px-10 py-8 flex flex-col justify-center shadow-xl text-[#dadada]">
                        <div className="mb-3">
                            <h1 className="text-2xl font-black text-[#dadada]">
                                Create Group
                            </h1>
                            <p className="text-sm text-[#dadada] mt-1">
                                Build your savings group and invite friends to start contributing together.
                            </p>
                        </div>

                        <form
                            className="flex flex-col gap-3"
                            onSubmit={handlegroupCreation}
                        >
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Group Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Goa Trip Fund"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    className="w-full border border-[#dadada] rounded-xl px-4 py-2  outline-none focus:border-[#4F47EA] transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    placeholder="Describe the purpose of your group"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full border border-[#dadada] rounded-xl px-4 py-2  outline-none focus:border-[#4F47EA] transition"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Monthly Contribution
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="₹500"
                                        value={monthlyContribution}
                                        onChange={(e) =>
                                            setMonthlyContribution(Number(e.target.value))
                                        }
                                        className="w-full border border-[#dadada] rounded-xl px-4 py-2 outline-none focus:border-[#4F47EA] transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Target Amount
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="₹50,000"
                                        value={totalAmount}
                                        onChange={(e) =>
                                            setTotalamount(Number(e.target.value))
                                        }
                                        className="w-full border border-[#dadada] rounded-xl px-4 py-2 outline-none focus:border-[#4F47EA] transition"
                                    />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-semibold mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDuedate(e.target.value)}
                                    className="w-full border border-[#dadada] rounded-xl px-4 py-2  outline-none focus:border-[#4F47EA] transition"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-3 bg-[#dadada] text-[#0a0a0a] font-semibold py-3 rounded  transition-all duration-300"
                            >
                                Create Group
                            </button>
                        </form>

                    </div>
                </div>
                <div className="w-1/3 h-screen flex items-center justify-center px-8">

                    <div className="bg-[#dadadaa0] rounded-2xl p-8 w-full max-w-md">

                        <div className="mb-6">
                            <h2 className="text-xl font-black text-[#0a0a0a]">
                                Before You Create
                            </h2>
                            <p className="text-red-700 text-sm mt-1 font-black">
                                Please review these important guidelines before creating your savings group.
                            </p>
                        </div>

                        <div className="space-y-5 text-sm">

                            <div className="flex gap-3">
                                <span className="text-[#4F47EA] font-bold">-</span>
                                <div>
                                    <p className="font-semibold text-black">
                                        Group Deletion
                                    </p>
                                    <p className="text-gray-700">
                                        Groups cannot be deleted directly after creation. If required,
                                        contact our support team.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-[#4F47EA] font-bold">-</span>
                                <div>
                                    <p className="font-semibold text-black">
                                        Invite Members
                                    </p>
                                    <p className="text-gray-700">
                                        After creating the group, you can invite your friends to join.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-[#4F47EA] font-bold">-</span>
                                <div>
                                    <p className="font-semibold text-black">
                                        Member Management
                                    </p>
                                    <p className="text-gray-700">
                                        Once a member joins the group, they cannot be removed.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-[#4F47EA] font-bold">-</span>
                                <div>
                                    <p className="font-semibold text-black">
                                        Contributions
                                    </p>
                                    <p className="text-gray-700">
                                        Ensure every member understands the monthly contribution amount
                                        before joining.
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="mt-8 border-t border-gray-300 pt-5">
                            <p className="text-xs text-gray-600">
                                <span className="font-semibold">Tip:</span> Choose a meaningful
                                group name and set a realistic savings goal for better tracking.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    )
}