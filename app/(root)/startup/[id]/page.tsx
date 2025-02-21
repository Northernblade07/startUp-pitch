// import { sanityFetch } from '@/sanity/lib/live';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
// import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

const md = markdownit()
// install npm i  markdown-it to get a markdown 

// first update the next.config file and add the exoerimental feild with ppr for ppr rendering then define a export const variable and set it to true 
// also install new version of npm i next@canary to make it work 
export const experimental_ppr = true;

const page = async({params}:{params:Promise<{id:string}>}) => {
   const id = (await params).id;
    // console.log(id);
    const post = await client.fetch(STARTUP_BY_ID_QUERY ,{id})
    if (!post) return notFound();
    console.log(post)
    const parsedContent = md.render(post?.pitch || '');

  return (
    <>
    <section className='pink_container !min-h-[230px]'>
      <div>
        <p className='tag'>{formatDate(post?._createdAt)}</p>
      </div>
      <h1 className='text-3xl heading'>{post.title}<br /></h1> 
      <p className='sub-heading'>{post.description}</p>
    </section>
    <section className='section_container'>
   <img src={post.image} alt='thumbnail' className='w-full h-auto rounded-xl'/>
   <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
    <div className='flex-between'>
      <Link href={`user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>
      <img src={post.author.image} alt='author image' height={64} width={64} className='rounded-full drop-shadow-lg'/>

      <div>
        <p className='text-20-medium'>{post.author.name}</p>
        <p className='text-16-medium'>@{post.author.username}</p>
      </div>
      </Link>

      <p className='category-tag'>{post.category}</p>

    </div>
    <h3 className='text-30-bold'>PITCH DETAILS</h3>
 <h3>{parsedContent?(
  <article className='max-w-4xl prose font-work-sans break-all' dangerouslySetInnerHTML={{ __html: parsedContent}}/>
 ):(
  <div><p className='no-result'> No details Provided</p></div>
 )}</h3>
   </div>
   <hr />
    </section>
    <Suspense fallback={<Skeleton className='view_skeleton'/>}>
     <View id={id}/>
    </Suspense>
      
    </>
  )
}

export default page
