"use client"

import { animeCategoryAction } from '@/lib/hooks/schedule/animeCategory/slice';
import { AppDispatch, RootState } from '@/lib/hooks/store';
import { AnimeService } from '@/lib/services/anime';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface AnimeCategoryProps {
    params: {
        page: number;
        limit: number;
    };
}

const AnimeCategoryComponent: React.FC<AnimeCategoryProps> = ({ params }) => {
    const [hoveredProduct, setHoveredProduct] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(params.page);
    const dispatch = useDispatch<AppDispatch>();
    const animeCategory = useSelector((state: RootState) => state.animeCategory);
    console.log(animeCategory.data)
    useEffect(() => {
        dispatch(animeCategoryAction.animeCategoryRequest({ params: { page: currentPage, limit: params.limit } }));
    }, [dispatch, currentPage, params.limit]);

    const handleMouseEnter = (product: any) => {
        setHoveredProduct(product);
    };

    const handleMouseLeave = () => {
        setHoveredProduct(null);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const renderPaginationNumbers = () => {
        const totalPages = Math.ceil(animeCategory.total_anime / params.limit);
        console.log(totalPages);
        if (totalPages <= 1) return null;

        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400 ${currentPage === i ? 'font-bold' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl lg:max-w-7xl">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {animeCategory?.data && animeCategory?.data.map((product: AnimeService) => {
                        const parsedMeta = JSON.parse(product.meta);
                        return (
                            <div
                                key={product.anime_id}
                                onMouseEnter={() => handleMouseEnter(product)}
                                onMouseLeave={handleMouseLeave}
                                className="relative group"
                            >
                                <Link href={product.paramHref} className="block">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                        <img
                                            src={`http://localhost:3000/images/${product.poster}`}
                                            alt={product.title}
                                            width={500}
                                            height={750}
                                            className="h-96 w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-gray-700">{product.title}</h3>
                                </Link>
                                {hoveredProduct && hoveredProduct.anime_id === product.anime_id && (
                                    <div className="absolute w-full w-auto inset-0 flex items-center justify-center z-50 left-28">
                                        <div className="p-4 bg-white rounded-lg shadow-lg">
                                            <h3 className="text-lg font-bold mb-2">{hoveredProduct.title}</h3>
                                            <p className="text-sm line-clamp-5">{hoveredProduct.description}</p>
                                            <ul className="mt-2 text-sm text-gray-600">
                                                {Object.entries(parsedMeta).map(([key, value]) => (
                                                    <li key={key}>
                                                        <strong>{key}:</strong> {typeof value === 'string' ? value : ''}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                {animeCategory.total_anime > params.limit && (
                    <div className="flex justify-end mt-6">
                        {currentPage > 1 && (
                            <button
                                onClick={handlePreviousPage}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Previous
                            </button>
                        )}
                        {renderPaginationNumbers()}
                        {currentPage < Math.ceil(animeCategory.total_anime / params.limit) && (
                            <button
                                onClick={handleNextPage}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Next
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnimeCategoryComponent;
