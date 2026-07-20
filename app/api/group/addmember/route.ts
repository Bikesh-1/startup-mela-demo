import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { groupCode, coustumerId } = await req.json();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in to continue." },
                { status: 401 }
            )
        }
        const email = await session.user.email;
        const adminUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!adminUser) {
            return NextResponse.json(
                { error: "User account not found." },
                { status: 404 }
            )
        }

        const friend = await prisma.user.findFirst({
            where: {
                coustumerId
            }
        })
        if (!friend) {
            return NextResponse.json(
                { error: "No user found with the provided customer ID." },
                { status: 404 }
            )
        }
        if (adminUser.id == friend.id) {
            return NextResponse.json(
                { error: "You cannot add yourself to the group." },
                { status: 400 }
            )
        }

        const group = await prisma.group.findFirst({
            where: {
                groupCode,
                createdId: adminUser.id
            }
        })

        if (!group) {
            return NextResponse.json(
                { error: "Group not found or you do not have permission to manage this group." },
                { status: 404 }
            )
        }

        const existingMember = await prisma.groupmember.findFirst({
            where: {
                groupId: group.id,
                userId: friend.id
            }
        })

        if (existingMember) {
            return NextResponse.json(
                { error: "This user is already a member of the group." },
                { status: 409 }
            );
        }

        const addMember = await prisma.groupmember.create({
            data: {
                userId: friend.id,
                groupId: group.id,
                // addMember:friend.id

            }
        })

        return NextResponse.json(
            { addMember, message: `user has been added to You have successfully added your friend to the group "${group.groupName}"` },
            { status: 201 }
        )
    }
    catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "An unexpected error occurred while adding the member." },
            { status: 500 }
        )
    }

}