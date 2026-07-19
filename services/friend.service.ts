import { FriendList } from "@/types/friend";

export async function getFriendList(): Promise<FriendList[]> {
    const res = await fetch("/api/addfriends");
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message);
    }
    return data.friendlist;
    
}

export async function createFriend(body:{
    coustumerId:string
}) {
    
    const res = await fetch("/api/addfriends",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(body)
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.error)
    }

    return data;
}