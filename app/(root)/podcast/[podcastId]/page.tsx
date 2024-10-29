"use client"
import PodcastDetailsPlayer from '@/components/podcastDetailsPlayer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'

const PodcastDetails = ({ params: { podcastId } }:
  {
    params: { podcastId: Id<'podcasts'> }
  }
) => {

  const podcast = useQuery(api.podcast.getPodcastById, { podcastId })

  return (
    <section className='flex w-full flex-col '>
      <header className='mt-9 flex items-center justify-between'>
        <h1 className='text-20 font-bold text-white-1'>
          Currently Playing
        </h1>
        <figure className='flex gap-3'>
          <Image
            src='/icons/headphone.svg'
            width={24}
            height={24}
            alt='headphone'
          />
          <h2 className='text-16 font-bold text-white-1'>
            {podcast?.views}
          </h2>
        </figure>
      </header>
      <PodcastDetailsPlayer />
      <p className='text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center'>{podcast?.podcastDescription}</p>
    </section>
  )
}

export default PodcastDetails
