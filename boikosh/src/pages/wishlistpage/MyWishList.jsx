import React, { useEffect, useState } from 'react'
import BookCard from '../homepage/BookCard'
import Skeleton from '../../components/Skeleton'

const MyWishList = () => {
    const [getWishBooks, setWishBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const localStorageBooks = localStorage.getItem('wishlist');
        if (localStorageBooks) {
            const bookIds = JSON.parse(localStorageBooks);
            if (bookIds.length > 0) {
                const url = `https://gutendex.com/books?ids=${bookIds.join(",")}`;
                fetch(url, { method: "GET" })
                    .then(res => res.json())
                    .then(data => {
                        setWishBooks(data.results);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error("Error fetching wishlist books:", error);
                        setLoading(false);
                    });
            } else {
                console.log("No books found in wishlist.");
                setLoading(false);
            }
        } else {
            console.log("No books found in localStorage.");
            setLoading(false);
        }
    }, []);

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
                loading ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {
                        ...Array(1, 2, 3, 4).map(book => <Skeleton />)
                    }
                </div> : <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {
                        getWishBooks?.map(book => <BookCard isWishList={true} bookData={book} />)
                    }
                </div>
            }
        </div>
    )
}

export default MyWishList