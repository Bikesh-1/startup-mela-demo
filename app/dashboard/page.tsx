import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/signin")
    }
    return(
        <div  className="flex items-center justify-center bg-[#0a0a0a] w-screen h-screen text-white">
            Hii welcome to Dashboard 
        </div>
    )
}