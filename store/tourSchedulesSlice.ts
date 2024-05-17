
import React from 'react'
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    tour_id: 0,
    tour_date: '',
}
const tourSchedulesSlice = createSlice({
    name: "tourSchedulesSlice",
    initialState,
    reducers: {

    }
})

export default tourSchedulesSlice.reducer;