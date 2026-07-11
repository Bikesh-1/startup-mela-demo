import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, mobileNumber, dateOfbirth } = await req.json()
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
                { error: "User Not found" },
                { status: 404 }
            )
        }
        // if (!userExist.isVerfied) {
        //     return NextResponse.json(
        //         { error: "Please verify your account first" },
        //         { status: 403 }
        //     )
        // }
        const existingDetails = await prisma.userdetails.findUnique({
            where: {
                user_id: userExist.id
            }
        });
        if (existingDetails) {
            return NextResponse.json(
                { error: "User Details Already Exist" },
                { status: 409 }
            )
        }
        const userdetails = await prisma.userdetails.create({
            data: {
                name: name,
                mobileNumber: mobileNumber,
                dateOfbirth: dateOfbirth,
                isprofileCompleted: true,
                user: {
                    connect: {
                        id: userExist.id
                    }
                }
            }
        })

        return NextResponse.json(
            { userdetails, message: "User Details Added Successfully" },
            { status: 200 }
        )

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something wnet Wrong" }, { status: 500 })
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
                { error: "User Not found" },
                { status: 404 }
            )
        }

        // const userDetails = await prisma.userdetails.findUnique({
        //     where: {
        //         user_id: userExist.id,
        //     },
        //     include:{
        //         user:{
        //             select:{
        //                 coustumerId:true
        //             }
        //         }
        //     }
        // })

        const userDetails = await prisma.userdetails.findUnique({
            where: {
                user_id: userExist.id,
            },
            include: {
                user: true,
            },
        });

        return NextResponse.json({ userDetails, message: "User details fetched successfully" }, { status: 200 })

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something wnet Wrong" }, { status: 500 })
    }
}