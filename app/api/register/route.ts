
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        // const session = await getServerSession(authOptions);

        const userExist = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userExist) {
            return NextResponse.json(
                { message: "An account with this email already exists. Please sign in." },
                { status: 409 }
            );
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const coustumeridGen = "SW" + Math.random().toString(36).substring(2, 8).toUpperCase();
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedpassword,
                coustumerId: coustumeridGen,
            },
        });
        return NextResponse.json(
            { email: user.email, message: "Account created successfully." },
            { status: 201 }
        );
    } catch {
        return NextResponse.json({ error: "An unexpected error occurred." },
            { status: 500 })
    }
}