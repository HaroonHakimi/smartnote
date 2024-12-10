import React from 'react'
import { Button } from './ui/button'
import NavBar from './NavBar'
import Hero from './Hero'
import { Inter } from 'next/font/google'
import CallToAction from './CallToAction'
import Footer from './Footer'

const inter = Inter({ subsets: ['latin'] })


const LandingPage = () => {
  return (
    <div className={`${inter.className} bg-black`}>
        <NavBar/>
        <Hero/>
        <CallToAction/>
        <Footer/>
    </div>
  )
}

export default LandingPage