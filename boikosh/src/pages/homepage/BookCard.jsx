import { Book, DeleteIcon, DownloadCloud } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
const BookCard = ({ bookData, isWishList }) => {
    const { id, title, formats, authors, subjects, download_count } = bookData
    const [wishIcon, setWishIcon] = useState(false)
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    useEffect(() => {
        if (wishlist.includes(id)) {
            setWishIcon(true)
        }
    }, [wishlist])

    const handleWishlistClick = (bookId) => {
        const currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (currentWishlist.includes(bookId)) {
            const updatedWishlist = currentWishlist.filter(b => b !== bookId);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setWishIcon(false);
            toast.success("Removed from the wishlist!");
        } else {
            const updatedWishlist = [...currentWishlist, bookId]; // Add the new bookId
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setWishIcon(true);
            toast.success("Added to the wishlist!");
        }
    }

    return (
        <div>
            <div className="!z-5 relative border rounded-[10px] bg-clip-border shadow-3xl flex flex-col w-full !p-4 bg-white">
                <div className="h-full w-full">
                    <div className="relative w-full">
                        <img
                            src={formats['image/jpeg']} alt={`${title} cover`}
                            className="mb-3 object-cover h-96 w-full rounded-xl 3xl:h-full 3xl:w-full opacity-5"
                        />
                        <img
                            src={formats['image/jpeg']} alt={`${title} cover`}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 shadow-xl rounded-xl"
                        />
                        {
                            isWishList ?
                                <button onClick={() => handleWishlistClick(id)} className={`absolute top-3 right-3 flex items-center justify-center rounded-full ${wishIcon ? "bg-blue-600" : "bg-amber-400"} hover:bg-amber-500 p-2 text-white hover:cursor-pointer`}>
                                    <div className="flex h-full w-full items-center justify-center rounded-full text-xl ">
                                        <DeleteIcon size={16} />
                                    </div>
                                </button>


                                : <button onClick={() => handleWishlistClick(id)} className={`absolute top-3 right-3 flex items-center justify-center rounded-full ${wishIcon ? "bg-blue-600" : "bg-amber-400"} hover:bg-amber-500 p-2 text-white hover:cursor-pointer`}>
                                    <div className="flex h-full w-full items-center justify-center rounded-full text-xl ">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 512 512"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={32}
                                                d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                                            />
                                        </svg>
                                    </div>
                                </button>
                        }
                        <button className="absolute bottom-3 left-3 flex items-center justify-center rounded-md bg-amber-400 px-2">
                            <p className='text-sm font-medium relative z-10'>ID: #54878</p>
                        </button>
                    </div>
                    <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                        <div className="mb-2 space-y-2">
                            <p className="text-xl font-bold text-navy-700 line-clamp-1">{title}</p>
                            <div className='border rounded-lg p-3 bg-amber-50 max-h-40 overflow-hidden w-full'>
                                <p className='text-md text-gray-600 font-medium line-clamp-1'>Author(s): {authors.map(author => author.name).join(', ')}</p>
                                <p className='text-md text-gray-600 font-medium line-clamp-1'>Genre(s): {subjects.slice(0, 3).join(', ')}</p> {/* Limit to 3 genres for display */}
                            </div>

                        </div>
                    </div>
                    <div className="flex items-center justify-between md:items-center lg:justify-between ">
                        <div className="flex">
                            <p className="text-sm inline-flex gap-1 font-bold text-amber-500">
                                <DownloadCloud size={16} /> Downloaded: <span>{download_count}</span>
                            </p>
                        </div>
                        <Link
                            to={`/books/${id}`}
                            className="linear rounded-[20px] inline-flex gap-2 items-center bg-amber-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-amber-600 active:bg-amber-600"
                        >
                            <Book size={16} /> Read This
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookCard