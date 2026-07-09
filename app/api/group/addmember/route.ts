import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { error } from "next/dist/build/output/log";
import { NextResponse } from "next/server";

export async function POST(req:Response){
    try{
        const {groupCode,coustumerId} = await req.json();
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {error:"You are not authorize to this page"},
                {status:400}
            )
        }
        const email = await session.user.email;
        const adminUser = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!adminUser){
            return NextResponse.json(
                {error:"you don't create your account"},
                {status:404}
            )
        }

        const friend = await prisma.user.findFirst({
            where:{
                coustumerId
            }
        })
        if(!friend){
            return NextResponse.json(
                {error:"your friend is not found"},
                {status:400}
            )
        }
        if(adminUser.id == friend.id){
            return NextResponse.json(
                {message:"You cannot add yourself"}
            )
        }

        const group = await prisma.group.findFirst({
            where:{
                groupCode,
                createdId:adminUser.id
            }
        })

        if(!group){
            return NextResponse.json(
                {error:"group not found try again"},
                {status:400}
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
        { error: "User already exists in this group" },
        { status: 400 }
    );
}

        const addMember = await prisma.groupmember.create({
            data:{
                userId:friend.id,
                groupId:group.id,
                // addMember:friend.id
                
            }
        })

        return NextResponse.json(
            {addMember, message:`You have successfully added your friend to the group "${group.groupName}"`},
            {status:200}
        )
    }
    catch(error){
        console.log(error)
        return NextResponse.json(
            {error:"Something went wrong"},
            {status:404}
        )
    }
    
}