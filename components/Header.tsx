import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

const Header = ({ headerTitle, titleClasssName }: {
    headerTitle?: string; titleClasssName?: string
}) => {
    return (
        <div className='flex items-center justify-between'>
            {
                headerTitle ? (
                    <h1 className={cn('text-18 font-bold text-white-1', titleClasssName)}>{headerTitle}</h1>
                ) :
                    <div></div>}
            <Link href="/discover" className='text-16 font-semibold text-orange-1'>
                See all
            </Link>

        </div>
    )
}

export default Header
