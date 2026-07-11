"use client"
import React, { useState } from "react";

export default function Addfriend(){

    const[coustumerId,setcoustumerId] = useState("");

    const handleaddingFriend = async(e: React.FormEvent) =>{
        e.preventDefault();
        try{
            const res = await fetch("/api/addfriends",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    coustumerId
                }),
            });

            const data = await res.json();
            if(res.ok){
                //setMessage(data.message);
            }
        }catch(error){
            console.log(error);
            //setMessage(data.message);
        }
    }

    return(
        <div>
            <form className="font-mono flex items-center justify-center gap-4" onSubmit={handleaddingFriend}>
                <input
                placeholder="Enter your friend usercode"
                className="bg-[#0a0a0a] w-80 py-2 px-2 rounded-xl text-[#4F47EA]"
                 value={coustumerId} type="text" onChange={(e) => setcoustumerId(e.target.value)}/>
                <button
                 className="text-[#0a0a0a] border border-[#0a0a0a] px-2 py-1 rounded"
                 type="submit"><span className="text-[#4f47ea] font-black">+</span> Add friend</button>
                 
            </form>
           {/* <p className="text-xs text-[#4f47ea] font-mono font-bold p-4">*Note:- You can add your friend by using user code</p>  */}
        </div>
    )
}