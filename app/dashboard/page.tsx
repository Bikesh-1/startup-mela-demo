import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginNavbar from "../component/loginNavbar";
import Userdetails from "../component/userdetailsCard";
import Addfriend from "../component/addfriend";
import FriendList from "../component/friendlist";
import Welcomemsg from "../component/welcomemsg";
import Group from "../component/group";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/signin")
    }
    return (
<div className="min-h-screen bg-[#f5f5f5]">
  <LoginNavbar />

  <main className="max-w-7xl mx-auto px-8 py-8">

    {/* Top Section */}
    <div className="flex justify-between items-start mb-10">

      <Welcomemsg />

      <Addfriend />

    </div>

    {/* Main Dashboard */}
    <div className="grid grid-cols-12 gap-8">

      {/* Groups */}
      <section className="col-span-8">

        <h2 className="text-3xl font-bold mb-6">
          Your Groups
        </h2>
        <Group />
      </section>
      <aside className="col-span-4 space-y-6 sticky top-24">
        <Userdetails />
        <FriendList />

      </aside>

    </div>

  </main>
</div>
    )
}