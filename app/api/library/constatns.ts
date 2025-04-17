import { prisma } from "@/db";
import { AuthOptions } from "next-auth";
import { comparePassword, hashPassword } from "@/app/api/library/helpers";
import { Credentials } from "@/app/library/types";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                cPassword: { label: "Confirm Password", type: "password" },
                rememberMe: { label: "Remember Me", type: "checkbox" },
                type: { label: "Action Type", type: "text" }
            },
            async authorize(creadentials) {
                try {
                    const request = creadentials as Credentials;
                    console.log("authorised", { request });

                    var user;
                    if (request.type == "login") {
                        let PrismaUser = await prisma.user.findUnique({
                            where: {
                                email: request.email
                            }
                        });
                        if (!PrismaUser) return null;
                        console.log({ PrismaUser })

                        var isCorrectPassword = comparePassword(request.password, PrismaUser.password);

                        if (!isCorrectPassword) return null;

                        user = {
                            id: PrismaUser.userId,
                            name: PrismaUser.name,
                            email: PrismaUser.email,
                            type: PrismaUser.type,
                            rememberMe: request.rememberMe == "true"
                        };
                    } else {
                        let PrismaUser = await prisma.user.create({
                            data: {
                                email: request.email,
                                password: hashPassword(request.password)
                            }
                        });

                        user = {
                            id: PrismaUser.userId,
                            name: PrismaUser.name,
                            email: PrismaUser.email,
                            type: PrismaUser.type,
                            rememberMe: request.rememberMe == "true"
                        }

                        await prisma.profile.create({
                            data: {
                                userId: user.id
                            }
                        })
                    }

                    return user;
                } catch (e) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.id) {
                session.user.id = token.id
                session.user.type = token.type;
                session.expires = new Date(Date.now() + ((token.rememberMe ? 6 : 1) * 24 * 60 * 60 * 1000)).toString()
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.type = user.type;
                token.rememberMe = user.rememberMe;
                token.exp = new Date(Date.now() + ((user.rememberMe ? 6 : 1) * 24 * 60 * 60 * 1000)).toString();
            }
            return token;
        }
    },
    pages: {
        signIn: "/auth",
    },
    session: {
        strategy: "jwt",

    },
    secret: process.env.NEXTAUTH_SECRET
}