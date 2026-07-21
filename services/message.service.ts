import { Message } from "@/types/message";

export async function getMessages(groupCode: string): Promise<Message[]> {
    const res = await fetch(`/api/group/${groupCode}/message`);
    if (!res.ok) {
        throw new Error("Failed to fetch messages");
    }
    const data = await res.json();
    return data.data;
}