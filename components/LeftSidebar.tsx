"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

const LeftSidebar = () => {

    const pathname = usePathname();
    const router = useRouter();
    const { signOut } = useClerk()
    return (
        <section className='left_sidebar '>
            <nav className='flex flex-col gap-6 '>
                <Link href="/" className='flex cursor-pointer items-center
                gap-2 pb-10 max-lg:justify-center
            '>
                    <Image
                        alt='logo'
                        src={"/icons/logo.svg"}
                        width={23}
                        height={27}
                    ></Image>
                    <h1
                        className='text-24 font-extrabold text-white max-lg:hidden'
                    >Podcastr</h1>
                </Link>
                {sidebarLinks.map(({ route, label, imgURL }) => {

                    const isActive = pathname === route || pathname.startsWith
                        (`${route}/`);

                    return <Link
                        className=
                        {cn('flex gap-3 py-4 items-center max-lg:px-4  lg:justify-start', {

                            'bg-nav-focus border-r-4 border-orange-1 ': isActive
                        })}
                        href={route} key={label}>
                        <Image
                            alt={label}
                            src={imgURL}
                            width={24}
                            height={24}
                        >
                        </Image>
                        <p>{label}</p>

                    </Link>
                })}
            </nav>
            <SignedOut>
                <div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
                    <Button asChild className='text-16 bg-orange-1 font-extrabold'>
                        <Link href="/sign-in">Sign in</Link>
                    </Button>
                </div>
            </SignedOut>
            <SignedIn>
                <div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
                    <Button onClick={() => signOut(() => router.push('/') )}  className='text-16 bg-orange-1 font-extrabold'>
                        Log out
                    </Button>
                </div>
            </SignedIn>
        </section>
    )
}

export default LeftSidebar