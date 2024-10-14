import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className='container mx-auto mt-4'>
            {/* navbar */}
            <Outlet />
            {/* footer */}
        </div>
    )
}

export default MainLayout