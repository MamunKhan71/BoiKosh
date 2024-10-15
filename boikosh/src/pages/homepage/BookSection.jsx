import React, { useEffect, useState } from 'react'
import BookCard from './BookCard'
import Skeleton from '../../components/Skeleton'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

const BookSection = () => {
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        fetch(`https://gutendex.com/books/?page=${page}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                setBooks(data.results)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }, [page])
    console.log(books);
    return (
        <div className='space-y-12'>
            <div className='space-y-4'>
                <h4 className="text-4xl text-center font-bold text-primary ">
                    Available Books
                </h4>
                <h4 className="text-lg text-gray-500 text-center font-bold tracking-widest text-primary ">
                    Explore the Latest Books at BoiKosh
                </h4>
            </div>
            {
                isLoading ?
                    <>
                        <div className='grid grid-cols-4 gap-6'>
                            {Array(32).fill(0).map((_, index) => (
                                <Skeleton key={index} />
                            ))}
                        </div>
                    </>
                    :
                    <>
                        <div className='grid grid-cols-4 gap-6'>
                            {books?.map(book =>
                                <BookCard isWishList={false} bookData={book} />
                            )}
                        </div>
                        <div className='flex gap-6 items-center justify-center w-full'>
                            <button onClick={() => setPage(page - 1)} className='border p-2 rounded-lg w-24 inline-flex gap-2 items-center justify-center'>Previous</button>
                            <button onClick={() => setPage(page + 1)} className='border p-2 rounded-lg w-24 inline-flex gap-2 items-center justify-center'>Next</button>
                        </div>
                    </>
            }
        </div>
    )
}

export default BookSection