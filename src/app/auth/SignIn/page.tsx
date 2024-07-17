'use client'
import { signIn } from 'next-auth/react';
import React from 'react';
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { FcGoogle } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignIn = () => {
const form = useForm();
const router = useRouter();

const handleSub = form.handleSubmit(async (data: any) => {
  

  const formData  = {
    email: data.email,
    password: data.password
  }

  await signIn('credentials', {
    ...formData,
    callbackUrl: '/dashboard',
  })
})

async function handleSignInWithGithub() {
  await signIn('github', {callbackUrl: '/dashboard'})
}

async function handleSignInWithGoogle() {
  await signIn('google', {callbackUrl: '/dashboard'})
}
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        <form onSubmit={handleSub}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <Input
              className="shadow  bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              required      
              type="email"
              {...form.register('email')}
              placeholder="Digite seu email"
            />
          </div>
          <div className="mb-6">
            <label className="block  text-gray-400 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <Input
              className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              required 
              type="password"
              placeholder="Digite sua senha"
              {...form.register('password')}
            />
          </div>
          <div className="flex items-center justify-center w-[50%] mx-auto">
           <Button type='submit' className='w-full'>
              Entra
           </Button>
          </div>
         
        </form>
        <div className="flex flex-row items-center justify-center gap-10 mt-10">
          <div className="flex items-center justify-center">
            <button onClick={handleSignInWithGithub} className="flex items-center justify-center w-12 h-12 bg-black rounded-full">
              <GitHubLogoIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={handleSignInWithGoogle} className="flex items-center justify-center w-12 h-12 bg-black rounded-full">
              <FcGoogle className="h-6 w-6 text-white sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center  justify-center w-[50%] mx-auto mt-10">
          <Button onClick={() => router.push('/auth/createAccounts')} className='flex items-center justify-center gap-2 border-2 border-gray-400 rounded-md p-2'>
              <FaUserPlus className='h-4 w-4 text-white' />
              <span className='text-white'>Criar conta</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
