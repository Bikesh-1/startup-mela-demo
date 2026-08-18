import { Activity } from "@/types/activity";
import { Group } from "@/types/group";

export async function getContributionGroupList(groupCode:string): Promise<Group>{
    const res = await fetch(`/api/group/${groupCode}`);
    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message);
    }

    return data.groupDetails
}

export async function getContribution(groupCode:string):Promise<Activity[]>{
    const res = await fetch(`/api/group/${groupCode}/contribution`)

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message);
    }

    return data.contributionDetails
}

export async function contribution(body:{
    groupCode: string,
    amount:number,
    month:string,
    
}){
    const { groupCode, amount, month } = body;
    const res = await fetch(`/api/group/${groupCode}/contribution`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
        amount,
        month,
    }),
    })

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.error)
    }

    return data;

}