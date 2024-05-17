'use client';
import React from 'react'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons';
import '@/styles/components/tour-item-vertical.scss';
import { formatPrice } from '@/utils/formatPrice';
import dayjs from 'dayjs';
import { VI_DATE_FORMAT } from '@/constants/ui';
import { fakeTourList } from '@/utils/fakeData';
type ViewedParam = {
    item: any,
    isShowBtn?: boolean,
    col?: string
}
const TourItemVertical = (props: ViewedParam) => {
    const dateFormat = VI_DATE_FORMAT;
    let item = props.item;
    let ishowBtn = props.isShowBtn ?? true;
    let detailLink = `tour/${item.market_slug}`;
    // let thumbnail = item.images?.thumbnail_360 ?? `/assets/images/canh-dong-quat-gio-360x225.jpg`;
    let randomIndex = Math.floor(Math.random() * 7);
    let thumbnail = item.images?.thumbnail_360 ?? `/assets/images/${fakeTourList[randomIndex]}`;
    const tourPrice = item.price_adl != item.price_adl_off ? item.price_adl_off : item.price_adl;
    return (
        <a href={detailLink} className={`${props.col ? props.col : `col-span-4`} tour_item_vertical transition-all ease-linear duration-200 cursor-pointer`}>
            <div className='grid grid-cols-12 rounded-lg shadow bg-white '>
                <div className='aspect-[3/2] col-span-12 rounded-tl-lg rounded-tr-lg overflow-hidden'>
                    <div className='relative w-full h-full'>
                        <Image
                            src={`${thumbnail}`}
                            alt="canh-dong-quat-gio"
                            layout='fill'
                            className='w-full h-full tour_item_vertical_image'
                        />
                        {/* object-cover  */}
                    </div>
                </div>
                <div className='search_result_item_detail col-span-12 flex flex-col justify-between gap-4 p-2.5'>
                    <div className='search_result_item_detail flex flex-col gap-0.5'>
                        <h3 className='search_result_item_detail_title text-sm font-semibold'>{item.tour_name}</h3>
                        <h6 className='font-medium text-sgt-secondary-light'>{item.series_code}</h6>
                    </div>
                    <div className='flex flex-row justify-between items-end'>
                        <div className='search_result_item_detail text-xs font-normal flex flex-col gap-0.5'>
                            <div className='search_result_item_detail_time flex flex-row justify-start items-center gap-1.5 font-semibold'>
                                <FontAwesomeIcon className='text-sgt-primary-dark' icon={faClock}></FontAwesomeIcon>
                                <p>{item.day_number} Ngày {item.night_number} Đêm</p>
                            </div>
                            <div className='search_result_item_detail_star flex flex-row justify-start items-center gap-2 font-semibold'>
                                <FontAwesomeIcon className='text-sgt-primary-dark' icon={faCalendarDays}></FontAwesomeIcon>
                                <p>{dayjs(item.flight_date).format(dateFormat)}</p>
                            </div>
                            <div className='search_result_item_detail_price flex flex-row justify-start items-center gap-0.5 text-red-500 text-lg font-semibold'>
                                <div>{formatPrice((tourPrice ?? 0).toString())}</div>
                                <div className='text-sm'>VND</div>
                            </div>
                        </div>
                        {
                            ishowBtn ?
                                <div className='pb-2 pr-0.5'>
                                    <a href={detailLink} className='px-5 py-1.5 rounded-lg bg-sgt-primary-default text-sgt-secondary-default font-bold hover:bg-sgt-secondary-dark hover:text-white hover:transition-all'>
                                        Chọn
                                    </a>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        </a>
    )
}

export default TourItemVertical