"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { useMessage } from "@/hooks/useMessage";
import { useSocket } from "@/hooks/useSocket";
import { useGroupDetails } from "@/hooks/useGroupDetails";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useGroupContribution } from "@/hooks/useGroupContribution";
import { useFriendList } from "@/hooks/useFriendList";
import LoginNavbar from "@/components/loginNavbar";

export default function MessagePage() {
    const { groupCode } = useParams<{ groupCode: string }>();
    const { data: session } = useSession();
    const { data: groups = [] } = useGroupDetails();
    const group = groups.find(
        (g: any) => g.groupCode === groupCode
    );
    const { data: profile } = useUserDetails();
    const { data: messages = [] } = useMessage(groupCode);
    const {
        data: groupDetails,

    } = useGroupContribution(groupCode);

    const {
        data: FriendList = [],
    } = useFriendList();
    const {
        sendMessage,
        typing,
        onlineUsers,
        typingUser,
    } = useSocket({
        groupCode,
        groupId: group?.id ?? "",
        userId: (session?.user as any)?.id ?? "",
        userName: profile?.name ?? "",
    });

    const [text, setText] = useState("");

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const handleSend = () => {
        if (!text.trim()) return;
        sendMessage(text);
        setText("");
    };

    return (
        <div>
            <LoginNavbar/>
        
        <div className="h-[98vh] bg-gray-100 flex justify-center items-center p-8 gap-8 ">
            
            <div className="w-auto max-w-5xl h-[80vh] bg-black text-white border border-zinc-800 p-8 flex flex-col">
                {/* Header */}
                <div className="border-b border-zinc-800 pb-3">
                    <h1 className="text-xl font-bold">Group Information</h1>
                    <p className="text-xs text-gray-400 mt-1">
                        View group details and members.
                    </p>
                </div>

                {/* Group Details */}
                <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="rounded border border-zinc-800 h-15 p-2">
                        <p className="text-xs text-gray-400 uppercase">Group Name</p>
                        <h2 className="mt-1 text-sm font-semibold">
                            {groupDetails?.groupName}
                        </h2>
                    </div>

                    <div className="rounded border border-zinc-800 h-15 p-2">
                        <p className="text-xs text-gray-400 uppercase">Group Code</p>
                        <h2 className="mt-1 text-sm font-semibold">
                            {groupDetails?.groupCode}
                        </h2>
                    </div>

                    <div className="rounded border border-zinc-800 p-2 col-span-2">
                        <p className="text-xs text-gray-400 uppercase">Description</p>
                        <p className="mt-1 text-sm text-gray-300">
                            {groupDetails?.description}
                        </p>
                    </div>

                    <div className="rounded h-15 border border-zinc-800 p-2">
                        <p className="text-xs text-gray-400 uppercase">Total Amount</p>
                        <h2 className="mt-1 text-sm font-bold">
                            ₹ {groupDetails?.totalAmount}
                        </h2>
                    </div>

                    <div className="rounded h-15 border border-zinc-800 p-2">
                        <p className="text-xs text-gray-400 uppercase">
                            Monthly Amount
                        </p>
                        <h2 className="mt-1 text-sm font-bold">
                            ₹ {groupDetails?.monthlyContribution}
                        </h2>
                    </div>

                    <div className="rounded-xl border border-zinc-800 p-4 col-span-2">
                        <p className="text-xs text-gray-400 uppercase">Due Date</p>
                        <p className="mt-1 text-sm">
                            {groupDetails?.dueDate}
                        </p>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-3">
                        Members ({FriendList.length})
                    </h2>

                    <div className="h-48 overflow-y-auto space-y-2 pr-1">
                        {FriendList.length === 0 ? (
                            <div className="rounded border border-zinc-800 py-6 text-center text-gray-500">
                                No friends found.
                            </div>
                        ) : (
                            FriendList.map((friend) => (
                                
                                <div
                                    key={friend.receiver.coustumerId}
                                    className="flex items-center rounded w-1/2 bg-white border border-[#222] px-3 py-2"
                                >
                                    <div>
                                        <h3 className="text-sm font-semibold text-black uppercase">
                                            {friend.receiver.userdetails.name}
                                        </h3>

                                       
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full max-w-5xl h-[80vh] bg-white overflow-hidden flex flex-col border">
                <div className="border-b px-6 py-4 flex justify-between items-center bg-white">
                    <div>
                        <h1 className="font-bold text-xl">
                            {groupDetails?.groupName}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {groupCode}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm text-gray-600">
                            {onlineUsers} Online
                        </span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-gray-100">
                    {messages.map((msg) => {
                        const isMe = msg.user.id === (session?.user as { id?: string })?.id;
                        return (
                            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[70%] rounded px-3 py-2`}>
                                    {!isMe && (
                                        <p className="text-xs text-black font-semibold mb-1">
                                            {msg.user.userdetails?.name}
                                        </p>
                                    )
                                    }
                                    <p className={` rounded px-2 py-1 shadow wrap-break-word ${isMe ? "bg-white text-black border rounded-br-md" : "bg-black text-white rounded-bl-md"}`}>
                                        {msg.message}
                                    </p>
                                    <p className={`text-[10px] mt-2 ${isMe ? "text-black" : "text-black"}`}>
                                        {
                                            new Date(msg.createdAt).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })
                                        }
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                    {
                        typingUser && (
                            <p className="text-gray-500 italic text-sm">
                                {typingUser} is typing...
                            </p>
                        )
                    }
                    <div ref={bottomRef} />
                </div>
                <div className="border-t bg-white p-5">
                    <div className="flex gap-3">
                        <input
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                                typing();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSend();
                                }
                            }}
                            placeholder="Type your message..."
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#000000]"

                        />
                        <button
                            onClick={handleSend}
                            className="text-white bg-black px-3 py-2 rounded-lg text-[15px] font-medium cursor-pointer"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}