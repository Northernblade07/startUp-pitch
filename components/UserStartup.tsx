import { client } from '@/sanity/lib/client'
import { STARTUPS_BY__AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { StartupTypeCard } from './StartupCard'

const UserStartup=async({id}:{id:string}) => {
// console.log(id,"compo")
    const Startups = await client.fetch(STARTUPS_BY__AUTHOR_QUERY,{id:id})
    console.log(Startups)
  return (
    <>
    {Startups.length>0? Startups.map((startup:StartupTypeCard)=>(<StartupCard key={startup._id} item={startup}/>)):(<p>no posts yet</p>)}  
    </>
  )
 }

export default UserStartup
