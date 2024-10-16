import React from 'react'
import Header from '../../components/Header'
import BookSection from './BookSection'

const Homepage = () => {
    return (
        <div className='space-y-12 pb-24'>
            <Header />
            <BookSection />
        </div>
    )
}

export default Homepage