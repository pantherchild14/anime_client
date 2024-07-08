import { AnimeCategoryService, AnimeService } from '@/lib/services/anime';
import Link from 'next/link';
import React from 'react';
import { CiStar } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { GrView } from "react-icons/gr";
type Props = {
    title: string
    data: AnimeCategoryService[] | null
}

const HotAnimeComponent: React.FC<Props> = (props: Props) => {
    return (
        <div className='hin-movieListTop'>
            <div className='hin-title'>
                <h3 className='text-lg font-bold'>{props.title}</h3>
            </div>
            <div className='hin-movieList'>
                <ul className='list'>
                    {props?.data && props?.data.map((item: AnimeCategoryService) => {

                        const parsedMeta = JSON.parse(item?.meta);
                        const ratingMatch = parsedMeta['Điểm']?.match(/Điểm: ([0-9.]+)/);
                        const rating = ratingMatch ? ratingMatch[1] : 'N/A';
                        return (
                            <li key={item?.anime_id} className={`item_${item?.anime_id}`}>
                                <Link href={item?.paramHref} className='no-underline text-black'>

                                    <div className='wrapper flex gap-3' style={{ padding: '10px 0' }}>
                                        <div className='list-img w-auto'>
                                            <img
                                                src={`http://localhost:3000/images/${item?.poster}`}
                                                alt={item?.title}
                                                // width={60}
                                                // height={100}
                                                // max-w-28 w-32 h-36
                                                className="w-20 h-28 object-cover object-center group-hover:opacity-75 rounded-md"
                                            />
                                        </div>
                                        <div className='list-content'>
                                            <h4>{item?.title}</h4>
                                            <div className="meta flex gap-2">
                                                {/* <span className="Vote AAIco-star flex items-center"><CiStar width={10} />{rating}</span> */}
                                                <span className="Vote AAIco-star flex items-center text-red-300 font-bold"><GrView width={10} className='mr-1 ' />{item?.total_views}</span>
                                                <span className="Time AAIco-access_time flex items-center"><IoMdTime width={10} />{parsedMeta['Thời lượng']}</span>
                                                <span className="Date AAIco-date_range flex items-center"><MdDateRange width={10} />{parsedMeta['Năm phát hành']}</span>
                                                <span className="Qlty flex items-center font-bold text-xs bg-red-300 rounded-lg px-2">{parsedMeta['Chất lượng']}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default HotAnimeComponent