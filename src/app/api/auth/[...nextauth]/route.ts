import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const { handlers, auth, signIn, signOut } =NextAuth({
  adapter: PrismaAdapter(prisma), // Ensure this matches the updated import
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
      clientId: 'Ov23lis7k5GsGujODLMF',
      clientSecret: '4a91e955a34674d575e737d0917e67e5a76c90d0'
    }),
    GoogleProvider({
      clientId: '300185906040-damiabidc6eu2qhbne6bveiu4aob7ath.apps.googleusercontent.com',
      clientSecret: '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',

      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ]
  
})