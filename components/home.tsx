import Addfriend from "./addfriend";
import FriendList from "./friendlist";
import Group from "./group";
import Userdetails from "./userdetailsCard";
import Welcomemsg from "./welcomemsg";
import { Users } from 'lucide-react';

export default function Home() {
    return (
        <div>
            <main className="max-w-7xl mx-auto px-8 py-8">
                <div className="flex justify-between items-center mb-10">
                    <Welcomemsg />
                    <Addfriend />
                </div>
                <div className="grid grid-cols-12 gap-8">
                    <section className="col-span-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">
                                Your Groups
                            </h2>
                        </div>
                        {/* <Group /> */}
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