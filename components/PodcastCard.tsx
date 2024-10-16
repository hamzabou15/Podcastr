import Image from 'next/image'
import React from 'react'

const PodcastCard = ({ podcastId, description, imgURL, title }: {
    imgURL: string,
    title: string,
    description: string,
    podcastId: number
}) => {
    return (
        <div className='cursor-pointer'>
            <figure className='flex flex-col gap-2'>
                <Image
                    src={imgURL}
                    width={174}
                    height={174}
                    alt={title}
                >

                </Image>
                    {podcastId}
                    {description}
            </figure>
        </div>
    )
}

export default PodcastCard
