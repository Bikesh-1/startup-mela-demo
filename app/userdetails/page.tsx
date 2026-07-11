"use client"
import { router } from "next/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Userdetails(){

    const [name,setName] = useState("");
    const [dateOfbirth,setDateOfbirth] = useState("");
    const [mobileNumber,setMobileNumber] = useState("")
    const router = useRouter();

    const handleUserdetails = async(e: React.FormEvent) =>{
        e.preventDefault();
        try{
            const res = await fetch("/api/userdetails",{
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name,
                    dateOfbirth,
                    mobileNumber
                }),
            });
            const data = await res.json();
            if(res.ok){
                //setMessage(data.message);
                router.push("/dashboard")
            }else{
                //setMessage(data.message || data.error)
            }
        }catch(error){
            console.log(error);

        }
    }

    return(
        <div className="w-auto h-screen bg-[#dadada]">
            <form onSubmit={handleUserdetails}>
                <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="date" placeholder="date of birth" value={dateOfbirth} onChange={(e) => setDateOfbirth(e.target.value)}/>
                <input type="number" placeholder="enter your mobile number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}