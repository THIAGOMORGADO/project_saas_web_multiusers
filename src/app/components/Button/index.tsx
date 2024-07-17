'use client'
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import React from 'react';

type LogOutButtonProps = {
  children: React.ReactNode
  className: string,
}

export function LogOutButton ({children, className}: LogOutButtonProps) {
  return <Button className={className} onClick={() => signOut()}>{children}</Button>;
}

export function OpenMenuButton ({children, className}: LogOutButtonProps) {
  return <Button className={className} onClick={() => alert('Open menu aaa')}>{children}</Button>;
}
