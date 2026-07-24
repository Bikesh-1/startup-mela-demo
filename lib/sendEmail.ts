import VerifyEmail from "@/email/VerifyEmail";
import { resend } from "./resend";

export async function sendVerificationEmail(
    email: string,
    verifyUrl: string
) {
    await resend.emails.send({
        from: "ShareWallet <onboarding@resend.dev>",
        to: "bikeshsharma2571@gmail.com",
        subject: "Verify your email",
        react: VerifyEmail({
      verifyUrl,
    }),
    });
}