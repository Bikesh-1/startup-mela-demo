import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { groupName, description, monthlyContribution, dueDate, totalAmount } = await req.json();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "you are not authorize to access this page" },
                { status: 404 }
            )
        }
        const email = session.user.email;
        const userExist = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!userExist) {
            return NextResponse.json(
                { error: "you don't create your account first create your account first" },
                { status: 404 }
            )
        }
        const groupCode = "SWG" + Math.random().toString(36).substring(2, 8).toUpperCase();
        const createGroup = await prisma.group.create({
            data: {
                groupName,
                groupCode,
                description,
                monthlyContribution,
                dueDate,
                totalAmount,
                createdBy: {
                    connect: {
                        id: userExist.id,
                        email: userExist.email
                    }

                }
            }
        })
        return NextResponse.json(
            { createGroup, message: "Congratulation, you sucessfully created your group" },
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 404 }
        )
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "You are not authorize to access this page" },
                { status: 401 }
            )
        }
        const email = session.user.email as string;
        const userExist = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        if (!userExist) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            )
        }

        const groupDetails = await prisma.group.findMany({
            where: {
                OR: [
                    {
                        createdId: userExist.id,
                    },
                    {
                        groupmember: {
                            some: {
                                userId: userExist.id,
                            },
                        },
                    },
                ],
            },
            include: {
                groupmember: true,
                contribution: true,
                message: true,
                createdBy: true,
            },
        });
        return NextResponse.json({ groupDetails, message: "Group Not Found" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}