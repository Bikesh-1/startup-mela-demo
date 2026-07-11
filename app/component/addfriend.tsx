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
            <form onSubmit={handleaddingFriend}>
                <input value={coustumerId} type="text" onChange={(e) => setcoustumerId(e.target.value)}/>
                <button type="submit">Add friend</button>
            </form>
        </div>
    )
}