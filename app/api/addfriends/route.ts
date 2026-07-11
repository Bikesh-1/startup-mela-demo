import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { coustumerId } = await req.json();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { message: "You are not authorize to this page" },
                { status: 402 }
            )
        }
        const email = session.user.email as string;
        const userExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!userExist) {
            return NextResponse.json(
                { message: "you have not create your account" },
                { status: 402 }
            )
        }
        const friendUser = await prisma.user.findFirst({
            where: {
                coustumerId
            }
        })
        if (!friendUser) {
            return NextResponse.json(
                { error: "Your friend is not found recheck your code " },
                { status: 401 }
            )
        }

        if (userExist.id == friendUser.id) {
            return NextResponse.json(
                { error: "you can't add yourself" },
                { status: 401 }
            )
        }

        const alreadyFriend = await prisma.friend.findFirst({
            where: {
                senderId: userExist.id,
                receiverId: friendUser.id,
            },
        })

        if (alreadyFriend) {
            return NextResponse.json(
                { error: "user already exsits in your friendlist" },
                { status: 401 }
            )
        }

        await prisma.friend.createMany({
            data: [
                {
                    senderId: userExist.id,
                    receiverId: friendUser.id
                },
                {
                    senderId: friendUser.id,
                    receiverId: userExist.id
                },
            ]
        })

        return NextResponse.json(

            { addfriend: friendUser.email, message: "Friend added successfully" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({ error: "Something wnet Wrong" }, { status: 500 })
    }

}

export async function GET(res: Response) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { message: "You are not authorize to this page" },
                { status: 402 }
            )
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email!
            }
        })
        const friendlist = await prisma.friend.findMany({
            where: {
                senderId: currentUser?.id
            },
            include: {
                receiver: {
                    include:{
                        userdetails:true
                        
                    }
                }
            },
        })

        return NextResponse.json(
            { friendlist }
        )

    } catch (error) {
        return NextResponse.json({ error: "Something wnet Wrong" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { message: "User Not found" },
                { status: 404 }
            )
        }

        const { coustumerId } = await req.json();

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!currentUser) {
            return NextResponse.json(
                { message: "User Not found" },
                { status: 404 }
            )
        }

        const friendUser = await prisma.user.findUnique({
            where: {
                coustumerId
            }
        })

        if (!friendUser) {
            return NextResponse.json(
                { message: "friend is not found" },
                { status: 404 }
            )
        }

        await prisma.friend.deleteMany({
            where: {
                OR: [
                    {
                        senderId: currentUser.id,
                        receiverId: friendUser.id
                    },
                    {
                        senderId: friendUser.id,
                        receiverId: currentUser.id
                    }
                ]
            }
        });

        return NextResponse.json(
            {message:"User delete successfully"},
            {status:400}
        )
    }
    catch (error) {
        return NextResponse.json({ error: "something went wrong" }, { status: 500 })
    }
}