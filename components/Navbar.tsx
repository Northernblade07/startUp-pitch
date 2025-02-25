import { auth ,signIn , signOut } from '@/auth'
// import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async() => {
    const session = await auth()
    console.log(session)
  return (
    <header className=' text-black px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex items-center justify-between'>
        <Link href={'/'}>
        <Image alt='logo' width={30} height={30}  src={'/logo.png'}></Image>
        </Link>

        <div className='flex items-center gap-5'>
      {session && session?.user ? (
        <div className='flex items-center gap-5'>
            <Link href={'/startup/create'}>create</Link>
            <form action={
                async()=>{
                    "use server"
                    await signOut({redirectTo:"/"})}}>
                <button type='submit'>logout</button>
            </form>
            {/* check the session id  */}
            <Link href={`/user/${session?.user?._id}`}>
            <span>{session?.user?.name}</span></Link>
          
        </div>
      ):(
        <div>
            <form action={async()=>{
                "use server"
                await signIn('github')}}>
                    <button type='submit'>
                    login
                    </button>
                    </form>
        </div>
      )}
        </div>

      </nav>
    </header>
  )
}

export default Navbar
