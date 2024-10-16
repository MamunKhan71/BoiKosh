import { ArrowRight, BookHeart, LibraryBig } from 'lucide-react'
import React from 'react'

const Header = () => {
    return (
        <>
            <div className='py-12  backdrop-blur-sm bg-opacity-20'>
                <div className="grid space-y-8 lg:space-y-0 w-full grid-cols-1 my-auto mt-12 mb-8 md:grid-cols-2 xl:gap-14 md:gap-5">
                    <div className="flex flex-col justify-center col-span-1 text-center lg:text-start space-y-8 lg:space-y-0">
                        <div className="flex items-center justify-center mb-4 lg:justify-normal">
                            <h4 className="text-sm font-bold tracking-widest text-primary uppercase">
                                Explore the Latest Books at BoiKosh
                            </h4>
                        </div>
                        <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-6xl text-dark-grey-900">
                            Elevate <span className='hover:text-amber-400 transition-all duration-150'>your</span> reading experience with a curated collection.
                        </h1>
                        <p className="mb-6 text-lg text-justify font-normal leading-7 lg:w-3/4 text-grey-900">
                            Say goodbye to hours spent searching for your next read. Discover the quickest, most immersive, and trendiest collection of books, right at your fingertips. Seriously.
                        </p>
                        <div className='flex gap-4 items-center justify-center lg:justify-start'>
                            <button
                                href="#_"
                                className="rounded-[10px] px-8 py-2.5 overflow-hidden group bg-amber-500 relative hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-amber-400 transition-all ease-out duration-300"
                            >
                                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease" />
                                <span className="relative inline-flex gap-2 items-center"><LibraryBig size={16} /> Read Now </span>
                            </button>
                            <button
                                href="#_"
                                className="rounded-[10px] px-8 py-2.5 overflow-hidden group bg-amber-500 relative hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-amber-400 transition-all ease-out duration-300"
                            >
                                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease" />
                                <span className="relative inline-flex gap-2 items-center"><BookHeart size={16} /> My Wishlist</span>
                            </button>
                        </div>

                    </div>
                    <div className='flex justify-end items-center'>
                        <img className='h-96' src="https://res.cloudinary.com/dfwmhlhyo/image/upload/v1728889313/push-back_v6imjx.png" alt="" />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Header