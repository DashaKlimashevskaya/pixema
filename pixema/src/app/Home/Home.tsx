"use client"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { fetchFilms } from "../Redux/filmSlice";
import { resetFilters } from "../Redux/filterSlice";
import { fetchFilteredFilms } from "../Redux/filteredFilmsSlice";
import Search from "../Search/Search";
import MovieDetails from "../MovieDetails/MovieDetails";
import FilteredFilms from "../FilteredFilms/FilteredFilms";
import Films from "../Film/Films";
import ScrollUpBtn from "../Buttons/ScrollUpBtn/ScrollUpBtn";
import ShowMore from "../Buttons/ShowMoreBtn/ShowMore";
import Filters from "../Filters/Filters";
import homeStyle from '../homeStyle.module.scss'


export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFilters, setShowFilters] = useState(false);


  const {
    films,
    genres,
    countries,
    error: filmsError,
    page
  } = useSelector((state: RootState) => state.films);

  const {
    films: filteredFilms,
    error: filteredError,
    total: filteredTotal,
  } = useSelector((state: RootState) => state.filteredFilms);

  const hasActiveFilters = useSelector((state: RootState) => {
    const { filters } = state;
    return (
      filters.selectedGenres.length > 0 ||
      filters.selectedCountries.length > 0 ||
      filters.yearFrom !== '' ||
      filters.yearTo !== '' ||
      filters.ratingFrom !== '' ||
      filters.ratingTo !== '' ||
      filters.keyword !== ''
    );
  });

  const { isDetailsOpen } = useSelector(
    (state: RootState) => state.selectedMovie
  );

  useEffect(() => {
    dispatch(fetchFilms(1));
    dispatch(resetFilters());
  }, [dispatch]);

  const showMore = () => {
    if (hasActiveFilters) {
      dispatch(fetchFilteredFilms(Math.floor(filteredFilms.length / 20) + 1));
    } else {
      dispatch(fetchFilms(page + 1));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (filmsError) return <div>Error loading films: {filmsError}</div>;
  if (filteredError) return <div>Error loading filtered films: {filteredError}</div>;

  return (
    <div className={homeStyle.container}>

      <div className={homeStyle.search}>
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setShowFilters={setShowFilters}
        />
      </div>
      {isDetailsOpen && <MovieDetails />}
      {!isDetailsOpen && (
        <>
          {hasActiveFilters ? (
            <FilteredFilms films={filteredFilms} />
          ) : (
            <Films films={films} searchValue={searchValue} />
          )}

          {isScrolled && <ScrollUpBtn />}
          {((!hasActiveFilters && films.length > 0) ||
            (hasActiveFilters && filteredFilms.length < filteredTotal)) && (
              <ShowMore showMore={showMore} />
            )}
        </>)}
      {showFilters && (
        <Filters
          genres={genres}
          countries={countries}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}