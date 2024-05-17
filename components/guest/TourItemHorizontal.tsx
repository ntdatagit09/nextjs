'use client';
import Image from "next/image";
import Link from 'next/link';
import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from "@/utils/formatPrice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITourSummary } from '@/interfaces/tour';
import dayjs from 'dayjs';
import { VI_DATE_FORMAT } from '@/constants/ui';
import { fakeTourList } from '@/utils/fakeData';
import { TOUR_ID_RECENTLYVIEW_LOCAL_KEY } from '@/constants/tour';

type ViewedParam = {
    item: ITourSummary,
}
const TourItemHorizontal = (props: ViewedParam) => {
    const dateFormat = VI_DATE_FORMAT;
    let item = props.item;
    // let thumbnail = item.images.thumbnail_360 ?? `/assets/images/canh-dong-quat-gio-360x225.jpg`;

    let detailLink = `tour/${item.market_slug}`;
    let randomIndex = Math.floor(Math.random() * 8);
    let thumbnail = item.images.thumbnail_360 ?? `/assets/images/${fakeTourList[randomIndex]}`;
    let localTourIds = localStorage.getItem(TOUR_ID_RECENTLYVIEW_LOCAL_KEY);
    const handleOnClick = (id: number | string) => {
        localTourIds = localTourIds + ',' + id.toString();
        localStorage.setItem(TOUR_ID_RECENTLYVIEW_LOCAL_KEY, localTourIds);
    }

    const tourPrice = item.price_adl != item.price_adl_off ? item.price_adl_off : item.price_adl;
    return (
        <>
            <a href={detailLink} className='tour_item_horizontal h-full col-span-12 search_result_list rounded-lg bg-white shadow cursor-pointer'>
                <div className='search_result_item grid grid-cols-12 gap-4 h-full'>
                    <div className='search_result_item_image aspect-[3/2] col-span-4
                    rounded-tl-lg rounded-bl-lg 
                    overflow-hidden'
                    >
                        <div className='relative w-full h-full'>
                            <Image
                                src={`${thumbnail}`}
                                alt="canh-dong-quat-gio"
                                layout='fill'
                                className='w-full h-full tour_item_horizontal_image'
                            />
                        </div>
                    </div>
                    <div className='search_result_item_detail col-span-8 flex flex-col justify-between py-3'>
                        <div className='search_result_item_detail flex flex-col gap-0.5'>
                            {/* <h3 className='search_result_item_detail_title text-sm font-semibold'>{item.market_name}: {item.tour_name}</h3> */}
                            <h3 className='search_result_item_detail_title text-sm font-semibold'>{item.tour_name}</h3>
                            <h5>Mã tour: {item.series_code}</h5>
                        </div>
                        <div className='flex flex-row justify-between items-end'>
                            <div className='search_result_item_detail text-sm font-normal flex flex-col gap-1'>
                                <div className='search_result_item_detail_time flex flex-row justify-start items-center gap-1.5 font-medium'>
                                    <FontAwesomeIcon className='text-sgt-primary-dark' icon={faClock}></FontAwesomeIcon>
                                    <p>{item.day_number} Ngày {item.night_number} Đêm</p>
                                </div>
                                <div className='search_result_item_detail_star flex flex-row justify-start items-center gap-2 font-medium'>
                                    <FontAwesomeIcon className='text-sgt-primary-dark' icon={faCalendarDays}></FontAwesomeIcon>
                                    <p>{dayjs(item.flight_date).format(dateFormat)}</p>
                                </div>
                                <div className='search_result_item_detail_price flex flex-row justify-start items-center gap-1 pb-0.5 text-red-500 text-lg font-semibold'>
                                    <div>{formatPrice(tourPrice)}</div>
                                    <div>VND</div>
                                </div>
                            </div>
                            <div className='pr-6 pb-3'>
                                <a href={detailLink} className='px-6 py-2 rounded-lg bg-sgt-primary-default text-sgt-secondary-default font-bold hover:bg-sgt-secondary-dark hover:text-white hover:transition-all'>
                                    Chọn tour
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </>
    )
}

export default TourItemHorizontal