export interface ITourSchedule {
    tour_id: number,
    flight_date: string,
    remaining_seats: number,
}

export interface tourDetail extends ITourSchedule {
    tour_name: string,
}