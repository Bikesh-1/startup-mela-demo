import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "Token is required." },
        { status: 400 }
      );
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { message: "Invalid verification link." },
        { status: 400 }
      );
    }

    if (verificationToken.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "Verification link has expired." },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: {
        id: verificationToken.userId,
      },
      data: {
        isVerfied: true,
      },
    });

    await prisma.verificationToken.delete({
      where: {
        id: verificationToken.id,
      },
    });

    return NextResponse.json(
      { message: "Email verified successfully." },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}