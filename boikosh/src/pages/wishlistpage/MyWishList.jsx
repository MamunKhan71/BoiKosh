import React, { useEffect, useState } from 'react'
import BookCard from '../homepage/BookCard'
import Skeleton from '../../components/Skeleton'

const MyWishList = () => {
    const [getWishBooksId, setWishBooksId] = useState([])
    const localStorageBooks = localStorage.getItem('wishlist')
    const [loading, setLoading] = useState(true)
    const [idString, setIdString] = useState("")
    const [getWishBooks, setWishBooks] = useState([])
    useEffect(() => {
        if (localStorageBooks && localStorageBooks.length > 2) {
            setWishBooksId(localStorageBooks);
            const bookArray = localStorageBooks.replace(/[\[\]']/g, "").split(",");
            const url = `https://gutendex.com/books?ids=${bookArray.join(",")}`;
            setIdString(url);
            fetch(url, {
                method: "GET"
            })
                .then(res => res.json())
                .then(data => {
                    setWishBooks(data.results);
                    setLoading(false);
                })
                .catch(error => console.error(error));
        } else {
            console.log("No books found in localStorage.");
            setLoading(false);
        }
    }, [localStorageBooks]);


    console.log(getWishBooks);

    return (
        <div className='space-y-12 pb-24'>
            <div className='space-y-4'>
                <h4 className="text-4xl text-center font-bold text-primary ">
                    My Wishlist
                </h4>
                <h4 className="text-lg text-gray-500 text-center font-bold tracking-widest text-primary ">
                    Explore your wishlist at BoiKosh
                </h4>
            </div>
            {
                loading ? <div className='grid grid-cols-4 gap-6'>
                    {
                        ...Array(1, 2, 3, 4).map(book => <Skeleton />)
                    }
                </div> : <div className='grid grid-cols-4 gap-6'>
                    {
                        getWishBooks?.map(book => <BookCard isWishList={true} bookData={book} />)
                    }
                </div>
            }
        </div>
    )
}

export default MyWishList