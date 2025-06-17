import { configureStore } from '@reduxjs/toolkit';
import filmReducer from './Redux/filmSlice';
import filterReducer from './Redux/filterSlice';
import filteredFilmsReducer from './Redux/filteredFilmsSlice';
import movieReducer from './Redux/selectedMovieSlice';

export const store = configureStore({
  reducer: {
    films: filmReducer,
    filters: filterReducer,
    filteredFilms: filteredFilmsReducer,
    selectedMovie: movieReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
