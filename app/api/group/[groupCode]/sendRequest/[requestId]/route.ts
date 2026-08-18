import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ groupCode: string, requestId: string }> }) {
    try {
        const { groupCode, requestId } = await params;
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in to continue." },
                { status: 401 }
            )
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        if (!user) {
            return NextResponse.json(
                { error: "User account not found." },
                { status: 404 }
            );
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
                {
                    error: "Group not found or you are not a member of this group.",
                },
                { status: 404 }
            );
        }
        const sentRequestDetails = await prisma.sentrequest.findFirst({
            where: {
                id: requestId,
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
            { sentRequestDetails, message: "Request details retrieved successfully." },
            { status: 200 }
        )
    } catch {
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        )
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ groupCode: string, requestId: string }> }) {
    try {
        const { groupCode, requestId } = await params;
        const { status } = await req.json();
        if (status !== "ACCEPTED" && status !== "REJECTED") {
            return NextResponse.json(
                { error: "Invalid status." },
                { status: 400 }
            );
        }
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in to continue." },
                { status: 401 }
            )
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        if (!user) {
            return NextResponse.json(
                { error: "User account not found." },
                { status: 404 }
            );
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
                {
                    error: "Group not found or you are not a member of this group.",
                },
                { status: 404 }
            );
        }
        const request = await prisma.sentrequest.findFirst({
            where: {
                id: requestId,
                groupId: group.id
            }
        });

        if (!request) {
            return NextResponse.json(
                { error: "Request not found." },
                { status: 404 }
            );
        }

        const statusDecided = await prisma.sentrequest.update({
            where: {
                id: requestId
            },
            data: {
                status,
                actionAt: new Date()
            }
        })


        return NextResponse.json(
            { statusDecided, message: "Status Changed " },
            { status: 200 }
        )


    } catch {
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        )
    }
}