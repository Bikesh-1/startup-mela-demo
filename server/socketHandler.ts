import { Server, Socket } from "socket.io";
import prisma from "@/lib/prisma";

interface JoinPayload {
    groupCode: string;
    groupId: string;
    userId: string;
    userName: string;
}

interface LeavePayload {
    groupCode: string;
}

interface MessagePayload {
    groupCode: string;
    message: string;
}

interface TypingPayload {
    groupCode: string;
}

const onlineUsers = new Map<string, Map<string, number>>();

export function registerSocketHandlers(io: Server) {
    io.on("connection", (socket: Socket) => {

        socket.on("join-group", (data: JoinPayload) => {
            const {
                groupCode,
                groupId,
                userId,
                userName,
            } = data;
            socket.join(groupCode);
            socket.data.groupCode = groupCode;
            socket.data.groupId = groupId;
            socket.data.userId = userId;
            socket.data.userName = userName;
            if (!onlineUsers.has(groupCode)) {
                onlineUsers.set(groupCode, new Map());
            }
            const users = onlineUsers.get(groupCode)!;
            users.set(userId, (users.get(userId) ?? 0) + 1);
            io.to(groupCode).emit("online-users", users.size);
        });

        socket.on("leave-group", ({ groupCode }: LeavePayload) => {
            socket.leave(groupCode);
            const users = onlineUsers.get(groupCode);
            if (users) {
                const userId = socket.data.userId;
                const count = (users.get(userId) ?? 1) - 1;
                if (count <= 0) {
                    users.delete(userId);
                } else {
                    users.set(userId, count);
                }
                io.to(groupCode).emit("online-users", users.size);
            }
        });

        socket.on("typing", ({ groupCode }: TypingPayload) => {
            socket.to(groupCode).emit("typing", {
                userId: socket.data.userId,
                userName: socket.data.userName
            });
        });

        socket.on("stop-typing", ({ groupCode }: TypingPayload) => {
            socket.to(groupCode).emit("stop-typing", {
                userId: socket.data.userId
            });
        });

        socket.on(
            "send-message",
            async ({ groupCode, message }: MessagePayload) => {
                try {
                    const tempId = crypto.randomUUID();
                    const messageData = {
                        id: tempId,
                        message,
                        createdAt: new Date(),
                        userId: socket.data.userId,
                        user: {
                            id: socket.data.userId,
                            userdetails: {
                                name: socket.data.userName,
                                profilephoto: socket.data.profilePhoto
                            }
                        },
                        pending: true
                    };
                    io.to(groupCode).emit(
                        "receive-message",
                        messageData
                    );
                    await prisma.message.create({
                        data: {
                            groupId: socket.data.groupId,
                            userId: socket.data.userId,
                            message
                        }
                    });
                } catch (err) {
                    console.error(err);
                    socket.emit("message-error", {
                        message: "Failed to send message"
                    });
                }
            }
        );

        socket.on("disconnect", () => {
            const groupCode = socket.data.groupCode;
            const userId = socket.data.userId;
            if (!groupCode || !userId) return;
            const users = onlineUsers.get(groupCode);
            if (!users) return;
            const count = (users.get(userId) ?? 1) - 1;
            if (count <= 0) {
                users.delete(userId);
            } else {
                users.set(userId, count);
            }
            io.to(groupCode).emit(
                "online-users",
                users.size
            );
        });
    });
}