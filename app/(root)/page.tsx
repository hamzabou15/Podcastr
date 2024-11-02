"use client";
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard'
// import { podcastData } from '@/constants'
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react'
// import { useQuery } from "convex/react";
// import { api } from '@/convex/_generated/api';


const Home = () => {
  const podcasts = useQuery(api.podcast.getTrendingPodcasts);

  if (!podcasts) {

    return <LoaderSpinner />
  }


  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Trending Podcasts</h1>
      </section>

      <div className='podcast_grid'>
        {
          podcasts?.map(({ _id, podcastDescription, imageUrl, podcastTitle }) => (
            <PodcastCard
              key={_id}
              imgUrl={imageUrl as string}
              title={podcastTitle}
              description={podcastDescription}
              podcastId={_id}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Home
