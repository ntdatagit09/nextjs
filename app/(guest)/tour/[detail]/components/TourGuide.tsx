'use client';

import { NOT_UPDATED_INFORMATION } from '@/constants/ui';
import { useAppSelector } from "@/store/hooks";
import React from 'react'

const TourGuide = () => {
    const guide = useAppSelector((state) => state.tour.guide);
    const tourGuideName = guide.tour_guide_full_name ?? NOT_UPDATED_INFORMATION;
    const tourGuidePhone = guide.tour_guide_phone ?? NOT_UPDATED_INFORMATION;
    return (
        <>
            <div className='detail_content_card detail_content_tour_guide pb-4'>
                <h3 className='detail_content_card_title'>Hướng dẫn viên</h3>
                <div className='flex flex-row justify-between pb-2'>
                    <div>Họ và tên</div>
                    <div className='text-base font-medium'>{tourGuideName}</div>
                </div>
                <div className='flex flex-row justify-between pb-2'>
                    <div>Điện thoại</div>
                    <div className='text-base font-medium'>{tourGuidePhone}</div>
                </div>
            </div>
        </>
    )
}

export default TourGuide