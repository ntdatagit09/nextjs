
import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../services/api/users";
import { HORIZONTAL_VIEW } from "@/constants/ui";

const initialState = {
    viewType: HORIZONTAL_VIEW,
    pathWithParam: null,
    defaultPage: 0,
    nationParam: null,
    flightDateParam: null,
    topicParam: null,
    topicNameSearch: null,
    filterSearch: null
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setViewType: (state, action) => {
            state.viewType = action.payload;
        },
        setUrlWithParam: (state, action) => {
            state.pathWithParam = action.payload;
        },
        setDefaultPage: (state, action) => {
            state.defaultPage = action.payload ?? 1;
        },
        setLocationParam: (state, action) => {
            state.nationParam = action.payload;
        },
        setFlightDateParam: (state, action) => {
            state.flightDateParam = action.payload;
        },
        setTopicParam: (state, action) => {
            state.topicParam = action.payload;
        },
        setTopicName: (state, action) => {
            state.topicNameSearch = action.payload;
        },
        setFilterSearchParam: (state, action) => {
            state.filterSearch = action.payload;
        }
    },
})

export const {
    setViewType,
    setUrlWithParam,
    setDefaultPage,
    setLocationParam,
    setFlightDateParam,
    setTopicParam,
    setTopicName,
    setFilterSearchParam
} = searchSlice.actions;
export default searchSlice.reducer;