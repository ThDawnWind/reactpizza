import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface IFilter {
    categoryId: number | null;
    rating: string;
    order: string;
    currentPage: number;
    search: string;
}

const initialState: IFilter = {
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
        setCategoryId: (state, action: PayloadAction<number | null>) => {
            state.categoryId = action.payload;
        },
        setRating: (state, action: PayloadAction<string>) => {
            state.rating = action.payload;
        },
        setOrder: (state, action: PayloadAction<string>) => {
            state.order = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
})

export const selectFilter = (state: RootState) => state.categoryFilter;
export const { setCategoryId, setRating, setOrder, setCurrentPage, setSearch } = categoryFilterSlice.actions;  
export default categoryFilterSlice.reducer;