import { formatDate } from '@/lib/utils'
import { Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const StartupCard = ({item}:{item:StartupTypeCard}) => {
  return (
    <li className='startup-card group'>
      <div className='flex-between'>
        <p className='startup-card_date'>{formatDate(item._createdAt)}</p>
        {/* <Image alt='image' src={item?.image} width={100} height={100} ></Image> */}
      <div className='flex gap-1.5'>
        <Eye/> <span>{item.views}</span>
        {item.title}
        </div>
      </div>

      <div className='flex-between mt-5 gap-5'>
            <Link href={`/user/${item.author._id}`}>
            <p className='text-60-medium'>{item.author.name}</p>
            </Link>
            <Link href={`/startup/${item._id}`}>
            <p className='text-26-semibold line-clamp-1'>
            {item.title}
            </p>
            </Link>
      </div>
      <Link href={'/user/${item.author._id}'}>
      {/* <Image src={'https://placeholder.co/600x400'} width={48} height={48} alt='logo'></Image> */}
      </Link>
      <div className=''>
            
            <p className='startup-card_desc'>{item.description}</p>
            <img src={item.image} className='startup-card_img' alt="" />
      </div>
      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${item.category}`}>
        <p className='text-16-medium'>{item.category}</p></Link>
      </div>

      <Button className='startup-card_btn' asChild>
        <Link href={`/startup/${item._id}`}>Details</Link>
      </Button>
    </li>
  )
}

export default StartupCard
