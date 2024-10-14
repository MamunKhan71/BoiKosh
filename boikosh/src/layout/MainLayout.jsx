import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
    return (
        <div className='relative space-y-7 font-primary text-lg'>
            <div class="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className='h-screen container mx-auto mt-4  space-y-7 '>
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout