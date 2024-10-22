"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LeftSidebar = () => {

    const pathname = usePathname();
    // const router = useRouter();

    return (
        <section className='left_sidebar '>
            <nav className='flex flex-col gap-6 '>
                <Link href="/" className='flex cursor-pointer items-center
                gap-1 pb-10 max-lg:justify-center
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
                        {cn('flex gap-3 py-4 items-center max-lg:px-4 justify-center lg:justify-start', {

                            'bg-nav-focus border-r-4 border-orange-1 ':isActive
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
        </section>
    )
}

export default LeftSidebar