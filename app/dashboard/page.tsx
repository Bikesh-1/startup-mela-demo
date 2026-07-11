import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginNavbar from "../component/loginNavbar";
import Userdetails from "../component/userdetailsCard";
import Addfriend from "../component/addfriend";
import FriendList from "../component/friendlist";
import Welcomemsg from "../component/welcomemsg";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/signin")
    }
    return (
        <div className="min-h-screen bg-[#dadada]">
            <LoginNavbar />
            <div className="flex items-start justify-between px-8 py-6">
                <Welcomemsg />
                <Addfriend />
                <div className="flex items-center justify-center flex-col gap-4">
                    <Userdetails />
                    <FriendList />
                </div>
                
            </div>
            <div className="flex gap-6 px-8 pb-8">
                {/* <div className="w-80">
                    <FriendList />
                </div> */}
                <div className="flex-1">
                    
                </div>
            </div>
        </div>
    )
}