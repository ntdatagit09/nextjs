import { IApiResponse } from "@/interfaces/apiResponse";
import { baseApi } from "./baseApi";
import { ITourSummary } from "@/interfaces/tour";

type ToursResponse = {
    success: string,
    message: string,
    data: ITourSummary[],
    pagination: any | []
};

type TourRecentlyViewRes = {
    data: ITourSummary[] | null
}

const extendedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTours: builder.query<ToursResponse, any>({
            query: (param) => `tour${param}`,
        }),
        getTourDetailById: builder.query<any, any>({
            query: (tour_id) => ({ url: `tour/${tour_id}` }),
        }),
        getRecentlyTour: builder.query<TourRecentlyViewRes, any>({
            query: (param) => `tour/recently-view${param}`
        }),
        getLowestDayTravelTour: builder.query({
            query: (param) => `tour/sort-day-night-lowest${param}`
        }),
        getLowestFlightDateTravelTour: builder.query({
            query: (param) => `tour/sort-flight-date-lowest${param}`
        }),
        getLowestPriceTravelTour: builder.query({
            query: (param) => `tour/sort-ticket-price-lowest${param}`
        }),
        getTourSchedules: builder.query<any, string>({
            query: (tour_slug) => ({ url: `tour/list-calendar-tour/${tour_slug}` }),
        }),
        saveTourBooking: builder.mutation<IApiResponse, any>({
            query(body) {
                console.log(body);
                return {
                    url: `tour/${body.tour_id}/booking`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "X-STATIC-SITE-TOKEN": 'token'
                    },
                    body: JSON.stringify(body),
                }
            },
        }),
    }),
})
export { extendedApi as api };
export const {
    useGetToursQuery,
    useGetTourDetailByIdQuery,
    useGetRecentlyTourQuery,
    useGetLowestDayTravelTourQuery,
    useGetLowestFlightDateTravelTourQuery,
    useGetLowestPriceTravelTourQuery,
    useGetTourSchedulesQuery,
    useSaveTourBookingMutation
} = extendedApi;
