import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v4 as uuid } from "uuid";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email is required." },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 }
            );
        }

        if (user.isVerified) {
            return NextResponse.json(
                { message: "Email is already verified." },
                { status: 400 }
            );
        }

        // Delete old verification tokens
        await prisma.verificationToken.deleteMany({
            where: {
                userId: user.id,
            },
        });

        // Create new token
        const token = uuid();

        const expiresAt = new Date(
            Date.now() + 1000 * 60 * 60
        );

        await prisma.verificationToken.create({
            data: {
                token,
                userId: user.id,
                expiresAt,
            },
        });

        const verifyUrl =`${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

        await sendVerificationEmail(
            user.email,
            verifyUrl
        );

        return NextResponse.json(
            {
                message: "Verification email sent successfully.",
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}