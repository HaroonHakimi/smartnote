import Image from 'next/image'
import React from 'react'

const SideBar = () => {
  return (
    <div className='shadow-sm h-screen'>
      <Image src={'/logo.svg'} alt='logo' width={200} height={100}/>
    </div>
  )
}

export default SideBar