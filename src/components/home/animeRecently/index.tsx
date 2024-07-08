"use client"
import { AnimeRecentlyStateService, AnimeService } from '@/lib/services/anime'
import Link from 'next/link'
import React, { useState } from 'react'

interface Props {
    animeRecently: AnimeRecentlyStateService;
}

const AnimeRecently: React.FC<Props> = ({ animeRecently }) => {
    const [hoveredProduct, setHoveredProduct] = useState<any>(null);

    const handleMouseEnter = (product: any) => {
        setHoveredProduct(product);
    };

    const handleMouseLeave = () => {
        setHoveredProduct(null);
    };
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl lg:max-w-7xl">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> {/* xl:grid-cols-4 gap-x-6 gap-y-10 xl:gap-x-8*/}
                    {animeRecently.data && animeRecently.data.slice(3).map((product: AnimeService) => {
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
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AnimeRecently

