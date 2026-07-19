import {UserDetails} from "@/types/user";

export async function getUserDetails(): Promise<UserDetails> {
    const res = await fetch("/api/userdetails");
    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message);
    }
    return data.userDetails;
}

export async function createUserDetails(body:{
    name:string;
    dateOfbirth:string;
    mobileNumber: string;
}){
    const res = await fetch("/api/userdetails",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.error)
    }

    return data;
}


