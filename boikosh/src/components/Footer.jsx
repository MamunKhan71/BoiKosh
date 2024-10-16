import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-[#181C14]">
            <div className="container py-6 lg:py-12 mx-auto px-3 lg:px-0">
                <div className="flex flex-col items-center text-center">
                    <a href="#">
                        <img className='w-48' src="https://res.cloudinary.com/dfwmhlhyo/image/upload/v1728887407/boikosh_cwrtzw.png" alt="" />
                    </a>
                    <p className="max-w-md mx-auto mt-4 text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>

                </div>
                <hr className="my-10 border-gray-200 dark:border-gray-700" />
                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <p className="text-md text-white text-center lg:text-left">
                        © Copyright 2024. All Rights Reserved by Md. Mamun with love for <span className='font-bold text-amber-400'>ZeptoApps!</span>
                    </p>
                    <div className="flex mt-3 -mx-2 sm:mt-0">
                        <a
                            href="#"
                            className="mx-2 text-md transition-colors duration-300 text-white"
                        >
                            {" "}
                            Teams{" "}
                        </a>
                        <a
                            href="#"
                            className="mx-2 text-md transition-colors duration-300 text-white"
                        >
                            {" "}
                            Privacy{" "}
                        </a>
                        <a
                            href="#"
                            className="mx-2 text-md transition-colors duration-300 text-white"
                        >
                            {" "}
                            Cookies{" "}
                        </a>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer