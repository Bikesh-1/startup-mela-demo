"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "@/types/message";

interface UseSocketProps {
    groupCode: string;
    groupId: string;
    userId: string;
    userName: string;
}

export function useSocket({
    groupCode,
    groupId,
    userId,
    userName,
}: UseSocketProps) {

    const socketRef = useRef<Socket | null>(null);
    const queryClient = useQueryClient();
    const [onlineUsers, setOnlineUsers] = useState(0);
    const [typingUser, setTypingUser] = useState("");
    const typingTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!groupCode || !groupId || !userId) return;
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
            transports: ["websocket"],
            reconnection: true,
        });

        socketRef.current = socket;
        socket.on("connect", () => {
            socket.emit("join-group", {
                groupCode,
                groupId,
                userId,
                userName,
            });
        });

        socket.on("receive-message", (message: Message) => {
            queryClient.setQueryData<Message[]>(
                ["messages", groupCode],
                (old = []) => [...old, message]
            );
        });

        socket.on("online-users", (count: number) => {
            setOnlineUsers(count);
        });

        socket.on("typing",({ userName }: { userName: string }) => {
                setTypingUser(userName);
            }
        );

        socket.on("stop-typing", () => {
            setTypingUser("");
        });

        return () => {
            socket.emit("leave-group", {
                groupCode,
            });
            socket.off("receive-message");
            socket.off("online-users");
            socket.off("typing");
            socket.off("stop-typing");
            socket.disconnect();

        };

    }, [
        groupCode,
        groupId,
        userId,
        userName,
        queryClient,
    ]);

    const sendMessage = (message: string) => {
        if (!message.trim()) return;
        socketRef.current?.emit("send-message", {
            groupCode,
            message,
        });
    };

    const typing = () => {
        socketRef.current?.emit("typing", {
            groupCode,
        });
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }
        typingTimeout.current = setTimeout(() => {
            socketRef.current?.emit("stop-typing", {
                groupCode,
            });
        }, 1000);
    };
    return {
        socket: socketRef,
        sendMessage,
        typing,
        onlineUsers,
        typingUser,
    };

}