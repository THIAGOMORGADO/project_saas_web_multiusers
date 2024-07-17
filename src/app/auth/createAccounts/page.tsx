'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from "@/components/ui/use-toast";
import { create_Accounts } from '@/app/actions/createNewAccoutcs';
import { useRouter } from 'next/navigation';

const schema = yup.object({
  name: yup.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  email: yup.string().email({ message: 'Email inválido' }),
  password: yup.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
  confirmPassword: yup.string().min(6, { message: 'Confirme sua senha' }),
});

export default function CreateAccounts() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data: any) => {
    try {
      const newUser = await create_Accounts(data);
      toast({
        className: 'bg-green-500 text-white border-none',
        title: 'Conta criada com sucesso',
        description: 'Você já pode fazer login',
      })
      router.push('/auth/SignIn')
      reset(); // Reset the form fields
    } 
    catch (error) {
      console.log(error);
      toast({
        className: 'bg-red-500 text-white border-none relative bottom-[50%] right-0',
        title: 'Erro ao criar conta',
        description: 'Email já cadastrado',
      })
    }
  }
  return(
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Criar Conta</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">
            Nome
          </Label>
          <Input
            className="bg-white  border rounded w-full py-2 px-3 text-gray-700 "
            {...register('name')}
            required
            type="text"
            placeholder="Digite seu nome"
          />
          <span className='text-red-500 text-sm mt-2'>{errors.name?.message}</span>
        </div>
        <div className="mb-4">
          <Label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
            Email
          </Label>
          <Input
            className=" bg-white  border rounded w-full py-2 px-3 text-gray-700 "
            type="email"
            {...register('email')}
            required
            placeholder="Digite seu email"
          />
        </div>
        <div className="">
          <Label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
            Senha
          </Label>
          <Input
            className=" bg-white  border rounded w-full py-2 px-3 text-gray-700 mb-3 "
            type="password"
            {...register('password')}
            required
            placeholder="Digite sua senha"
          />
        </div>
        <div className="mb-6">
          <Label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
            Confirme a Senha
          </Label>
          <Input
            className=" bg-white  border rounded w-full py-2 px-3 text-gray-700 mb-3 "
            type="password"
            {...register('confirmPassword')}
            required
            placeholder="Digite sua senha"
          />
        </div>
        <div className="flex items-center justify-center w-[50%] mx-auto">
          <Button type="submit" className="w-full text-white font-bold py-2 px-4 rounded ">
            Criar Conta
          </Button>
        </div>
      </form>
    </div>
  </div>
  )
}