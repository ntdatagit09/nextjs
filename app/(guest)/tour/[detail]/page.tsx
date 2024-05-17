import React from 'react'
import Script from "next/script";
import { fakeViewedList } from '@/utils/fakeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BASE_URL, API_PATH } from '@/constants/api';
import StoreProvider from '@/store/StoreProvider';
import '@/styles/components/date-picker-calendar-custom.scss';
import "@/styles/detail.scss";
import { tourDetail } from '@/interfaces/tourSchedule';
import TourPhotoGallery from './components/TourPhotoGallery';
import TourSchedules from './components/TourSchedules';
import TourViewed from '@/components/guest/TourViewed';
import TourFlightInformation from './components/TourFlightInformation';
import TourGuide from './components/TourGuide';
import TourOverview from './components/TourOverview';
import { ITourSummary } from '@/interfaces/tour';
import { IMarketDetail } from '@/interfaces/market';
import { transferStringToSlug } from "@/utils/formatString";
import fetchApi from '@/services/api/fetchApi';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: {
        detail: string
    }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { detail } = params;
    const marketSlug = detail;
    const urlPath = `market/${marketSlug}`;
    const responseJson = await fetchApi({ urlPath: urlPath });
    const tourDetail: ITourSummary = responseJson ?? null;
    let title = `Đặt tour du lịch trực tuyến tại SaigonTimes Travel`;
    let thumbnailGallery: string[] = [];
    if (responseJson?.images) {
        responseJson.images.forEach((element: any) => {
            thumbnailGallery.push(element.thumbnail_86);
        });
    }
    if (tourDetail) {
        title = `Tour ${tourDetail.nation_name}${tourDetail.day_number}N${tourDetail.night_number}D: ${tourDetail.tour_name}`;
    }
    return {
        title: title,
        openGraph: {
            images: [...thumbnailGallery],
        },
    }
}

const Detail = async ({ params }: { params: any }) => {
    const { detail } = params;
    const marketSlug = detail;
    const urlPath = `market/${marketSlug}`;
    const responseJson = await fetchApi({ urlPath: urlPath });
    const marketDetail: IMarketDetail = responseJson ?? null;
    const tourDetail: ITourSummary = responseJson ?? null;
    let imageGallery: string[] = [];
    let thumbnailGallery: string[] = [];

    if (responseJson?.images) {
        responseJson.images.forEach((element: any) => {
            imageGallery.push(element.original_image);
            thumbnailGallery.push(element.thumbnail_86);
        });
    }

    const searchByNationUrl = `/search?nation=${transferStringToSlug(tourDetail?.nation_name)}`;

    const viewedList = fakeViewedList;


    const data: tourDetail[] = [
        {
            flight_date: '',
            tour_id: 10,
            tour_name: '',
            remaining_seats: 1,
        }
    ];

    return (
        <StoreProvider>
            <section id='detail_page' className={`detail_page bg-sgt-bg-primary`}>
                <>
                    <Script type="text/javascript" src="/assets/js/tab.js" strategy="afterInteractive"></Script>
                </>
                <div className='detail_header'>
                    <div className='width-primary m-auto px-2 pt-6'>
                        <div className='flex justify-start items-center gap-2 text-sm font-medium'>
                            <a href="/" className='flex flex-row gap-1.5 justify-center items-center'>
                                <FontAwesomeIcon className='text-sm text-sgt-secondary-default' icon={['fas', 'home']} />
                                <p>Trang chủ</p>
                            </a>
                            <p>/</p>
                            <a href={searchByNationUrl} className='flex flex-row gap-1.5 justify-center items-center'>
                                <p>{tourDetail?.nation_name}</p>
                            </a>
                            <p>/</p>
                            <a href={`/${tourDetail?.market_slug}`} className='flex flex-row gap-1.5 justify-center items-center'>
                                <p>{tourDetail?.tour_name}</p>
                            </a>
                        </div>
                        <h1 className='py-4 font-semibold'>{tourDetail?.tour_name}</h1>
                    </div>
                </div>
                {/* Slide */}
                <div className='detail_content width-primary m-auto '>
                    <div className='grid grid-cols-12 gap-4 pb-4'>
                        <div className='col-span-8'>
                            <TourPhotoGallery origin={imageGallery} thumbnail={thumbnailGallery}></TourPhotoGallery>
                            <TourOverview data={marketDetail}></TourOverview>
                        </div>
                        <div className='col-span-4'>
                            {/* Schedule */}
                            <TourSchedules data={tourDetail}></TourSchedules>
                            {/* Flight information */}
                            <TourFlightInformation></TourFlightInformation>
                            {/* Tour guide */}
                            <TourGuide></TourGuide>
                        </div>
                    </div>
                    <TourViewed data={viewedList}></TourViewed>
                </div>
            </section >
        </StoreProvider>
    )
}

export default Detail