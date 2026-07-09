import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./prisma";
import bcrypt from "bcryptjs";
export const authOptions = {
    session: {
        strategy: "jwt" as const,
    },
    providers: [
        CredentialsProvider({
            name: "Credential",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                console.log("AUTHORIZE CALLED");
                console.log(credentials);
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email,
                    }
                })
                console.log("User:", user);
                if (!user || !user.password) {
                    return null
                }
                const validPassword = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );
                console.log("Password Match:", validPassword);
                if (!validPassword) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}