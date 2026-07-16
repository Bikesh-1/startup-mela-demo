"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoginNavbar from "@/app/component/loginNavbar";

type GroupMember = {
  id: string;
  user: {
    coustumerId: string;
    userdetails: {
      name: string;
      profilephoto?: string;
    };
  };
};

type Activity = {
  id: string;
  amount: string;
  month: string;
  user: {
    coustumerId: string;
    userdetails: {
      name: string;
      profilephoto?: string;
    };
  }
}

type Group = {
  groupName: string;
  groupCode: string;
  description: string;
  monthlyContribution: number;
  totalAmount: number;
  groupmember: GroupMember[];
};

export default function GroupPage() {
  const { groupCode } = useParams();
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [groupmember, setGroupmember] = useState<GroupMember[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [month, setMonth] = useState("");
  const [openContri, setOpenContri] = useState(false);

  const handleContribution = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/group/${groupCode}/contribution`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: group?.monthlyContribution,
          month,
        })
      });
      const data = await res.json();
      if (res.ok) {
        setOpenContri(false);
        console.log(data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await fetch(`/api/group/${groupCode}`);
        const data = await res.json();
        if (res.ok) {
          setGroup(data.groupDetails);
          setGroupmember(data.groupDetails.groupmember);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupCode]);

  useEffect(() => {
    const fetchContribution = async () => {
      try {
        const res = await fetch(`/api/group/${groupCode}/contribution`);
        const data = await res.json();
        if (res.ok) {
          setActivity(data.contributionDetails)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchContribution();
  }, [groupCode])

  if (loading) return <h1 className="w-auto h-screen bg-[#dadada] flex items-center justify-center font-mono">Loading please wait...</h1>;
  if (!group) return <h1>Group Not Found</h1>;
  return (
    <div className="min-h-screen w-full relative bg-[#dadada] font-mono">
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
            {group.groupName}
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Manage your monthly savings group.
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex justify-between border-b border-[#1f1f1f] pb-3">
              <span className="text-gray-400">Group Code</span>
              <span className="font-semibold">{group.groupCode}</span>
            </div>

            <div className="flex justify-between border-b border-[#1f1f1f] pb-3">
              <span className="text-gray-400">Monthly Contribution</span>
              <span className="font-semibold">
                ₹ {group.monthlyContribution}
              </span>
            </div>

            <div className="flex justify-between border-b border-[#1f1f1f] pb-3">
              <span className="text-gray-400">Total Amount</span>
              <span className="font-semibold text-green-400">
                ₹ {group.totalAmount}
              </span>
            </div>

            <div>
              <p className="text-gray-400 mb-2">Description</p>
              <p className="leading-7 text-gray-300">
                {group.description}
              </p>
            </div>

          </div>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => setOpenContri(true)}
              className=" w-auto px-2 py-1 rounded bg-[#dadada] text-[#0a0a0a] font-semibold hover:scale-[1.02] transition"
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
              {groupmember.map((member) => (
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
          {activity.map((item) => (
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
                  ₹ {group?.monthlyContribution}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Month
                </label>
                <input
                  type="month"
                  placeholder="July"
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full rounded border border-[#2c2c2c] bg-[#121212] px-2 py-1 text-[#dadada] placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-[#dadada] focus:ring-2 focus:ring-[#6D4DFE]/30"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button

                  type="submit"
                  className="flex-1 rounded bg-[#dadada] text-[#0a0a0a] font-semibold px-2 py-1 cursor-pointer"
                >
                  Contribute
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