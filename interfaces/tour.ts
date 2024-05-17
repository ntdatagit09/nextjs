export interface ITourSummary {
    [key: string]: any;
    tour_id: number,
    market_id: number,
    series_code: string,
    market_name: string,
    market_slug: string,
    tour_name: string,
    day_number: number,
    night_number: number,
    flight_date: string,
    price_adl: string,
    price_chd: string,
    price_inf: string,
    price_adl_off: string,
    price_chd_off: string,
    price_inf_off: string,
    images: ITourImageSummary
}

export interface ITourImageSummary {
    original_image: string,
    thumbnail_360: string,
    thumbnail_120: string,
    thumbnail_86: string
}

export interface ITourLowestDay {
    day_number: number,
    night_number: number
}

export interface ITourLowestFlightDate {
    flight_date: string,
}

export interface ITourLowestPrice {
    price_adl: string,
    price_adl_off: string
}
export interface ITourDetail extends ITourSummary {
    flight_date_back: string,
    remaining_seats: number,
    takeoff_time: string,
    takeoff_time_back: string,
    tour_guide_full_name: string,
    tour_guide_phone: string,
    arrive_time: string,
    arrive_time_back: string,
    shcb: string,
    shcb_back: string,
}