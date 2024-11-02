"use client"
import EmptyState from '@/components/EmptyState'
import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastDetailsPlayer from '@/components/PodcastDetailsPlayer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'

const PodcastDetails = ({ params: { podcastId } }:
  {
    params: { podcastId: Id<'podcasts'> }
  }
) => {

  // get the podcast by its id
  const podcast = useQuery(api.podcast.getPodcastById, { podcastId })

  // get the user from clerk
  const { user } = useUser();

  // check if the connected user is the owner of the podcast
  const isOwner = user?.id === podcast?.authorId;


  // get the similars podcasts by its voice Types
  const similarPodcast = useQuery(api.podcast.getPodcastByVoiceType, { podcastId })
  if (!similarPodcast || !podcast) {

    return <LoaderSpinner />
  }



  console.log("similarPodcast", similarPodcast)
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
      <PodcastDetailsPlayer
        isOwner={isOwner}
        podcastId={podcast._id}
        {...podcast}
      />
      <p className='text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center'>{podcast?.podcastDescription}</p>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-18 font-bold text-white-1'>Transcription</h1>
          <p className='text-white-2 font-medium'>{podcast?.voicePrompt}</p>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-18 font-bold text-white-1'>Thumnail Prompt</h1>
          <p className='text-white-2 font-medium'>{podcast?.imagePrompt}</p>
        </div>
      </div>
      <section className='mt-8 flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Similar Podcasts</h1>
        {
          similarPodcast.length !== 0 ?
            <div className='podcast_grid'>

              {similarPodcast.map((podcast) =>
                <div key={podcast._id} className='cursor-pointer' >
                  <figure className='flex flex-col gap-2' >
                    <Image
                      src={`${podcast.imageUrl}`}
                      width={174}
                      height={174}
                      alt={podcast.podcastTitle}
                      unoptimized
                      className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px]'
                    >

                    </Image>
                    <div className="flex flex-col">
                      <h1 className="text-16 truncate font-bold text-white-1">{podcast.podcastTitle}</h1>
                      <h2 className="text-12 truncate font-normal capitalize text-white-4">{podcast.author}</h2>
                    </div>
                  </figure>
                </div>

              )}
            </div>
            : (
              <div className='w-full'>
                <EmptyState
                  title="No similar podcasts found"
                  buttonLink="/discover"
                  buttonText="Discover more podcasts"
                />
              </div>
            )
        }


      </section>
    </section>
  )
}

export default PodcastDetails
