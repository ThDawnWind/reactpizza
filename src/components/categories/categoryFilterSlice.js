import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 categoryId: null,
 rating: '',
 order: '',
 currentPage: 1,
 search: '',
};

const categoryFilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        setRating: (state, action) => {
            state.rating = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },
})

export const { setCategoryId, setRating, setOrder, setCurrentPage, setSearch } = categoryFilterSlice.actions;  
export default categoryFilterSlice.reducer;