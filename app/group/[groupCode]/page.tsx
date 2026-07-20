"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import LoginNavbar from "@/components/loginNavbar";
import { useContributionDetail, useGroupContribution } from "@/hooks/useGroupContribution";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contribution } from "@/services/contribution.service";
import { toast } from "sonner";





export default function GroupPage() {
  const [month, setMonth] = useState("");
  const [openContri, setOpenContri] = useState(false);
  const params = useParams();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const groupCode = params.groupCode as string;
  const {
    data: groupDetails,
    isPending:isGroupDetailsPending,
    isError:isGroupDetailsError,
    error:errorGroupDetails

  } = useGroupContribution(groupCode);

  const {
    data: contributionDetails,
    isPending:isContributionPending,
    isError:isContributionError,
    error:errorContribution
  } = useContributionDetail(groupCode);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: contribution,

    onSuccess:(data) =>{
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["group", groupCode],
      })
      queryClient.invalidateQueries({
        queryKey: ["contribution", groupCode],
      })
      setOpenContri(false)
    },
    onError:(error:Error)=>{
      toast.error(error.message)
    }
  })

  const handleContribution = (e: React.FormEvent) => {
  e.preventDefault();

  mutation.mutate({
    groupCode,
    amount: groupDetails?.monthlyContribution??0,
    month,
  });
};

    if (isGroupDetailsPending||isContributionPending) return <p>Loading...</p>;

  if (isGroupDetailsError||isContributionError) return <p>{errorGroupDetails?.message} || {errorContribution?.message}</p>;

 

  return (
    <div className="min-h-screen w-full relative bg-[#dadada]">
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
           radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)
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
           radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <div className="relative z-10">
        <LoginNavbar />
      </div>


      <div className="p-6 flex gap-6 min-h-screen items-start justify-between relative z-10">
        <div className="w-1/3 bg-[#0a0a0a] border border-[#1d1d1d] rounded-2xl p-8 text-[#dadada] shadow-lg">

          <h1 className="text-4xl font-bold tracking-wide">
            {groupDetails.groupName}
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Manage your monthly savings group.
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex justify-between border-b border-[#1f1f1f] pb-3">
              <span className="text-gray-400">Group Code</span>
              <span className="font-semibold">{groupDetails.groupCode}</span>
            </div>

            <div className="flex justify-between border-b border-[#1f1f1f] pb-3">
              <span className="text-gray-400">Monthly Contribution</span>
              <span className="font-semibold">
                ₹ {groupDetails.monthlyContribution}
              </span>
            </div>

            <div className="flex justify-between border-b border-[#1f1f1f] pb-3">
              <span className="text-gray-400">Total Amount</span>
              <span className="font-semibold text-green-400">
                ₹ {groupDetails.totalAmount}
              </span>
            </div>

            <div>
              <p className="text-gray-400 mb-2">Description</p>
              <p className="leading-7 text-gray-300">
                {groupDetails.description}
              </p>
            </div>

          </div>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => setOpenContri(true)}
              className=" w-auto px-2 py-1 rounded bg-[#dadada] text-[#0a0a0a] font-semibold hover:scale-[1.02] transition cursor-pointer"
            >
            Contribute
            </button>

            <button className="border border-[#dadada] text-[#dadada] px-2 py-1 rounded">Message</button>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Members of Group
            </h2>

            <div className="space-y-3">
              {groupDetails.groupmember.map((member) => (
                <div
                  key={member.id}
                  className="text-white flex items-center justify-between bg-[#141414] border border-[#202020] rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-700"></div>

                    <div>
                      <p className="font-medium">
                        {member.user.userdetails.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {member.user.coustumerId}
                      </p>
                    </div>
                  </div>
                  <span className="text-green-400 text-sm">
                    Member
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/3 bg-[#0a0a0a] border border-[#1d1d1d] rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-[#dadada]">
            Activity
          </h2>
          {contributionDetails.map((item) => (
            <div key={item.id} className="mt-6 space-y-4">
              <div className="flex justify-between items-start border-l-2 border-gray-700 pl-4">
                <div>
                  <p className="text-[#dadada]">
                    <span className="font-semibold">
                      {item.user.userdetails.name}
                    </span>{" "}
                    contributed
                    <span className="text-green-400">
                      {" "}₹{item.amount}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.month}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {openContri && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-10">
          <div className="w-full max-w-md rounded-md border border-[#232323] bg-[#0a0a0a] p-8 shadow-2xl relative z-10">

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#dadada]">
                Monthly Contribution
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Enter your contribution details for this month.
              </p>
            </div>

            <form onSubmit={handleContribution} className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Contribution Amount
                </label>

                <div className="w-full rounded border border-[#2c2c2c] bg-[#121212] px-3 py-2 text-[#dadada]">
                  ₹ {groupDetails.monthlyContribution}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Month
                </label>
                <input
                  type="month"
                  readOnly
                  defaultValue={currentMonth}
                  placeholder="July"
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full rounded border border-[#2c2c2c] bg-[#121212] px-2 py-1 text-[#dadada] placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-[#dadada] focus:ring-2 focus:ring-[#6D4DFE]/30"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  disabled={mutation.isPending}
                  type="submit"
                  className="flex-1 rounded bg-[#dadada] text-[#0a0a0a] font-semibold px-2 py-1 cursor-pointer"
                >
                  {mutation.isPending ? "Contributing..." : "Contribute"}
                </button>
                <button
                  className="flex-1 rounded border border-[#dadada] text-[#dadada] font-semibold px-2 py-1 cursor-pointer"
                  onClick={() => setOpenContri(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}