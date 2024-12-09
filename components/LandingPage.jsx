import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import NavBar from './NavBar'
import Hero from './Hero'
// import { Roboto } from 'next/font/google'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


const LandingPage = () => {
  return (
    <div className={`${inter.className} `}>
        <NavBar/>
        <Hero/>
    </div>
  )
}

export default LandingPage