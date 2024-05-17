'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faCalendarDays, faChevronLeft, faChevronRight, faLeaf, faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AutoComplete, ConfigProvider, DatePicker, DatePickerProps, Input } from 'antd';
import locale from 'antd/locale/vi_VN';
import 'dayjs/locale/vi';
import { VI_DATE_FORMAT } from '@/constants/ui';
import '@/styles/components/date-picker-calendar-custom.scss';
import "@/styles/components/search-bar-vertical.scss";
import dayjs from 'dayjs';
import { useAppSelector } from '@/store/hooks';
import { useGetMarketsQuery } from '@/services/api/markets';
import { transferStringToSlug } from '@/utils/formatString';
import { useGetNationsQuery } from '@/services/api/nation';
import { useRouter } from "next/navigation";
import Link from 'next/link';

const SearchBarVertical = () => {
    /** use hook */
    const router = useRouter();
    const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
    const [searchParam, setSearchParam] = useState('');
    const [dataSelected, setDataSelected] = useState('');
    const [filterSearchMarket, setFilterSearchMarket] = useState<string>("");
    const [filterSearch, setFilterSearch] = useState<string>("?sort_by=sort_order:asc");
    const { data: nationData, isLoading: nationLoading } = useGetNationsQuery(filterSearch);
    const { data: marketData, isLoading: marketLoading } = useGetMarketsQuery(filterSearchMarket)
    const dateFormat = VI_DATE_FORMAT;
    let nationOptions: any = [];
    let marketOptions: any = [];
    let finalOptions: any[] = [];

    const selectedTourDate: DatePickerProps['onChange'] = (date, dateString) => {
        setDataSelected(dateString as string);
    };
    const handleOnClickNation = (e: any) => {
        const valueAttribute = e.target.getAttribute('data-slug');
        setSearchParam("nation=" + valueAttribute);
        setAutoCompleteOpen(false);
    }

    const handleOnClickMarket = (e: any) => {
        const valueAttribute = e.target.getAttribute('data-slug');
        setSearchParam("filter_search=" + valueAttribute);
        setAutoCompleteOpen(false);
    }

    const handleOnSearch = (value: any) => {
        const searchFilter = "?filter_search=" + transferStringToSlug(value)
        setTimeout(() => {
            setFilterSearch(searchFilter);
            setFilterSearchMarket(searchFilter)
        });
    }

    const renderTitle = (title: string) => (
        <span className='text-sm'>
            {title}
        </span>
    );

    const renderNationItem = (title: string, count: number, icon: string | null) => ({
        value: title,
        label: (
            <div
                onClick={(e) => handleOnClickNation(e)}
                data-slug={transferStringToSlug(title)}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div data-slug={transferStringToSlug(title)} className="flex">
                    <img src={icon ?? ''} alt="" className="w-5 h-5 mr-2" />
                    {title}
                </div>
                <span>
                    {count} tours
                </span>
            </div>
        ),
    });

    const renderMarketItem = (title: string, id: any) => ({
        value: title,
        label: (
            <div onClick={(e) => handleOnClickMarket(e)}
                data-slug={transferStringToSlug(title)}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div data-slug={transferStringToSlug(title)}>{title}</div>
            </div>
        ),
    });

    let options = [
        {
            label: renderTitle('Địa điểm phổ biến nước ngoài'),
            options: [],
        },
        {
            label: renderTitle('Tour du lịch phổ biến'),
            options: []
        }
    ];

    if (!nationLoading) {
        nationOptions = (nationData?.data.map(nation => renderNationItem(nation.nation_name, nation.total_tour, nation.url_media)))
        options[0].options = nationOptions;
    }

    if (!marketLoading) {
        console.log(marketData);
        marketOptions = (marketData?.data.map(market => renderMarketItem(market.market_name + " - " + market.day_number + "N" + market.night_number + "D - " + market.tour_name, market.market_id)))
        options[1].options = marketOptions;
    }

    if (marketData?.data.length == 0 && nationData?.data.length == 0) {
        options = [
            {
                label: renderTitle('Không có kết quả tìm kiếm'),
                options: [],
            },
        ]
    }

    return (
        <section className='px-5 pt-2 pb-6 flex justify-center items-center'>
            <div className='width-primary m-auto text-lg font-normal'>
                <div className='w-full grid grid-cols-12 gap-4'>
                    <div className='relative col-span-12 bg-white bg-opacity-10 text-white flex flex-1 justify-start items-center rounded-md border
                    '>
                        <FontAwesomeIcon className='absolute left-3' icon={faLocationDot} />
                        <AutoComplete
                            className='search_bar_vertical_auto_complete'
                            popupClassName="certain-category-search-dropdown"
                            popupMatchSelectWidth={true}
                            options={options}
                            listHeight={380}
                            onSearch={(value) => handleOnSearch(value)}
                        >
                            <input id="search" type="text" placeholder="Bạn muốn đi đâu?" className='search_bar_vertical_input_auto_complete' />
                        </AutoComplete>
                    </div>

                    <div className='relative col-span-9 bg-white bg-opacity-10 text-white flex justify-center items-center rounded-md border
                    '>
                        <FontAwesomeIcon className='absolute left-3' icon={faCalendarDays} />
                        <ConfigProvider locale={locale}
                            theme={{
                                components: {
                                    DatePicker: {
                                        cellWidth: 42,
                                        cellHeight: 42,
                                        fontSize: 14,
                                    },
                                },
                            }}
                        >
                            <DatePicker
                                popupClassName="date_picker_calendar_custom"
                                className="search_bar_vertical_picker"
                                placeholder='Ngày khởi hành'
                                format={dateFormat}
                                showNow={false}
                                superNextIcon={null}
                                superPrevIcon={null}
                                allowClear={false}
                                suffixIcon={true}
                                placement='topRight'
                                minDate={dayjs()}
                                nextIcon={<FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>}
                                prevIcon={<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>}
                                onChange={selectedTourDate}
                            />
                        </ConfigProvider>
                    </div>
                    <a href={`/search?${searchParam} ${dataSelected ? `&flight_date=${dataSelected}` : ''} `} className='col-span-3 bg-sgt-primary-default text-sgt-secondary-dark rounded-md 
                        font-bold text-lg flex flex-row justify-center items-center'
                    >
                        <FontAwesomeIcon className='text-base' icon={faSearch} />
                        <div className='pl-2' id="search">Tìm tour</div>
                        {/* <a href='/search?type=tour-thai-lan&date=04-04-2024' className='pl-2' id="search" >Tìm tour</a> */}
                    </a>
                </div>
            </div>
        </section >
    )
}

export default SearchBarVertical

// onClick={searchTour}