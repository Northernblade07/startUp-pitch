import { client } from '@/sanity/lib/client'
import React from 'react'
import Ping from './Ping'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { after } from 'next/server'
import { writeClient } from '@/sanity/lib/write-client'

const View = async({id}:{id:string}) => {

    const {views:totalView} = await client.withConfig({useCdn:false}).fetch(STARTUP_VIEWS_QUERY,{id});

    // for updating the views number of a startup
    after(async()=>{
      await writeClient.patch(id).set({views:totalView+1}).commit();
    })
      return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2 '>
        <Ping/>
      </div>
      <p className='view-text'>
        <span className='font-black'>
            views:{totalView}
            </span>
            </p>
    </div>
  )
}

export default View
