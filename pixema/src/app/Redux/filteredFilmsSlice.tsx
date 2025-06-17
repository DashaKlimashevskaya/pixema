import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FilmType } from "../FilmType";
import { RootState } from "../store";

interface FilteredFilmsState {
  films: FilmType[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: FilteredFilmsState = {
  films: [],
  total: 0,
  loading: false,
  error: null,
};

export const fetchFilteredFilms = createAsyncThunk(
  'filteredFilms/fetch',
  async (page: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { filters } = state;

      const validOrders = ['RATING', 'YEAR'];
      const orderValue = validOrders.includes(filters.order) ? filters.order : 'YEAR';

      const params = new URLSearchParams({
        order: orderValue,
        page: page.toString(),
      });

      if (filters.selectedGenres.length > 0) {
        params.append('genres', filters.selectedGenres.join(','));
      }
      if (filters.selectedCountries.length > 0) {
        params.append('countries', filters.selectedCountries.join(','));
      }


      if (filters.yearFrom) params.append('yearFrom', filters.yearFrom);
      if (filters.yearTo) params.append('yearTo', filters.yearTo);
      if (filters.ratingFrom) params.append('ratingFrom', filters.ratingFrom);
      if (filters.ratingTo) params.append('ratingTo', filters.ratingTo);
      if (filters.keyword) params.append('keyword', filters.keyword);

      const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films?${params.toString()}`,
        {
          headers: {
            'X-API-KEY': 'cadd4aac-3dd8-4419-ab1f-531c07125daa',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const filteredFilmsSlice = createSlice({
  name: 'filteredFilms',
  initialState,
  reducers: {
    clearFilteredFilms: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.films = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchFilteredFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearFilteredFilms } = filteredFilmsSlice.actions;
export default filteredFilmsSlice.reducer;