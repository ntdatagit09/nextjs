export interface IMarketFilter {
    market_name: string,
    market_id: number,
    tour_name: string,
    day_number: number,
    night_number: number,
    nation_name: string,
    url_media: string
}
export interface IMarketDetail {
    description: string,
    price_inclusive_of_info: string,
    price_exclusive_of: string,
    additional_charge_info: string,
    cancel_or_change_info: string,
    visa_info: string,
    other_info: string
}