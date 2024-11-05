"use client"
import EmptyState from '@/components/EmptyState'
import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import Searchbar from '@/components/Searchbar'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { usePathname } from 'next/navigation'
import React from 'react'

const Discover = ({ searchParams: { search} }: { searchParams : { search: string }}) => {


    const podcastData = useQuery(api.podcast.getPodcastBySearch, { search: search || '' })

    console.log("podcastData" , podcastData)

    return (
        <div className='flex flex-col gap-9'>
            <Searchbar />
            <div className='flex flex-col gap-9'>
                <h1 className='text-20 font-bold text-white-1'>Discover</h1>
                {podcastData ?
                    <>
                        {podcastData.length > 0 ? (
                            <div className='podcast_grid'>
                                {
                                    podcastData?.map(({ _id, podcastDescription, imageUrl, podcastTitle }) => (
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
                        ) : <EmptyState title='No results found' />
                        }
                    </>
                    : <LoaderSpinner />
                }
            </div>
        </div>
    )
}

export default Discover
