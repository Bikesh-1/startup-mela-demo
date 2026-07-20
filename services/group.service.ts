import { Group } from "@/types/group";

export async function getGroupList(): Promise<Group[]>{
    const res = await fetch("/api/group/creategroup");
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message);
    }
    return data.groupDetails
}

export async function createGroup(body:{
    groupName:string,
    description:string,
    monthlyContribution:number,
    dueDate:string,
    totalAmount:number,
}){
    const res = await fetch("/api/group/creategroup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    })

    const data = await res.json();
    if(!res.ok){
        throw new Error(data.error)
    }

    return data;
}

export async function addingFriend(body:{
    groupCode: string,
    coustumerId: string,
}) {
    const res = await fetch("/api/group/addmember",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    })

    const data = await res.json();
    if(!res.ok){
        throw new Error(data.error)
    }

    return data;
}