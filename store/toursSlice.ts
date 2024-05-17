

import { SEAT_ADL, SEAT_CHD, SEAT_INF } from "@/constants/tour";
import { IUser } from "@/interfaces/user";
import { usersApi } from "@/services/api/users";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    booking: {
        [SEAT_ADL]: 1,
        [SEAT_CHD]: 1,
        [SEAT_INF]: 1,
        total: 0,
        tour_id: 0,
    },
    flight: {
        flight_date: null,
        flight_date_back: null,
        takeoff_time: null,
        arrive_time: null,
        takeoff_time_back: null,
        arrive_time_back: null,
        shcb: null,
        shcb_back: null,
    },
    guide: {
        tour_guide_full_name: null,
        tour_guide_phone: null
    }
}

const tourSlice = createSlice({
    name: 'toursSlice',
    initialState,
    reducers: {
        setTourId: (state, action) => {
            console.log('state.booking-id', action.payload);
            state.booking.tour_id = action.payload;
        },
        setSeatBooking: (state, action) => {
            console.log('payload', action.payload);
            state.booking[action.payload.type] = action.payload.value;
        },
        setTotalBooking: (state, action) => {
            state.booking.total = action.payload;
        },
        setTourFlight: (state, action) => {
            state.flight = { ...action.payload };
        },
        setTourGuide: (state, action) => {
            state.guide = { ...action.payload }
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            usersApi.endpoints.getUsers.matchFulfilled,
            (state, { payload }) => {
                console.log('>>>>>> test add addMather');
                state.booking.tour_id = 10000;
            },
        )
    },
})

export const {
    setTourId,
    setSeatBooking,
    setTotalBooking,
    setTourFlight,
    setTourGuide,
} = tourSlice.actions;

export default tourSlice.reducer;