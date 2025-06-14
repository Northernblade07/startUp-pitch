import { formatDate } from '@/lib/utils'
import { Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'
import { Skeleton } from './ui/skeleton'

export type StartupTypeCard = Omit<Startup,"author"> & {author?:Author};
const StartupCard = ({item}:{item:StartupTypeCard}) => {
  return (
    <li className='startup-card group'>
      <div className='flex-between'>
        <p className='startup-card_date'>{formatDate(item._createdAt)}</p>
      <div className='flex gap-1.5'>
        <Eye className='size-6 text-primary'/> <span>{item.views}</span>
        </div>
      </div>

      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
            <Link href={`/user/${item.author?._id}`}>
            <p className='text-60-medium'>{item.author?.name}</p>
            </Link>
            <Link href={`/startup/${item._id}`}>
            <p className='text-26-semibold line-clamp-1'>
            {item.title}
            </p>
            </Link>
        </div>
      </div>
      <Link href={`/user/${item.author?._id}`}>
      <Image src={'https://placeholder.com/48x48'} width={48} height={48} alt='logo'></Image>
      </Link>
      <Link href={`/startup/${item._id}`} className=''>
            <p className='startup-card_desc'>{item.description}</p>
            <Image src={item.image} className='startup-card_img' alt="placeholder" />
      </Link>
      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${item.category?.toLowerCase()}`}>
        <p className='text-16-medium'>{item.category}</p></Link>
      <Button className='startup-card_btn' asChild>
        <Link href={`/startup/${item._id}`}>Details</Link>
      </Button>
      </div>
    </li>
  )
};

export const StartupCardSkeleton = ()=>{
  return<>
  {[0,1,2,3,4].map((i)=>(
    <li key={i}>
    <Skeleton className='startup-card_skeleton'/>
    </li>
))}
  </>
}

export default StartupCard
