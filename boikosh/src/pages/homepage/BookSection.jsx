import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import Skeleton from '../../components/Skeleton';

const genres = [
    'Science Fiction',
    'Horror',
    'Adventure',
    'Romance',
    'Gothic Fiction',
    'Historical Fiction',
    'Psychological Fiction',
    'Fantasy',
    'Drama',
    'Poetry',
];

const BookSection = () => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [searchParams, setSearchParams] = useState(localStorage.getItem('searchParams') || '');
    const [selectedGenre, setSelectedGenre] = useState(localStorage.getItem('selectedGenre') || '');

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://gutendex.com/books/?page=${page}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setBooks(data.results);
                setIsLoading(false);
                setTimeout(() => {
                    setIsVisible(true);
                }, 200);
            })
            .catch((error) => console.log(error));
    }, [page]);

    const searchedBooks = books.filter((book) => {
        const titleMatcher = book.title.toLowerCase().includes(searchParams.toLowerCase());
        const genreMatcher =
            selectedGenre === 'All' ||
            book.subjects.includes(selectedGenre) ||
            book.bookshelves.some((shelf) => shelf.toLowerCase().includes(selectedGenre.toLowerCase()));
        return titleMatcher && genreMatcher;
    });

    useEffect(() => {
        setIsVisible(false);
        const timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchParams, selectedGenre, books]);

    useEffect(() => {
        localStorage.setItem('selectedGenre', selectedGenre);
    }, [selectedGenre]);
    useEffect(() => {
        localStorage.setItem('searchParams', searchParams);
    }, [searchParams]);


    return (
        <div className='space-y-12 w-full'>
            <div className='space-y-4'>
                <h4 className="text-4xl text-center font-bold text-primary ">
                    Available Books
                </h4>
                <h4 className="text-lg text-gray-500 text-center font-bold tracking-widest text-primary ">
                    Explore the Latest Books at BoiKosh
                </h4>
            </div>
            <div className="flex justify-center space-x-4 ">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchParams}
                    onChange={(e) => setSearchParams(e.target.value)}
                    className="border p-2 rounded-lg w-80"
                />
                <div className="flex justify-center">
                    <select
                        className="p-2 border rounded-lg w-full"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option value="">All Genres</option>
                        {genres?.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className='grid grid-cols-4 gap-6'>
                    {Array(32).fill(0).map((_, index) => (
                        <Skeleton key={index} />
                    ))}
                </div>
            ) : (
                <>
                    <div
                        className={`grid grid-cols-4 gap-6 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {searchedBooks?.map((book) => (
                            <BookCard key={book.id} isWishList={false} bookData={book} />
                        ))}
                    </div>

                    <div className='flex gap-6 items-center justify-center w-full'>
                        <button
                            onClick={() => {
                                setIsVisible(false);
                                setTimeout(() => {
                                    setPage(page - 1);
                                }, 300);
                            }}
                            disabled={page === 1}
                            className='border p-2 rounded-lg w-24 inline-flex gap-2 items-center justify-center'
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => {
                                setIsVisible(false);
                                setTimeout(() => {
                                    setPage(page + 1);
                                }, 300);
                            }}
                            className='border p-2 rounded-lg w-24 inline-flex gap-2 items-center justify-center'
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default BookSection;
