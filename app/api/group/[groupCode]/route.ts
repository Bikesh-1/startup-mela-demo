import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params} : {params: Promise<{groupCode:string}>}
){
    try{
        const{groupCode} = await params;
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {error:"You are not authorize to axis this page"},
                {status:404}
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
            {groupDetails,message:"group find successfull"},
            {status:200}
        )
    }catch(error){
        return NextResponse.json(
            {error:"Internal server Error"},
            {status:500}
        )
    }
}