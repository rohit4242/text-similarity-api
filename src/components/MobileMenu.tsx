'use client'

import { Info, LayoutDashboard, Loader2, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu'
import { toast } from '@/ui/Toast'

const MobileMenu = () => {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const signUserOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
    } catch (error) {
      toast({
        title: 'Error signing out',
        message: 'Please try again later.',
        type: 'error',
      })
    }
  }

  return (
    <nav className='fixed left-0 right-0 z-50 flex justify-center md:hidden bottom-20'>
      <div className='rounded-md shadow-2xl outline outline-2 outline-white dark:outline-slate-900'>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild onClick={() => setOpen((prev) => !prev)}>
            <Button variant='outline' size='lg'>
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuGroup onClick={() => setOpen(false)}>
              <DropdownMenuItem asChild>
                {session ? (
                  <Link
                    href='/dashboard'
                    className='w-full flex items-center gap-1.5'>
                    <LayoutDashboard className='w-5 h-5 mr-2' />
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href='/login'
                    className='flex w-full items-center gap-1.5'>
                    <LayoutDashboard className='w-5 h-5 mr-2' />
                    <span>Sign in</span>
                  </Link>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href='/documentation'
                  className='w-full flex items-center gap-1.5'>
                  <Info className='w-5 h-5 mr-2' />
                  <span>Docs</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signUserOut} className='gap-1.5'>
                <User className='w-5 h-5 mr-2' />
                <span>{isLoading ? 'Signing out' : 'Sign out'}</span>
                {isLoading ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : null}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default MobileMenu