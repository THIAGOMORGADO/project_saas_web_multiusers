'use server'

import { toast } from '@/components/ui/use-toast';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';


export async function create_Accounts(data: any) {
  const prisma = new PrismaClient();

  const emailExit = await prisma.user.findFirst({
    where: {
      email: data.email
    }
  })

  if (emailExit) {
  
      toast({
        title: 'Email já cadastrado',
        description: 'Você já possui uma conta',
        variant: 'destructive',
        
      })
 
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: passwordHash,
      role: 'user',
    }
  })
  return newUser;

  
}