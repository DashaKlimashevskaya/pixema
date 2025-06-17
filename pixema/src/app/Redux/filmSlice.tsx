"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FilmType } from "../FilmType";

interface FilmState {
  films: FilmType[];
  genres: string[];
  countries: string[];
  page: number;
  loading: boolean;
  error: string | null;
}

const initialState: FilmState = {
  films: [],
  genres: [],
  countries: [],
  page: 1,
  loading: false,
  error: null,
};

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${page}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': 'cadd4aac-3dd8-4419-ab1f-531c07125daa',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    resetPage: (state) => {
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.loading = false;
        const newFilms = action.payload.items || action.payload.films || [];
        
        if (action.meta.arg === 1) {
          state.films = newFilms;
        } else {
          state.films = [...state.films, ...newFilms];
        }
        
        const allGenres = newFilms.flatMap((film: FilmType) => 
          film.genres?.map(g => g.genre) || []
        );
        state.genres = Array.from(new Set([...state.genres, ...allGenres]));

        const allCountries = newFilms.flatMap((film: FilmType) => 
          film.countries?.map(c => c.country) || []
        );
        state.countries = Array.from(new Set([...state.countries, ...allCountries]));
        
        state.page = action.meta.arg;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetPage } = filmSlice.actions;
export default filmSlice.reducer;