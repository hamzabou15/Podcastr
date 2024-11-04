'use client'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Carousel from './Carousel';
import Header from './Header';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const RightSidebar = () => {

    const { user } = useUser();
    const topPodcasters = useQuery(api.users.getTopUserByPodcastCount)
    return (
        <section
            className='right_sidebar text-white-1'
        >
            <SignedIn >
                <Link className='flex gap-3 pb-12' href={`/profile/${user?.id}`}>
                    <UserButton />
                    <div className='flex w-full items-center justify-between'>
                        <h1 className='text-16 truncate font-semibold text-white-1'>{user?.firstName} {user?.lastName} </h1>
                        <Image
                            src='/icons/right-arrow.svg'
                            alt='arrow'
                            width={24}
                            height={24}
                        />
                    </div>
                </Link>
            </SignedIn>
            <section>
                <Header headerTitle='Fans Like You' />
                <Carousel
                    fansLikeDetail={topPodcasters!}
                />
            </section>
            <section className='flex flex-col gap-8 pt-12'>
                <Header headerTitle='Top Podcasters' />
                <div className='flex flex-col gap-5'>

                </div>
            </section>
        </section>
    )
}

export default RightSidebar
