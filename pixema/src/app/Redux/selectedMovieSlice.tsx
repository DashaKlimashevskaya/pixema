import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilmType } from "../FilmType";

interface SelectedFilmState {
    film: FilmType | null;
    loading: boolean;
    error: string | null;
    isDetailsOpen: boolean;
}

const initialState: SelectedFilmState = {
    film: null,
    loading: false,
    error: null,
    isDetailsOpen: false,
};

export const fetchFilmDetails = createAsyncThunk(
    'selectedFilm/fetchFilmDetails',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
                headers: {
                    'X-API-KEY': 'cadd4aac-3dd8-4419-ab1f-531c07125daa',
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data as FilmType;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const selectedFilmSlice = createSlice({
    name: 'selectedFilm',
    initialState,
    reducers: {
        clearSelectedFilm(state) {
            state.film = null;
            state.error = null;
        },
        openDetails(state) {
            state.isDetailsOpen = true;
        },
        closeDetails(state) {
            state.isDetailsOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilmDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilmDetails.fulfilled, (state, action: PayloadAction<FilmType>) => {
                state.loading = false;
                state.film = action.payload;
            })
            .addCase(fetchFilmDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSelectedFilm, openDetails, closeDetails } = selectedFilmSlice.actions;

export default selectedFilmSlice.reducer;