'use client'
import { useEffect, useState } from "react";
import locale from 'antd/locale/vi_VN';
import 'dayjs/locale/vi';
import { VI_DATE_FORMAT } from '@/constants/ui';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { ConfigProvider, DatePicker, DatePickerProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFlightDateParam } from "@/store/searchSlice";

const SearchDate = () => {
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.search);
    const searchParams = useSearchParams();
    const flightDateParam = searchParams.get('flight_date') ?? search.flightDateParam;
    const [dateValue, setDateValue] = useState<string|null|any>(dayjs().toString());
    const dateFormat = VI_DATE_FORMAT;
    const selectedTourDate: DatePickerProps['onChange'] = (date, dateString) => {
        setDateValue(date);
        dispatch(setFlightDateParam(dateString))
    };

    useEffect(() => {
        if (flightDateParam != null) {
            const flightDateFormat = dayjs(flightDateParam, dateFormat);
            setDateValue(flightDateFormat);
            dispatch(setFlightDateParam(flightDateFormat.format(dateFormat)))
        }
    }, [flightDateParam])
    return (
        <>
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
                    className="search_bar_vertical_picker_search_tour"
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
                    value={dayjs(dateValue)}
                />
            </ConfigProvider>
        </>
    );
}

export default SearchDate;