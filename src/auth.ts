import NextAuth from "next-auth";
import Github from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "../db";



const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const AUTH_SECRET = process.env.AUTH_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('Missing github oauth credentials')
}

export const { handlers: { GET, POST }, auth, signOut, signIn } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        })
    ],
    // Добавьте эти настройки
    pages: {
        signIn: '/auth/signin',  // страница входа
        signOut: '/auth/signout',// страница выхода
        error: '/auth/error',    // страница ошибки
    },
    // Добавьте базовый URL
    callbacks: {
        async redirect({ url, baseUrl }) {
            // После успешной авторизации редирект на главную
            return baseUrl
        },
        async session({session, user}: any) {
            if(session && user){
                session.user.id = user.id
            }
            return session;
        }
    },
})