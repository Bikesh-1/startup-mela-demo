import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { error } from "next/dist/build/output/log";
import { NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: Promise<{ groupCode: string }> }) {
    try {

        const { groupCode } = await params;
        const { message } = await req.json();

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
        })
        if (!user) {
            return NextResponse.json(
                { error: "User account not found." },
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
        })
        if (!group) {
            return NextResponse.json(
                { error: "Group not found or you are not a member of this group." },
                { status: 404 }
            )
        }
        const newMessage = await prisma.message.create({
            data: {
                userId: user.id,
                groupId: group.id,
                message
            }
        })
        return NextResponse.json(
            { data: newMessage, message: "message sent successfully" },
            { status: 201 }
        )
    } catch {
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        )
    }
}

export async function GET(
    req: Request,
    { params }: {
        params: Promise<{
            groupCode: string;
        }>;
    }
) {

    const { groupCode } = await params;

    const group = await prisma.group.findUnique({
        where: {
            groupCode,
        },
    });

    if (!group) {
        return NextResponse.json({
            data: [],
        });
    }

    const messages = await prisma.message.findMany({

        where: {
            groupId: group.id,
        },

        include: {

            user: {

                include: {

                    userdetails: true,

                },

            },

        },

        orderBy: {

            createdAt: "asc",

        },

    });

    return NextResponse.json({

        data: messages,

    });

}