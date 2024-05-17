'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useGetRecentlyTourQuery } from '@/services/api/tours';
import { formatPrice } from '@/utils/formatPrice';
import { TOUR_ID_RECENTLYVIEW_LOCAL_KEY } from '@/constants/tour';
import { faClock } from '@fortawesome/free-solid-svg-icons';

type ViewedParam = {
    data: string[],
}
function TourViewed(props: ViewedParam) {
    const [viewIds, setViewIds] = useState("");
    const { data: tours, isLoading, isFetching } = useGetRecentlyTourQuery('?tour_id=' + viewIds, { skip: !viewIds });
    const [display, setDisplay] = useState('hidden')
    useEffect(() => {
        if (!isFetching && tours?.data?.length != 0) {
            setDisplay('flex flex-row');
        }
    }, [isFetching, tours]);

    useEffect(() => {
        let tourRecentlyViewedIds: any = localStorage.getItem(TOUR_ID_RECENTLYVIEW_LOCAL_KEY);
        tourRecentlyViewedIds = tourRecentlyViewedIds ? JSON.parse(tourRecentlyViewedIds) : '';
        tourRecentlyViewedIds = tourRecentlyViewedIds ? tourRecentlyViewedIds.join(',') : "";
        if (tourRecentlyViewedIds) {
            setViewIds(tourRecentlyViewedIds);
        }
    }, []);

    return (
        <>
            {
                isFetching || !tours
                    ?
                    <></>
                    :
                    <section className={`tour_viewed w-full ${display}`}>
                        <div className='pb-4'>
                            <h1 className='font-bold'>Tour đã xem gần đây</h1>
                            <div className='grid grid-cols-12 gap-4 py-4'>
                                {
                                    tours?.data?.map(tour =>
                                        <>
                                            <a key={tour.tour_id} href={`/tour/${tour.market_slug}`} className='col-span-4 rounded-lg bg-white shadow'>
                                                <div className='tour_viewed grid grid-cols-12 gap-2'>
                                                    <div className='tour_viewed_image aspect-square col-span-4 rounded-tl-lg rounded-bl-lg overflow-hidden'>
                                                        <div className='relative w-full h-full'>
                                                            <Image
                                                                src={`${tour.images.thumbnail_86 ?? `/assets/images/${props.data[Math.floor(Math.random() * 7)]}`}`}
                                                                alt="image tour recently view"
                                                                layout='fill'
                                                                className='w-full h-full object-cover object-center'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='tour_viewed_detail col-span-8 flex flex-col justify-between py-2.5 px-1'>
                                                        <div className='tour_viewed_item_detail flex flex-col gap-0.5'>
                                                            <h3 className='tour_viewed_item_detail_title text-xs font-semibold'>{tour.tour_name}</h3>
                                                            <h6 className='font-medium tour_viewed_item_series_code text-sgt-secondary-light'>{tour.series_code}</h6>
                                                        </div>
                                                        <div className='flex flex-row justify-end items-end'>
                                                            <div className='tour_viewed_item_detail flex flex-col justify-end pr-2 text-sm font-semibold'>
                                                                <div className='tour_viewed_item_detail_time flex flex-row justify-end items-center gap-1.5 text-xs '>
                                                                    <FontAwesomeIcon className='text-sgt-primary-dark' icon={faClock}></FontAwesomeIcon>
                                                                    <p>{tour.day_number} Ngày {tour.night_number} Đêm</p>
                                                                </div>
                                                                <div className='tour_viewed_item_detail_price flex flex-row justify-start items-center gap-1 text-red-500 text-sm font-semibold'>
                                                                    <div>{tour.price_adl != tour.price_adl_off ? formatPrice(tour.price_adl_off) : formatPrice(tour.price_adl)}</div>
                                                                    <div>VND</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </section>
            }
        </>
    )
}

export default TourViewed