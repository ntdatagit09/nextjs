'use client';
import React from 'react'
import dayjs from 'dayjs';
import { NOT_UPDATED_INFORMATION, VI_DATE_FORMAT } from '@/constants/ui';
import { useAppSelector } from '@/store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const TourFlightInformation = () => {
    const dateFormat = VI_DATE_FORMAT;
    const flight = useAppSelector((state) => state.tour.flight);
    const flightDate: any = flight?.flight_date ? dayjs(flight.flight_date).format(dateFormat) : '00:00:0000';
    const flightDateBack: any = flight?.flight_date_back ? dayjs(flight.flight_date_back).format(dateFormat) : '00:00:0000';
    const takeoffTime = dayjs(flight.takeoff_time ?? '00:00:00', 'HH:mm:ss').format('HH:mm');
    const arriveTime = flight.arrive_time ? dayjs(flight.arrive_time ?? '00:00:00', 'HH:mm:ss').format('HH:mm') : NOT_UPDATED_INFORMATION;
    const takeoffTimeBack = dayjs(flight.takeoff_time_back ?? '00:00:00', 'HH:mm:ss').format('HH:mm');
    const arriveTimeBack = flight.arrive_time ? dayjs(flight.arrive_time_back ?? '00:00:00', 'HH:mm:ss').format('HH:mm') : NOT_UPDATED_INFORMATION;
    const shcb = flight.shcb;
    const shcbBack = flight.shcb_back;
    return (
        <>
            <div className='detail_content_card detail_content_flight_information'>
                <h3 className='detail_content_card_title'>Thông tin chuyến bay</h3>
                <div className='flex flex-col gap-4 pt-2 pb-5 px-2'>
                    <div className=''>
                        <div className='font-medium pb-2'>Ngày đi: {flightDate}</div>
                        <div className='flex flex-row justify-between items-end'>
                            <div className='font-semibold'>{takeoffTime}</div>
                            <div className='text-base font-bold text-sgt-primary-dark'>{shcb}</div>
                            <div className='font-semibold'>{arriveTime}</div>
                        </div>
                        <div className='flex flex-row justify-between items-center px-3.5'>
                            <div className='w-3 h-3 rounded-full border-2 border-sgt-primary-default'></div>
                            <div className='text-base flex-1 border border-dashed border-sgt-secondary-light border-opacity-15'></div>
                            <div className='w-3 h-3 rounded-full bg-sgt-primary-default'></div>
                        </div>
                        <div className='text-center text-base'>
                            <FontAwesomeIcon className='text-sgt-secondary-dark' icon={faPlane}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className=''>
                        <div className='font-medium pb-2'>Ngày về: {flightDateBack}</div>
                        <div className='flex flex-row justify-between items-end'>
                            <div className='font-semibold'>{takeoffTimeBack}</div>
                            <div className='text-base font-bold text-sgt-primary-dark'>{shcbBack}</div>
                            <div className='font-semibold'>{arriveTimeBack}</div>
                        </div>
                        <div className='flex flex-row justify-between items-center px-3.5'>
                            <div className='w-3 h-3 rounded-full border-2 border-sgt-primary-default'></div>
                            <div className='text-base flex-1 border border-dashed border-sgt-secondary-light border-opacity-15'></div>
                            <div className='w-3 h-3 rounded-full bg-sgt-primary-default'></div>
                        </div>
                        <div className='text-center text-base'>
                            <FontAwesomeIcon className='text-sgt-secondary-dark' icon={faPlane}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TourFlightInformation