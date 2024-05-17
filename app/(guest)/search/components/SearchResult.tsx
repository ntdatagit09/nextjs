
'use client';
import React, { useEffect, useState } from 'react'
import TourItemHorizontal from '@/components/guest/TourItemHorizontal';
import TourItemVertical from '@/components/guest/TourItemVertical';
import { HORIZONTAL_VIEW, VI_DATE_FORMAT } from '@/constants/ui';
import SearchViewBy from './SearchViewBy';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetToursQuery } from '@/services/api/tours';
import { Pagination } from 'antd';
import TourItemSkeletonHorizontal from '@/components/guest/TourItemSkeletonHorizontal';
import TourItemSkeletonVertical from '@/components/guest/TourItemSkeletonVertical';
import { setDefaultPage } from '@/store/searchSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
type SearchResultParam = {
    data: string[],
}

const SearchResult = (props: SearchResultParam) => {
    /** Use Hook */
    const router = useRouter();
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.search);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const [tourParam, setTourParam] = useState('');
    const limit = 9;
    let limitParam = "";
    let defaultPage;
    const currentDateTime = dayjs().format(VI_DATE_FORMAT);
    const { data: responseTour, isLoading: tourLoading, isFetching } = useGetToursQuery(
        tourParam,
        {
            refetchOnMountOrArgChange: true,
            skip: !tourParam
        }
    );
    const pagination = responseTour?.pagination;

    useEffect(() => {
        let currentUrl = search.pathWithParam ?? searchParams.toString();
        if (currentUrl == null || currentUrl == '') {
            let param = `?flight_date=${currentDateTime}&sort_by=day_number:asc,night_number:asc`;
            limitParam = param + `&limit=${limit}`;
            router.push(
                `search${param}`,
                { shallow: true } as any
            );
        } else {
            limitParam = `?${currentUrl}&limit=${limit}`;
        }
        if (search.defaultPage > 0) {
            dispatch(setDefaultPage(0));
            setPage(1)
            defaultPage = `&page=${1}`;
        } else {
            defaultPage = `&page=${page}`;
        }
        const tourParam = limitParam + defaultPage;
        setTourParam(tourParam);
    }, [search.pathWithParam, page])

    useEffect(() => {
        if (!tourLoading) {
            setLoading(false);
        }
    }, [responseTour])

    return (
        <>
            <SearchViewBy tourNumber={isFetching ? null : pagination?.total} tourName={''}></SearchViewBy>
            <div className='search_result mt-4 pb-4'>
                <div className='grid grid-cols-12 gap-4'>
                    {
                        loading || isFetching
                            ?
                            props.data.map(item =>
                                <>
                                    {
                                        search.viewType == HORIZONTAL_VIEW ?
                                            <TourItemSkeletonHorizontal></TourItemSkeletonHorizontal>
                                            : <TourItemSkeletonVertical></TourItemSkeletonVertical>
                                    }
                                </>
                            )
                            :
                            responseTour?.data.map(tour =>
                                <>
                                    {
                                        search.viewType == HORIZONTAL_VIEW ?
                                            <TourItemHorizontal item={tour}></TourItemHorizontal>
                                            : <TourItemVertical item={tour}></TourItemVertical>
                                    }
                                </>
                            )
                    }
                </div>
                <div className='text-center'>
                    <Pagination
                        className='!mt-4'
                        onChange={(page, pageSize) => {
                            setPage(page)
                            setLoading(true)
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth"
                            });
                        }}
                        defaultPageSize={pagination?.per_page}
                        responsive={true}
                        showSizeChanger={false}
                        total={pagination?.total}
                        current={page}
                        hideOnSinglePage={true}
                    />
                </div>

            </div>
        </>

    )
}

export default SearchResult