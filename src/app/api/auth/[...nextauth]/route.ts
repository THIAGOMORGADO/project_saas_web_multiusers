import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handlers  =NextAuth({

  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    newUser: '/private'
  },
  
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = [
          {
            id: '1',
            name: 'Thiago',
            password: '123',
            email: 'thiago@teste.com',
            role: 'admin'
          },
          {
            id: '2',
            name: 'Thiago',
            password: '123',
            email: 'thiago@teste.com',
            role: 'user'
          }
        ]
       
       if(!credentials) {
        return null
       }
       
       const foundUser = user.find(u => u.email === credentials.email);
       if (!foundUser) {
         return null;
       }

       const isValidPassword = credentials.password === foundUser.password;

       if (!isValidPassword) {
         return null;
       }


       if(credentials.email === 'thiago@teste.com' && credentials.password === '123') {
         return foundUser
       }
       console.log(credentials)
        return foundUser
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization:{
        params: {
          prompt: 'consent',
          access_type: 'offline'
        }
      }
    })
  ],
  // adapter: PrismaAdapter(prisma),
})

export { handlers as GET, handlers as POST };
