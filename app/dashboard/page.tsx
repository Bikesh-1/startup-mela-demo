import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginNavbar from "../component/loginNavbar";
import Userdetails from "../component/userdetailsCard";
import Addfriend from "../component/addfriend";

export default async function Dashboard(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/signin")
    }
    return(
        <div  className="flex items-center justify-center bg-[#dadada] w-screen h-screen text-white">
            <LoginNavbar/>
            <Userdetails/>
            <Addfriend/>
        </div>
    )
}