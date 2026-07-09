import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { error } from "next/dist/build/output/log";
import { NextResponse } from "next/server";
import { use } from "react";

export async function POST(req: Request) {
    try {
        const { groupCode, amount, month, year } = await req.json();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "you are not authorize to access this page" },
                { status: 400 }
            )
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!user) {
            return NextResponse.json(
                { error: "you don't create your account" },
                { status: 404 }
            )
        }

        const group = await prisma.group.findFirst({
            where: {
                groupCode,
                OR: [
                    {
                        createdId: user.id
                    },
                    {
                        groupmember: {
                            some: {
                                userId: user.id
                            }
                        }
                    }
                ]
            }
        });

        if (!group) {
            return NextResponse.json(
                { error: "User not find in the group" },
                { status: 400 }
            )
        }

        await prisma.contribution.createMany({
            data: {
                userId: user.id,
                groupId: group.id,
                // useremail: user.email,
                // groupCode: group.groupCode,
                amount: amount,
                month: month,
                year: year

            }
        })


        return NextResponse.json(
            { message: "you succesfully contribut in group" },
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}