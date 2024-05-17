'use client'
import { useGetLowestDayTravelTourQuery, useGetLowestFlightDateTravelTourQuery, useGetLowestPriceTravelTourQuery } from '@/services/api/tours';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setDefaultPage, setUrlWithParam } from '@/store/searchSlice';
import { formatPrice } from '@/utils/formatPrice';
import { Skeleton } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { VI_DATE_FORMAT } from '@/constants/ui';

const SkeletonFetch = () => {
    return (
        <div className='text-center'>
            <Skeleton
                title={false}
                paragraph={{
                    rows: 1,
                    width: [100]
                }}
                active
            />
        </div>
    );
}
const SearchArrangeNavBar = () => {
    const formatDateVI = VI_DATE_FORMAT;
    const dateTime = new Date();
    const currentDateTime = dayjs(dateTime).format(VI_DATE_FORMAT);
    const router = useRouter();
    const search = useAppSelector((state) => state.search);
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    // Set default value of loading each fecht data
    const [lowestDayLoading, setLowestDayIsLoading] = useState(true);
    const [lowestFlightDateLoading, setLowestFlightDateIsLoading] = useState(true);
    const [lowestPriceLoading, setLowestPriceIsLoading] = useState(true);
    // Set default value of class active each sort button
    const [activeSortDay, setActiveSortDay] = useState('bg-sgt-secondary-default bg-opacity-5');
    const [activeSortFlightDate, setActiveSortFlightDate] = useState('');
    const [activeSortPrice, setActiveSortPrice] = useState('');
    const [param, setParam] = useState('');
    const [flightDateParam, setFlightDateParam] = useState('');
    const [priceParam, setPriceParam] = useState('');

    useEffect(() => {
        let currentUrl = search.pathWithParam ?? searchParams.toString();
        const parseParamUrl = new URLSearchParams(currentUrl);
        parseParamUrl.delete('sort_by');
        let param, flightDateParam, priceParam;
        param = '?' + parseParamUrl.toString() + "&sort_by=day_number:asc,night_number:asc";
        flightDateParam = '?' + parseParamUrl.toString() + "&sort_by=flight_date:asc";
        priceParam = '?' + parseParamUrl.toString() + "&sort_by=price_adl_off:asc,price_adl:asc";
        setParam(param);
        setFlightDateParam(flightDateParam);
        setPriceParam(priceParam);
    }, [search.pathWithParam, searchParams.toString()]);

    // Fetch Tour with lowest duration day
    const {
        data: lowestDayInfo,
        isLoading: lowestDayIsLoading,
        isFetching: lowestTourFetching
    } = useGetLowestDayTravelTourQuery(param, {
        skip: !param,
        refetchOnMountOrArgChange: true,
    });
    // Fetch Tour with lowest flight date
    const {
        data: lowestDateInfo,
        isLoading: lowestDateIsLoading,
        isFetching: lowestDateFetching
    } = useGetLowestFlightDateTravelTourQuery(flightDateParam, {
        skip: !flightDateParam,
        refetchOnMountOrArgChange: true,
    });
    // Fetch Tour with lowest price 
    const {
        data: lowestPriceInfo,
        isLoading: lowestPriceIsLoading,
        isFetching: lowestPriceFetching
    } = useGetLowestPriceTravelTourQuery(priceParam, {
        skip: !priceParam,
        refetchOnMountOrArgChange: true,
    });


    useEffect(() => {
        if (!lowestDayIsLoading) {
            setActiveSortDay('bg-sgt-secondary-default bg-opacity-5');
            setLowestDayIsLoading(false)
        }

        if (!lowestDateIsLoading) {
            setActiveSortFlightDate('');
            setLowestFlightDateIsLoading(false)
        }

        if (!lowestPriceIsLoading) {
            setActiveSortPrice('');
            setLowestPriceIsLoading(false)
        }
    },
        [
            lowestDayInfo,
            lowestDateInfo,
            lowestPriceInfo
        ]
    );

    //Function change the path for event click sort tour data
    const changePathSortBy = (param: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('sort_by');
        const pathUrl = `${params.toString()}&sort_by=${param}`;
        router.push(
            `search?${pathUrl}`,
            { shallow: true } as any
        );
        dispatch(setUrlWithParam(`${pathUrl}`));
        dispatch(setDefaultPage(1));
    }

    return (
        <>
            <div className='search_content_tour_arrange flex flex-row justify-around bg-white rounded-lg 
              text-sm font-semibold shadow text-sgt-secondary-light py-2.5'>
                <div className={'search_content_tour_arrange_item ' + activeSortDay}
                    onClick={() => {
                        changePathSortBy('day_number:asc,night_number:asc');
                        setActiveSortDay('bg-sgt-secondary-default bg-opacity-5');
                        setActiveSortFlightDate('');
                        setActiveSortPrice('');
                    }}
                >
                    <div>Thời lượng ngắn nhất </div>
                    {
                        lowestDayLoading || lowestTourFetching
                            ?
                            SkeletonFetch()
                            :
                            <div className='text-xs text-sgt-secondary-dark'>
                                {lowestDayInfo?.data.day_number} Ngày {lowestDayInfo?.data.night_number} Đêm
                            </div>
                    }
                </div>
                <div className={'search_content_tour_arrange_item ' + activeSortFlightDate}
                    onClick={() => {
                        changePathSortBy('flight_date:asc');
                        setActiveSortDay('');
                        setActiveSortFlightDate('bg-sgt-secondary-default bg-opacity-5');
                        setActiveSortPrice('');
                    }}
                >
                    <div>Khởi hành sớm nhất</div>
                    {
                        lowestFlightDateLoading || lowestDateFetching
                            ?
                            SkeletonFetch()
                            :
                            <div className='text-xs text-sgt-secondary-dark' >
                                {
                                    dayjs(lowestDateInfo?.data.flight_date).format(formatDateVI)
                                }
                            </div>
                    }
                </div>
                <div className={'search_content_tour_arrange_item ' + activeSortPrice}
                    onClick={() => {
                        changePathSortBy('price_adl_off:asc,price_adl:asc');
                        setActiveSortDay('');
                        setActiveSortFlightDate('');
                        setActiveSortPrice('bg-sgt-secondary-default bg-opacity-5');
                    }}
                >
                    <div>Giá thấp nhất</div>
                    {
                        lowestPriceLoading || lowestPriceFetching
                            ?
                            SkeletonFetch()
                            :
                            <div className='text-xs text-sgt-secondary-dark'>
                                {
                                    lowestPriceInfo?.data.price_adl != lowestPriceInfo?.data.price_adl_off
                                        ?
                                        formatPrice(lowestPriceInfo?.data.price_adl_off)
                                        :
                                        formatPrice(lowestPriceInfo?.data.price_adl)
                                }
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default SearchArrangeNavBar
