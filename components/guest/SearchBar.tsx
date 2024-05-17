import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import SearchDate from './SearchDate';
import '@/styles/components/date-picker-calendar-custom.scss';
import "@/styles/components/search-bar-vertical.scss";
import SearchBarInputLocation from '../../app/(guest)/search/components/SearchBarInputLocation';
import SearchBarButton from '@/app/(guest)/search/components/SearchBarButton';

function SearchBar() {
    return (
        <section className='bg-gradient-to-r from-sgt-primary-dark from-60% to-sgt-primary-light h-16 flex justify-center items-center'>
            <div className='width-primary m-auto text-sm font-bold'>
                <div className='w-full grid grid-cols-12 gap-3'>
                    <div className='col-span-6 bg-white bg-opacity-15 p-2 pl-3 rounded-md text-white flex items-center gap-1'>
                        <FontAwesomeIcon icon={['fas', 'location-dot']} />
                        <SearchBarInputLocation />
                    </div>

                    <div className='col-span-4 bg-white bg-opacity-15 p-2 pl-3 rounded-md text-white flex justify-center items-center gap-1'>
                        <FontAwesomeIcon icon={['fas', 'calendar-days']} />
                        <SearchDate />
                    </div>

                    <div className='col-span-2'>
                        <SearchBarButton />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default SearchBar