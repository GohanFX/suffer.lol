import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full flex h-[48px] bg-zinc-800'>
        <div className='flex items-center justify-between w-full max-w-[1200px] mx-auto px-4'>
            <div className='flex items-center space-x-4'>
            <Link href={'/'} className='text-white font-semibold tracking-tighter'><span className='font-extrabold text-lg'>Suffer</span>.gg</Link>
            </div>
            <div className='flex items-center space-x-4'>
            <Link href='/' className='text-white hover:text-white/80'>Home</Link>
            <Link href='/champions' className='text-white hover:text-white/80'>Champions</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar