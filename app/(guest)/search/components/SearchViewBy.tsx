'use client';
import { HORIZONTAL_VIEW, VERTICAL_VIEW } from '@/constants/ui'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setViewType } from '@/store/searchSlice';
import { faGrip, faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

type SearchViewByParam = {
    tourNumber: number,
    tourName: string
}

const SearchViewBy = (props: SearchViewByParam) => {
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.search);
    const changeView = (view: string) => {
        dispatch(setViewType(view));
    }
    return (
        <div>
            <div className='my-3 bg-sgt-primary-light rounded-md flex justify-between items-center py-2 px-3'>
                <div className='search_content_tour-title font-semibold'>Có {props.tourNumber} tour du lịch {props.tourName}</div>
                <div className='flex flex-row justify-center items-center gap-2'>
                    <div className='text-sm font-medium'>Xem theo</div>
                    <button onClick={() => changeView(HORIZONTAL_VIEW)}
                        className={`search_result_btn_view_by
                        ${search.viewType == HORIZONTAL_VIEW ? 'active' : ''}`}
                    >
                        <FontAwesomeIcon icon={faListUl}></FontAwesomeIcon>
                    </button>
                    <button onClick={() => changeView(VERTICAL_VIEW)}
                        className={`search_result_btn_view_by
                        ${search.viewType == VERTICAL_VIEW ? 'active' : ''}`}
                    >
                        <FontAwesomeIcon icon={faGrip}></FontAwesomeIcon>
                    </button>
                </div>
            </div >
        </div>
    )
}

export default SearchViewBy