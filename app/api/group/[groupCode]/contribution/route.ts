import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ groupCode: string }> }) {
    try {
        const { groupCode } = await params;
        const { amount, month, year } = await req.json();
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
        const existingContribution = await prisma.contribution.findFirst({
            where: {
                userId: user.id,
                groupId: group.id,
                month,
                year,
            },
        });
        if (existingContribution) {
            return NextResponse.json(
                { error: "You have already contributed for this month." },
                { status: 400 }
            );
        }
        await prisma.contribution.create({
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

export async function GET(req: Request, { params }: { params: Promise<{ groupCode: string }> }) {
    try {
        const { groupCode } = await params;
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "You are not authorize to acess this page" },
                { status: 404 }
            )
        }

        const contributionDetails = await prisma.contribution.findMany({
            where: {
                group: {
                    groupCode
                }
            },
            include: {
                user: {
                    include: {
                        userdetails: true
                    }
                }
            }
        });
        return NextResponse.json(
            { contributionDetails, message: "user contribution details found" },
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Internal server Error" },
            { status: 500 }
        )
    }

}