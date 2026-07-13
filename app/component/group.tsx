"use client"
import { useEffect, useState } from "react";

type Group = {
    groupName: string,
    groupCode: string,
    description: string,
    monthlyContribution: number,
    dueDate: string,
    totalAmount: number,
    id: string,
    groupmember: string[]
}
type FriendList = {
    receiver: {
        coustumerId: string;
        userdetails: {
            name: string;
        };
    };
};

export default function Group() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<any>(null);
    const [FriendList, setFriendList] = useState<FriendList[]>([]);
    useEffect(() => {
        const getFriendList = async () => {
            try {
                const res = await fetch("/api/addfriends");

                const data = await res.json();
                if (res.ok) {
                    setFriendList(data.friendlist)
                } else {
                    console.log(data.message)
                }
            } catch (error) {
                console.log(error)
            }
        };
        getFriendList()
    }, [])
    const handleAddMember = async (friendCode: string) => {
        const body = {
            groupCode: selectedGroup.groupCode,
            coustumerId: friendCode,
        };

        console.log(body);
        const res = await fetch("/api/group/addmember", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (res.ok) {
            alert(data.message);
        } else {
            alert(data.error);
        }

        setOpenPopup(false);
    };
    useEffect(() => {
        const getGroup = async () => {
            try {
                const res = await fetch("/api/group/creategroup");
                const data = await res.json();
                if (res.ok) {
                    setGroups(data.groupDetails)
                }
            } catch (error) {
                console.log(error)
            }
        };
        getGroup();
    }, [])

    return (
        <div className="w-full grid grid-cols-2 gap-6 font-mono">
            {groups.map((group) => (
                <div
                    key={group.id}
                    className="w-80 rounded-2xl border border-[#1e1e1e] bg-[#0a0a0a] p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-[#dadada]">
                            {group.groupName}
                        </h2>
                        <span className="rounded-full border border-[#2a2a2a] px-2.5 py-1 text-[11px] text-[#8f8f8f]">
                            Active
                        </span>
                    </div>
                    <h1 className="text-[#dadada]">Group Code:{group.groupCode}</h1>
                    <p className="mt-1 text-sm leading-6 text-[#7a7a7a]">
                        {group.description}
                    </p>
                    <div className="my-2 h-px bg-[#1c1c1c]" />
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-[#666]">Monthly Target</span>
                            <span className="font-medium text-[#dadada]">
                                ₹{group.monthlyContribution}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-[#666]">Group Target</span>
                            <span className="font-medium text-[#dadada]">
                                ₹{group.totalAmount}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-[#666]">Members</span>
                            <span className="font-medium text-[#dadada]">
                                {group.groupmember.length}
                            </span>
                        </div>
                    </div>

                    <button className="mt-6 w-full rounded-lg border border-[#2a2a2a] bg-[#111111] py-2.5 text-sm text-[#dadada] transition hover:bg-[#181818]">
                        Open Group
                    </button>
                    <button className="mt-6 w-full rounded-lg border border-[#2a2a2a] bg-[#111111] py-2.5 text-sm text-[#dadada] transition hover:bg-[#181818] "
                        onClick={() => {
                            setSelectedGroup(group);
                            setOpenPopup(true);
                        }}
                    >Add Friend</button>
                </div>
            ))}
            {openPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-[#0a0a0a] p-6 rounded-lg w-112.5 text-[#dadada]">
                        <h2 className="text-2xl font-bold mb-5">
                            Friend List
                        </h2>
                        {FriendList.map((friend) => (
                            <div
                                key={friend.receiver.coustumerId}
                                className="flex justify-between items-center border-b py-3"
                            >
                                <div>
                                    <h3 className="uppercase">Name: {friend.receiver.userdetails.name}</h3>
                                    <p className="uppercase">User code: {friend.receiver.coustumerId}</p>
                                </div>

                                <button
                                    className="bg-[#dadada] text-[#0a0a0a] px-2 py-1 rounded"
                                    onClick={() =>
                                        handleAddMember(friend.receiver.coustumerId)
                                    }
                                >
                                    Add member
                                </button>
                            </div>
                        ))}

                        <button
                            className="mt-5 bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => setOpenPopup(false)}
                        >
                            Close
                        </button>

                    </div>

                </div>
            )}
        </div>
    )
}