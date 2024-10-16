import React, { useEffect, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const BookDetails = () => {
    // const { id, title, formats, authors, subjects, download_count } = bookData

    const { id } = useParams()
    const [book, setBook] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        // const url = ;
        fetch(`https://gutendex.com/books/${id}/`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                setBook(data)
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, [])
    const [wishIcon, setWishIcon] = useState(false)
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    useEffect(() => {
        if (wishlist.includes(id)) {
            setWishIcon(true)
        }
    }, [wishlist])

    const handleWishlistClick = (book) => {

        if (wishlist.includes(book)) {
            const updatedWishlist = wishlist.filter(b => b !== book);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setWishIcon(false)
            window.location.reload()
            toast.success("Removed from the wishlist!");
        } else {
            wishlist.push(book);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            setWishIcon(true)
            toast.success("Added to the wishlist!");
        }
    }
    const getReadableFormat = (formatKey) => {
        switch (formatKey) {
            case 'text/html':
                return 'HTML'
            case 'application/epub+zip':
                return 'EPUB'
            case 'application/x-mobipocket-ebook':
                return 'MOBI'
            case 'text/plain; charset=us-ascii':
                return 'Plain Text'
            case 'application/octet-stream':
                return 'ZIP'
            default:
                return 'Other'
        }
    }

    return (
        <>
            {
                loading ?
                    <div class="flex gap-2 w-full h-screen justify-center items-center">
                        <div class="w-5 h-5 rounded-full animate-pulse bg-amber-600"></div>
                        <div class="w-5 h-5 rounded-full animate-pulse bg-amber-600"></div>
                        <div class="w-5 h-5 rounded-full animate-pulse bg-amber-600"></div>
                    </div>
                    :

                    <div className="flex pt-8 pb-24 flex-col lg:flex-row gap-6 lg:gap-12 w-full">
                        <div className="flex flex-1 h-full lg:h-[564px] bg-[#1313130d] rounded-2xl p-16 items-center justify-center w-full">
                            <img
                                src={book?.formats?.['image/jpeg']} alt={`${book?.title} cover`}
                                className="h-full lg:h-[464px] rounded-2xl" />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className='flex justify-between items-center'>
                                <h1 className="text-4xl font-bold text-p[#131313] playFair">{book?.title}</h1>
                            </div>
                            <p className="workSans text-xl font-medium text-[#131313cc]">By: {book?.authors?.map(author => <span>{author["name"]}</span>)}</p>
                            <p className="workSans text-xl font-medium text-[#131313cc]">
                                From: {book?.authors?.map((author, index) => (
                                    <span key={index}>
                                        {author.birth_year ? author.birth_year : "N/A"} - {author.death_year ? author.death_year : "N/A"}
                                        {index < book.authors.length - 1 && ", "}
                                    </span>
                                ))}
                            </p>
                            <hr />
                            <p>Book Id: #{book?.id}</p>
                            <p>Available Language: {book?.languages?.map(language => <span className='uppercase'>{language}</span>)}</p>
                            <p>Copyright: {book?.copyright ? "Yes" : "No"}</p>
                            <p>Downloaded: {book?.download_count}</p>
                            <div className="space-y-2">
                                <p className="text-lg font-semibold">Bookshelves:</p>
                                <ul className="flex flex-wrap gap-2">
                                    {book?.bookshelves?.map((shelf, index) => (
                                        <li key={index} className="bg-gray-200 text-sm px-3 py-1 rounded-md uppercase">
                                            {shelf.replace("Browsing: ", "")}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg font-semibold">Subjects:</p>
                                <ul className="flex flex-wrap gap-2">
                                    {book?.subjects?.map((subject, index) => (
                                        <li key={index} className="bg-green-200 text-sm px-3 py-1 rounded-md text-green-800 font-medium">
                                            {subject}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <p className="text-2xl font-semibold text-[#131313]">Available Formats:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                                    {book?.formats && Object.keys(book.formats).map((formatKey) => (
                                        <div key={formatKey} className="border border-gray-200 rounded-lg shadow-lg p-2 transition-all hover:shadow-xl hover:border-amber-500">
                                            <div className="flex flex-col items-center space-y-2">
                                                <p className="text-lg font-medium text-blue-600">{getReadableFormat(formatKey)}</p>
                                                <a
                                                    href={book.formats[formatKey]}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-amber-600 text-white text-sm font-bold py-2 px-2 rounded-md hover:bg-amber-700 transition-colors duration-200"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <hr />

                            <div className="flex gap-4">
                                <button onClick={() => handleWishlistClick(id)} className="bg-amber-500 w-full p-4 font-semibold text-white px-7 text-lg rounded-lg">{wishIcon ? "Remove From Wish List" : "Add To Wish List"}</button>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default BookDetails