
'use client';
import dayjs from 'dayjs';
import locale from 'antd/locale/vi_VN';
import 'dayjs/locale/vi';
import React, { useEffect, useState } from "react";
import { ITourSchedule } from "@/interfaces/tourSchedule";
import { useGetTourDetailByIdQuery, useGetTourSchedulesQuery, useSaveTourBookingMutation } from "@/services/api/tours";
import StoreProvider from "@/store/StoreProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTourId, setSeatBooking, setTotalBooking, setTourFlight, setTourGuide } from "@/store/toursSlice";
import { SEAT_ADL, SEAT_CHD, SEAT_INF, TOUR_ID_RECENTLYVIEW_LOCAL_KEY } from "@/constants/tour";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCheck, faChevronLeft, faChevronRight, faClose, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "@/utils/formatPrice";
import { ConfigProvider, DatePicker, DatePickerProps, Modal, Skeleton } from 'antd';
import { useForm } from "react-hook-form";
import HeaderForm from "./HeaderForm";
import BookFieldForm from "./BookingForm";
import type { Dayjs } from 'dayjs';
import { RangePickerProps } from "antd/es/date-picker";
import { ITourDetail, ITourSummary } from "@/interfaces/tour";
import Loading from '@/components/guest/Loading';


const TourSchedules = ({ data }: { data: ITourSummary }) => {

    /** Params */

    /** use hook */

    const dispatch = useAppDispatch();
    const tours = useAppSelector((state) => state.tour);

    if (tours.booking.tour_id == 0) {
        dispatch(setTourId(data?.tour_id));
    }

    const tourDetailQuery = useGetTourDetailByIdQuery(tours.booking.tour_id);
    const tourSchedulesQuery = useGetTourSchedulesQuery(data?.market_slug);
    const [saveTourBooking, isLoading] = useSaveTourBookingMutation();
    const [openBookingModal, setOpenBookingModal] = useState(false);
    const [openAdviseModal, setOpenAdviseModal] = useState(false);
    const [openBookingSuccessModal, setOpenBookingSuccessModal] = useState(false);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [tourDateSelected, setTourDateSelected] = useState<Dayjs>();
    const [toursBySelected, setToursBySelected] = useState<ITourSchedule[]>([]);
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: "all",
        defaultValues: {
            full_name: '',
            phone: '',
            email: '',
            other: '',
        },
    });

    const dateFormat = 'DD/MM/YYYY';
    let tourDetail: ITourDetail = tourDetailQuery.data?.data;
    const tourSchedules: ITourSchedule[] = tourSchedulesQuery.data?.data ?? [];
    let booking: any = { ...tours.booking };
    const validateRules = {
        full_name: {
            required: 'Họ và tên là bắt buộc',
        },
        phone: {
            required: 'Điện thoại là bắt buộc',
            maxLength: {
                value: 11,
                message: 'Số điện thoại không vượt quá 11 kí tự',
            }
        },
        email: {
            pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email không đúng định dạng",
            },
        }
    }

    const changeTourSchedule = (tourId: number) => {
        let tourSelected = tourSchedules.find(s => s.tour_id == tourId);
        let tourDate = dayjs(dayjs(tourSelected?.flight_date), dateFormat);
        dispatch(setTourId(tourId));
        setTourDateSelected(tourDate);
    }

    const updateTotalPrice = () => {
        booking.total = 0;
        if (tourDetail) {
            [SEAT_ADL, SEAT_CHD, SEAT_INF].forEach(seatType => {
                booking.total += booking[seatType] * tourDetail?.[`price_${seatType}`];
            })
        }
        dispatch(setTotalBooking(booking.total));
    }

    const addSeat = (seatType: string) => {
        booking[seatType] += 1;
        dispatch(setSeatBooking({
            type: seatType,
            value: booking[seatType]
        }));
        updateTotalPrice();
    }

    const removeSeat = (seatType: string) => {
        if (booking[seatType] == 0) {
            booking[seatType] = 0;
        } else {
            booking[seatType] -= 1;
        }
        dispatch(setSeatBooking({
            type: seatType,
            value: booking[seatType]
        }));
        updateTotalPrice();
    }

    const onSubmit = async (data: any) => {
        let formData = { ...data };
        const { tour_id } = tours.booking;
        const { price_adl, price_chd, price_inf } = tourDetail;
        const bookingSeats: any = {
            [`${SEAT_ADL}_number`]: tours.booking[SEAT_ADL],
            [`${SEAT_CHD}_number`]: tours.booking[SEAT_CHD],
            [`${SEAT_INF}_number`]: tours.booking[SEAT_INF]
        };
        formData = { ...formData, price_adl, price_chd, price_inf, tour_id, ...bookingSeats };
        setSpinning(true);
        saveTourBooking(formData).unwrap()
            .then((payload) => {
                if (payload.success) {
                    setOpenBookingModal(false);
                    setOpenAdviseModal(false);
                    setOpenBookingSuccessModal(true);
                }
            })
            .catch((error) => {

            }).finally(() => {
                setSpinning(false);
            });
    }

    const SeatBookingComponent = () => {
        return (
            <>
                <div className='flex flex-row justify-between items-center py-3'>
                    <h5 className='font-semibold'>Số chỗ còn nhận</h5>
                    <h3 className='font-semibold text-sgt-secondary-default'>{tourDetail?.remaining_seats ?? 0}</h3>
                </div>
                <hr className='border-sgt-primary-default border-opacity-30' />
                <div className='detail_content_schedule_price flex flex-row justify-between items-center py-2'>
                    <div>
                        <div className='font-bold'>Người lớn</div>
                        <div className='text-gray-500'> {'>'} 9 tuổi</div>
                    </div>
                    <div className='text-base font-semibold text-red-500'>
                        x{formatPrice((tourDetail?.price_adl ?? '0'))}
                    </div>
                    <div className='flex flex-row justify-between items-center gap-2 text-base'>
                        <FontAwesomeIcon className='cursor-pointer px-1 py-0.5 border rounded border-transparent transition ease-linear duration-300 hover:border-sgt-primary-dark' icon={faMinus}
                            onClick={() => removeSeat(SEAT_ADL)}>
                        </FontAwesomeIcon>
                        <div className='w-10 text-center text-lg font-semibold text-sgt-secondary-default'>{tours.booking[SEAT_ADL]}</div>
                        <FontAwesomeIcon className='cursor-pointer px-1 py-0.5 border rounded border-transparent transition ease-linear duration-300 hover:border-sgt-primary-dark' icon={faPlus}
                            onClick={() => addSeat(SEAT_ADL)}>
                        </FontAwesomeIcon>
                    </div>
                </div>
                <div className='detail_content_schedule_price flex flex-row justify-between items-center py-2'>
                    <div>
                        <div className='font-bold'>Trẻ em</div>
                        <div className='text-gray-500'>2 - 9 tuổi</div>
                    </div>
                    <div className='text-base font-semibold text-red-500'>
                        x{formatPrice(tourDetail?.price_chd ?? '0')}
                    </div>
                    <div className='flex flex-row justify-between items-center gap-2 text-base'>
                        <FontAwesomeIcon className='cursor-pointer px-1 py-0.5 border rounded border-transparent transition ease-linear duration-300 hover:border-sgt-primary-dark' icon={faMinus}
                            onClick={() => removeSeat(SEAT_CHD)}>
                        </FontAwesomeIcon>
                        <div className='w-10 text-center text-lg font-semibold text-sgt-secondary-default'>{tours.booking[SEAT_CHD]}</div>
                        <FontAwesomeIcon className='cursor-pointer px-1 py-0.5 border rounded border-transparent transition ease-linear duration-300 hover:border-sgt-primary-dark' icon={faPlus}
                            onClick={() => addSeat(SEAT_CHD)}>
                        </FontAwesomeIcon>
                    </div>
                </div>
                <div className='detail_content_schedule_price flex flex-row justify-between items-center py-2'>
                    <div>
                        <div className='font-bold'>Trẻ nhỏ</div>
                        <div className='text-gray-500'> {'<'} 2 tuổi</div>
                    </div>
                    <div className='text-base font-semibold text-red-500'>
                        x{formatPrice(tourDetail?.price_inf ?? '0')}
                    </div>
                    <div className='flex flex-row justify-between items-center gap-2 text-base'>
                        <FontAwesomeIcon className='cursor-pointer px-1 py-0.5 border rounded border-transparent transition ease-linear duration-300 hover:border-sgt-primary-dark' icon={faMinus}
                            onClick={() => removeSeat(SEAT_INF)}>
                        </FontAwesomeIcon>
                        <div className='w-10 text-center text-lg font-semibold text-sgt-secondary-default'>{tours.booking[SEAT_INF]}</div>
                        <FontAwesomeIcon className='cursor-pointer px-1 py-0.5 border rounded border-transparent transition ease-linear duration-300 hover:border-sgt-primary-dark' icon={faPlus}
                            onClick={() => addSeat(SEAT_INF)}>
                        </FontAwesomeIcon>
                    </div>
                </div>
                <hr className='border-sgt-primary-default border-opacity-30' />
                <div className='flex flex-row justify-between items-center py-6'>
                    <h4 className='font-semibold'>Tổng giá tour</h4>
                    <h3 className='text-2xl font-medium text-red-500'>
                        {formatPrice((tours.booking.total | 0).toString())}<span className='text-lg'> VND</span>
                    </h3>
                </div>
            </>
        )
    }

    const selectedTourDate: DatePickerProps['onChange'] = (date, dateString) => {
        let scheduleIndex = tourSchedules.map(t => dayjs(t.flight_date).format(dateFormat)).indexOf(date?.format(dateFormat));;
        let arr: ITourSchedule[] = [];
        arr = toursBySelected;
        if (scheduleIndex > -1) {
            changeTourSchedule(tourSchedules[scheduleIndex].tour_id);
            arr = [];
            if (scheduleIndex == 0) {
                arr.push(tourSchedules[scheduleIndex])
                arr.push(tourSchedules[scheduleIndex + 1])
                arr.push(tourSchedules[scheduleIndex + 2])
            } else if (scheduleIndex == (tourSchedules.length - 1)) {
                arr.push(tourSchedules[scheduleIndex])
                arr.push(tourSchedules[scheduleIndex - 1])
                arr.push(tourSchedules[scheduleIndex - 2])
            } else if (scheduleIndex > 0 && scheduleIndex < (tourSchedules.length - 1)) {
                arr.push(tourSchedules[scheduleIndex - 1])
                arr.push(tourSchedules[scheduleIndex])
                arr.push(tourSchedules[scheduleIndex + 1])
            }
        }
        arr.sort((a, b) => {
            let aDate: number = dayjs(a.flight_date, dateFormat).valueOf();
            let bDate: number = dayjs(b.flight_date, dateFormat).valueOf();
            return aDate - bDate;
        });
        setToursBySelected(arr);
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        let indexSchedule = tourSchedules.map((item => dayjs(item.flight_date).format(dateFormat))).indexOf(current.format(dateFormat));
        return current && indexSchedule == -1;
    };

    const cellRender: DatePickerProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type !== 'date') {
            return info.originNode;
        }
        if (typeof current === 'number' || typeof current === 'string') {
            return <div className="ant-picker-cell-inner">{current}</div>;
        }
        const cellClasses = ['ant-picker-cell-inner'];
        let indexSchedule = tourSchedules.map((item => dayjs(item.flight_date).format(dateFormat))).indexOf(current.format(dateFormat));
        let remainingSeats: any = '';
        if (indexSchedule > -1) {
            cellClasses.push('sgt-picker-cell-special-date ');
            remainingSeats = tourSchedules[indexSchedule].remaining_seats;
        }
        const cellClassName = cellClasses.join(' ');
        return (
            <>
                <span className="sgt-picker-cell-special-date-seats">
                    {remainingSeats ? `${remainingSeats} chỗ` : null}
                </span>
                <div className={cellClassName}>
                    {current.date()}
                </div>
            </>
        );
    };


    /** UI Component */
    const TourSchelesSkeleton = () => {
        return <>
            {
                [1, 2, 3].map((item) => {
                    return <Skeleton.Button key={item} block={true} active></Skeleton.Button>
                })

            }
            <Skeleton.Button className='!w-9 !min-w-9'></Skeleton.Button>
        </>
    }

    useEffect(() => {
        updateTotalPrice();
        dispatch(setTourFlight(
            {
                flight_date: tourDetail?.flight_date,
                flight_date_back: tourDetail?.flight_date_back,
                takeoff_time: tourDetail?.takeoff_time,
                takeoff_time_back: tourDetail?.takeoff_time_back,
                arrive_time: tourDetail?.arrive_time,
                arrive_time_back: tourDetail?.arrive_time_back,
                shcb: tourDetail?.shcb,
                shcb_back: tourDetail?.shcb_back,
            }
        ))
        dispatch(setTourGuide({
            tour_guide_full_name: tourDetail?.tour_guide_full_name,
            tour_guide_phone: tourDetail?.tour_guide_phone,
        }))
    }, [tourDetail]);

    useEffect(() => {
        let currentDate: Dayjs = dayjs(tourSchedules.find(s => s.tour_id == data.tour_id)?.flight_date);
        selectedTourDate(currentDate, currentDate.format(dateFormat));
    }, [tourSchedules]);

    useEffect(() => {
        let localTourIds: any = localStorage.getItem(TOUR_ID_RECENTLYVIEW_LOCAL_KEY);
        localTourIds = localTourIds ? JSON.parse(localTourIds) : [];
        const tourIdExist = localTourIds.find((id: any) => id == data?.tour_id.toString());
        if (!tourIdExist) {
            localTourIds.push(data?.tour_id.toString());
        }
        localTourIds = JSON.stringify(localTourIds);
        localStorage.setItem(TOUR_ID_RECENTLYVIEW_LOCAL_KEY, localTourIds);
    }, [data]);

    return (
        <StoreProvider>
            <Loading isLoading={spinning}></Loading>
            <div className='detail_content_card detail_content_schedule'>
                <h3 className='detail_content_card_title'>Lịch trình</h3>
                <p className='font-medium'>Chọn lịch trình để xem giá</p>
                <div className='flex flex-row gap-1.5 flex-nowrap py-2 w-full'>
                    {
                        tourSchedulesQuery.isLoading ?
                            <>
                                <TourSchelesSkeleton></TourSchelesSkeleton>
                            </>
                            :
                            <>
                                {
                                    toursBySelected?.map((item) =>
                                        <button
                                            key={item.tour_id}
                                            className={`detail_content_schedule_item ${item.tour_id == tours.booking.tour_id ? 'bg-sgt-primary-default' : ''}`}
                                            onClick={() => changeTourSchedule(item.tour_id)}>
                                            {dayjs(item.flight_date).format(dateFormat)}
                                        </button>
                                    )
                                }
                                <div className="relative basis-9 flex-shrink-0 flex-grow-0">
                                    <ConfigProvider locale={locale}
                                        theme={{
                                            components: {
                                                DatePicker: {
                                                    cellWidth: 42,
                                                    cellHeight: 42,
                                                    fontSize: 15,
                                                },
                                            },
                                        }}
                                    >
                                        <DatePicker
                                            popupClassName="date_picker_calendar_custom detail-tour-schedule-calendar"
                                            className="detail-tour-schedule-picker"
                                            cellRender={cellRender}
                                            disabledDate={disabledDate}
                                            minDate={dayjs()}
                                            showNow={false}
                                            open={openDatePicker}
                                            onOpenChange={(status) => setOpenDatePicker(status)}
                                            superNextIcon={null}
                                            superPrevIcon={null}
                                            nextIcon={<FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>}
                                            prevIcon={<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>}
                                            onChange={selectedTourDate}
                                            // defaultValue={tourDateSelected}
                                            // defaultOpenValue={tourDateSelected}
                                            value={tourDateSelected}
                                        />
                                    </ConfigProvider>
                                    <button className={`detail_content_schedule_item absolute left-0 ${openDatePicker ? 'z-50' : 'z-0'}`}>
                                        <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
                                    </button>
                                    <button className={`detail_content_schedule_item absolute left-0 ${openDatePicker ? 'z-0' : 'z-50'}`}
                                        onClick={() => setOpenDatePicker(!openDatePicker)} disabled={openDatePicker}>
                                        <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
                                    </button>
                                </div>
                            </>
                    }

                </div>
                <div><SeatBookingComponent></SeatBookingComponent></div>
                <div className='detail_content_schedule_booking flex flex-row justify-center items-center gap-8 pt-3 pb-5 text-xl font-medium'>
                    <button className='px-9 py-1.5 rounded-lg border border-sgt-primary-default text-sgt-secondary-default 
                    transition duration-300 hover:bg-sgt-secondary-dark hover:text-white hover:border-transparent'
                        onClick={() => setOpenAdviseModal(true)}>
                        Tư vấn
                    </button>
                    <button className='px-9 py-1.5 rounded-lg border border-transparent bg-sgt-primary-default text-sgt-secondary-default 
                    transition duration-300 hover:bg-sgt-secondary-dark hover:text-white'
                        onClick={() => setOpenBookingModal(true)}>
                        Đặt tour
                    </button>
                </div>
            </div>

            {/* Booking Modal */}
            <Modal
                title=""
                style={{}}
                open={openBookingModal}
                onOk={() => setOpenBookingModal(false)}
                onCancel={() => setOpenBookingModal(false)}
                width={800}
                footer={null}
                closeIcon={null}
                className="sgt-booking-modal"
            // maskClosable={false}
            >
                <button className="bg-sgt-primary-default w-6 h-6 rounded-full absolute -right-2.5 -top-4 text-center text-sgt-secondary-light"
                    onClick={() => setOpenBookingModal(false)}>
                    <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                </button>
                <div className="grid grid-cols-12 rounded-lg overflow-hidden">
                    <div className="col-span-6 p-4 pb-8 bg-sgt-primary-default rounded-lg">
                        <HeaderForm></HeaderForm>
                        <BookFieldForm
                            formId={'BookingForm'}
                            control={control}
                            errors={errors}
                            validateRules={validateRules}
                            onSubmit={handleSubmit(onSubmit)}>
                        </BookFieldForm>
                    </div>
                    <div className="col-span-6 p-4 bg-white">
                        <div className='detail_content_card detail_content_schedule'>
                            <h3 className='detail_content_card_title font-semibold'>Khởi hành ngày {dayjs(tourDetail?.flight_date).format(dateFormat)}</h3>
                            <SeatBookingComponent></SeatBookingComponent>
                            <div className='detail_content_schedule_booking flex flex-row justify-center items-center pt-7 pb-5 text-xl font-medium'>
                                <button className='w-9/12 px-9 py-1.5 rounded-lg border border-transparent bg-sgt-primary-default text-sgt-secondary-default 
                                        transition duration-300 hover:bg-sgt-secondary-dark hover:text-white'
                                    type="submit" form="BookingForm">
                                    Đặt tour
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>

            {/* Advise Modal */}
            <Modal
                title=""
                style={{}}
                open={openAdviseModal}
                onOk={() => setOpenAdviseModal(false)}
                onCancel={() => setOpenAdviseModal(false)}
                width={400}
                footer={null}
                closeIcon={null}
                className="sgt-booking-modal"
            >
                <button className="bg-white w-6 h-6 rounded-full absolute -right-2.5 -top-4 text-center text-sgt-secondary-light"
                    onClick={() => setOpenAdviseModal(false)}>
                    <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                </button>
                <div className="grid grid-cols-12 rounded-lg overflow-hidden">
                    <div className="col-span-12 p-4 bg-sgt-primary-default rounded-lg">
                        <HeaderForm></HeaderForm>
                        <BookFieldForm
                            formId={'BookingForm'}
                            control={control}
                            errors={errors}
                            validateRules={validateRules}
                            onSubmit={handleSubmit(onSubmit)}>
                        </BookFieldForm>
                        <div className='detail_content_schedule_booking flex flex-row justify-center items-center gap-8 pt-7 pb-5'>
                            <button className='w-9/12 text-xl font-medium px-12 py-1.5 rounded-lg
                                 text-sgt-secondary-default
                                 border border-sgt-secondary-dark
                                 transition duration-300 hover:bg-sgt-secondary-dark hover:text-white'
                                type="submit" form="BookingForm">
                                Gửi yêu cầu
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                title=""
                style={{}}
                open={openBookingSuccessModal}
                onOk={() => setOpenBookingSuccessModal(false)}
                onCancel={() => setOpenBookingSuccessModal(false)}
                width={400}
                footer={null}
                closeIcon={null}
                className="sgt-booking-modal"
            >
                <div className='p-4 flex flex-col justify-between gap-4'>
                    <div className='mt-2 mb-3 bg-green-500 h-16 w-16 rounded-full m-auto flex flex-grow justify-center items-center'>
                        <FontAwesomeIcon className='text-white text-4xl' icon={faCheck}></FontAwesomeIcon>
                    </div>
                    <h1 className='text-center'>Thông tin đã được gửi!</h1>
                    <h4 className='font-medium'>Cảm ơn bạn đã chọn chúng tôi. SaigonTimes Travel sẽ liên hệ lại với bạn trong thời gian sớm nhất.</h4>
                    <button className='mt-2 mb-3 m-auto w-9/12 text-xl font-medium px-12 py-1.5 rounded-lg text-sgt-secondary-default
                        border border-sgt-secondary-dark border-opacity-30
                        transition duration-300 hover:border-sgt-primary-default hover:bg-sgt-primary-default '
                        onClick={() => setOpenBookingSuccessModal(false)}
                    >
                        OK
                    </button>
                </div>
            </Modal >
        </StoreProvider >
    )
}

export default TourSchedules