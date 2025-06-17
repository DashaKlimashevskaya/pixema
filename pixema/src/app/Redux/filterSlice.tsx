import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


interface FilterOption {
  id: string;
  genre?: string;
  country?: string;
}

interface FiltersState {
  genres: FilterOption[];
  countries: FilterOption[];
  selectedGenres: string[];
  selectedCountries: string[];
  yearFrom: string;
  yearTo: string;
  ratingFrom: string;
  ratingTo: string;
  keyword: string;
  order: string;
  loading: boolean;
  error: string | null;
}

const initialState: FiltersState = {
  genres: [],
  countries: [],
  selectedGenres: [],
  selectedCountries: [],
  yearFrom: '',
  yearTo: '',
  ratingFrom: '',
  ratingTo: '',
  keyword: '',
  order: 'YEAR',
  loading: false,
  error: null,
};

export const fetchFilterOptions = createAsyncThunk(
  'filters/fetchOptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://kinopoiskapiunofficial.tech/api/v2.2/films/filters',
        {
          method: 'GET',
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

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setGenreFilter: (state, action) => {
      state.selectedGenres = action.payload;
    },
    setCountryFilter: (state, action) => {
      state.selectedCountries = action.payload;
    },
    setYearFrom: (state, action) => {
      state.yearFrom = action.payload;
    },
    setYearTo: (state, action) => {
      state.yearTo = action.payload;
    },
    setRatingFrom: (state, action) => {
      state.ratingFrom = action.payload;
    },
    setRatingTo: (state, action) => {
      state.ratingTo = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setSortOrder: (state, action) => {
      state.order = action.payload;
    },
    resetFilters: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilterOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload.genres;
        state.countries = action.payload.countries;
      })
      .addCase(fetchFilterOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setGenreFilter,
  setCountryFilter,
  setYearFrom,
  setYearTo,
  setRatingFrom,
  setRatingTo,
  setKeyword,
  setSortOrder,
  resetFilters,
} = filterSlice.actions;

export const selectAllFilters = (state: RootState) => state.filters;

export default filterSlice.reducer;