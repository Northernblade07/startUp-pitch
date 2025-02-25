import { auth } from '@/auth';
import { StartupCardSkeleton } from '@/components/StartupCard';
import UserStartup from '@/components/UserStartup';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

export const experimental_ppr = true;

const page = async({params}:{params:Promise<{id:string}>}) => {

    const id = (await params).id;

    const session = await auth();

    // const id = session.user._id
 console.log(id)
 const user = await client.fetch(AUTHOR_BY_ID_QUERY,{id:id})
 if (!user) return notFound();
 if (user) {
    
     console.log(user);
    }

    // const Startups = await client.fetch(STARTUP_BY_ID_QUERY,{id:user._id})

    // console.log(Startups)
  return (
    <>
      <section className='profile_container'>
        <div className='profile_card'>
    <div className='profile_title'>
        <h3 className='text-24-black text-center uppercase line-clamp-1'>{user.name}</h3>
    </div>

    <Image src={user.image} alt='profile' height={220} width={220} className='profile_image'/>

    <p className="text-center mt-7 text-30-extrabold ">@{user.username}</p>
        
        <p className='mt-1 text-center text-14-normal '>bio:{user?.bio}</p>
        
        
    </div>
<div>
        <p>{session.id === user._id?"YOUR":"ALL"}Startups</p>

        <ul className='card_grid-sm'>
            <Suspense fallback={<StartupCardSkeleton/>}>
            <UserStartup  id={user._id}/>
            </Suspense>
        </ul>

</div>


        </section> 
    </>
  )
}

export default page
