import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ groupCode: string }> }
) {
    try {
        const { groupCode } = await params;
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in to continue."},
                { status: 401 }
            )
        }
        const groupDetails = await prisma.group.findUnique({
            where: {
                groupCode,
            },
            include: {
                groupmember: {
                    include: {
                        user: {
                            include: {
                                userdetails: true,
                            },
                        },
                    },
                },
            },
        });
        return NextResponse.json(
            { groupDetails, message: "Group details retrieved successfully.", },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "An unexpected error occurred while fetching group details." },
            { status: 500 }
        )
    }
}