"use client"
import { useFriendList } from "@/hooks/useFriendList";
import { useGroupDetails } from "@/hooks/useGroupDetails";
import { addingFriend } from "@/services/group.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Group() {
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<any>(null);
    const [addingFriendId, setAddingFriendId] = useState<string | null>(null);
    const router = useRouter();


    const {
        data: groups = [],
        isPending: isGroupPending,
        isError: isGroupError,
        error: groupError
    } = useGroupDetails();

    const {
        data: FriendList = [],
        isPending: isFriendPending,
        isError: isFriendError,
        error: friendError
    } = useFriendList();






    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addingFriend,

        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["group"],
            })
            queryClient.invalidateQueries({
                queryKey: ["friend"],
            })
            setOpenPopup(false);
        },

        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const handleAddMember = (friendCode: string) => {
        setAddingFriendId(friendCode);

        mutation.mutate(
            {
                groupCode: selectedGroup.groupCode,
                coustumerId: friendCode,
            },
            {
                onSettled: () => setAddingFriendId(null),
            }
        );
    };


    if (isGroupPending || isFriendPending) {
        return <p>Loading....</p>
    }

    if (isGroupError || isFriendError) {
        return <p>{groupError?.message || friendError?.message}</p>
    }






    return (
        <div className="w-full grid grid-cols-2 gap-6">
            {groups.map((group) => (
                <div
                    key={group.id}
                    className="w-80 rounded-2xl border border-[#1e1e1e] bg-black p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-[#dadada]">
                            {group.groupName}
                        </h2>
                        <span className="rounded-full border border-[#2a2a2a] px-2.5 py-1 text-[11px] text-[#8f8f8f]">
                            Active
                        </span>
                    </div>
                    <h1 className="text-[#dadada] text-xs">Group Code:{group.groupCode}</h1>
                    <p className="mt-1 text-xs leading-6 text-[#7a7a7a]">
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
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => router.push(`/group/${group.groupCode}`)}
                            className="mt-6 w-full rounded-lg border px-3 py-2 border-[#dadada] bg-white text-sm text-black font-medium cursor-pointer">
                            Open Group
                        </button>
                        <button className="mt-6 w-full rounded-lg bg-[#4F47EA] py-2 px-3 text-sm text-white font-medium cursor-pointer"
                            onClick={() => {
                                setSelectedGroup(group);
                                setOpenPopup(true);
                            }}>
                            Add Friend
                        </button>
                    </div>
                </div>
            ))}
            {openPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-xl rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] shadow-2xl">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-[#1f1f1f] px-6 py-4">
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    Add Group Members
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Select friends to add to this group
                                </p>
                            </div>

                            <button
                                onClick={() => setOpenPopup(false)}
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-[#1a1a1a] hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Friend List */}
                        <div className="max-h-105 space-y-3 overflow-y-auto px-6 py-5">

                            {FriendList.length === 0 ? (
                                <div className="py-10 text-center text-gray-500">
                                    No friends found.
                                </div>
                            ) : (
                                FriendList.map((friend) => {
                                    const isAdded = selectedGroup?.groupmember?.some(
                                        (member: any) =>
                                            member.user.coustumerId === friend.receiver.coustumerId
                                    );

                                    return (
                                        <div
                                            key={friend.receiver.coustumerId}
                                            className="flex items-center justify-between rounded-xl border border-[#222] bg-[#111] px-4 py-4 transition hover:border-[#4F47EA]/60"
                                        >
                                            <div>
                                                <h3 className="font-semibold uppercase text-white">
                                                    {friend.receiver.userdetails.name}
                                                </h3>

                                                <p className="mt-1 text-xs tracking-wide text-gray-500">
                                                    {friend.receiver.coustumerId}
                                                </p>
                                            </div>

                                            <button
                                                disabled={isAdded || addingFriendId === friend.receiver.coustumerId}
                                                onClick={() => handleAddMember(friend.receiver.coustumerId)}
                                                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${isAdded
                                                        ? "cursor-not-allowed border border-green-600/30 bg-green-600/20 text-green-400"
                                                        : addingFriendId === friend.receiver.coustumerId
                                                            ? "cursor-wait bg-[#4F47EA]/70 text-white"
                                                            : "bg-white text-black cursor-pointer"
                                                    }`}
                                            >
                                                {isAdded
                                                    ? "Already member"
                                                    : addingFriendId === friend.receiver.coustumerId
                                                        ? "Adding..."
                                                        : "Add Friend"}
                                            </button>
                                        </div>
                                    );
                                })
                            )}

                        </div>

                        {/* Footer */}
                        <div className="border-t border-[#1f1f1f] px-6 py-4">
                            <button
                                onClick={() => setOpenPopup(false)}
                                className="w-full rounded-xl border border-[#2a2a2a] py-2.5 font-medium text-gray-300 transition hover:bg-[#1a1a1a]"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}