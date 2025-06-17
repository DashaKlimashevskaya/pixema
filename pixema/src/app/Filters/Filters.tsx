"use client"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
    setCountryFilter,
    setGenreFilter,
    setSortOrder,
    setRatingFrom,
    setRatingTo,
    setYearFrom,
    setYearTo,
    setKeyword,
    resetFilters,
} from "../Redux/filterSlice";
import { fetchFilteredFilms, clearFilteredFilms } from "../Redux/filteredFilmsSlice";
import filtersStyle from "./filters.module.scss";
import CloseSVG from "../SVG/CloseSVG";
import DownArrowSVG from "../SVG/DownArrowSVG";
import { useState } from "react";

interface FiltersProps {
    onClose: () => void;
    genres: string[];
    countries: string[];
}

export default function Filters({ onClose, genres, countries }: FiltersProps) {
    const dispatch = useDispatch<AppDispatch>();
    const filters = useSelector((state: RootState) => state.filters);
    const [isDropdownGenre, setIsDropdownGenre] = useState(false);
    const [isDropdownCountry, setIsDropdownCountry] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'keyword':
                dispatch(setKeyword(value));
                break;
            case 'yearFrom':
                dispatch(setYearFrom(value));
                break;
            case 'yearTo':
                dispatch(setYearTo(value));
                break;
            case 'ratingFrom':
                dispatch(setRatingFrom(value));
                break;
            case 'ratingTo':
                dispatch(setRatingTo(value));
                break;
        }
    };

    const handleSort = (sortBy: 'RATING' | 'YEAR') => {
        const newOrder = filters.order.includes(sortBy)
            ? filters.order.includes('ASC')
                ? `${sortBy}_DESC`
                : `${sortBy}_ASC`
            : `${sortBy}_DESC`;
        dispatch(setSortOrder(newOrder));
    };

    
    const handleApplyFilters = () => {
        dispatch(fetchFilteredFilms(1))
            .then(() => onClose())
            .catch(error => console.error("Filter error:", error));
    };

    const handleClearFilters = () => {
        dispatch(resetFilters());
        dispatch(clearFilteredFilms());
    };

    const getSortIndicator = (sortBy: string) => {
        if (filters.order.includes(sortBy)) {
            return filters.order.includes('ASC') ? '↑' : '↓';
        }
        return '';
    };

    return (
        <div className={filtersStyle.filters}>
            <div className={filtersStyle.container}>
                <div className={filtersStyle.filters__wrapper_title}>
                    <h2 className={filtersStyle.filters__title}>Filters</h2>
                    <CloseSVG onClick={onClose} />
                </div>

                <div className={filtersStyle.filters__wrapper_sort}>
                    <p className={filtersStyle.filters__subtitle}>Sort by</p>
                    <div className={filtersStyle.filters__wrapper_sort_btn}>
                        <button
                            className={filtersStyle.filters__sort_btn}
                            onClick={() => handleSort('RATING')}
                        >
                            Rating{getSortIndicator('RATING')}
                        </button>
                        <button
                            className={filtersStyle.filters__sort_btn}
                            onClick={() => handleSort('YEAR')}
                        >
                            Year{getSortIndicator('YEAR')}
                        </button>
                    </div>
                </div>
                <div className={filtersStyle.filters__movie}>
                    <p className={filtersStyle.filters__subtitle}>Full or short movie name</p>
                    <input
                        className={filtersStyle.filters__movie_input}
                        name="keyword"
                        type="text"
                        placeholder="Your text"
                        value={filters.keyword}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={filtersStyle.filters__genre}>
                    <p className={filtersStyle.filters__subtitle}>Genre</p>
                    <div className={filtersStyle.filters__wrapper_genre_input}>
                        <input
                            type="text"
                            readOnly
                            placeholder="Select genre"
                            value={filters.selectedGenres}
                            className={filtersStyle.filters__selected}
                        />
                        <DownArrowSVG onClick={() => setIsDropdownGenre(!isDropdownGenre)} />
                    </div>
                    {isDropdownGenre && (
                        <ul className={filtersStyle.filters__list}>
                            {genres.map((genre) => (
                                <li
                                    key={genre}
                                    onClick={() => {
                                        dispatch(setGenreFilter(genre));
                                        setIsDropdownGenre(false);
                                    }}
                                    className={filtersStyle.filters__list_item}
                                >
                                    {genre}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={filtersStyle.filters__years}>
                    <p className={filtersStyle.filters__subtitle}>Years</p>
                    <div className={filtersStyle.filters__wrapper_years}>
                        <input
                            type="text"
                            name="yearFrom"
                            placeholder="From"
                            className={filtersStyle.filters__years_input}
                            value={filters.yearFrom}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="yearTo"
                            placeholder="To"
                            className={filtersStyle.filters__years_input}
                            value={filters.yearTo}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className={filtersStyle.filters__rating}>
                    <p className={filtersStyle.filters__subtitle}>Rating</p>
                    <div className={filtersStyle.filters__wrapper_years}>
                        <input
                            type="text"
                            name="ratingFrom"
                            placeholder="From"
                            className={filtersStyle.filters__rating_input}
                            value={filters.ratingFrom}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="ratingTo"
                            placeholder="To"
                            className={filtersStyle.filters__rating_input}
                            value={filters.ratingTo}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className={filtersStyle.filters__country}>
                    <p className={filtersStyle.filters__subtitle}>Country</p>
                    <div className={filtersStyle.filters__wrapper_countries}>
                        <input
                            type="text"
                            readOnly
                            placeholder="Select country"
                            value={filters.selectedCountries}
                            className={filtersStyle.filters__selected}
                        />
                        <DownArrowSVG onClick={() => setIsDropdownCountry(!isDropdownCountry)} />
                    </div>
                    {isDropdownCountry && (
                        <ul className={filtersStyle.filters__list_country}>
                            {countries.map((country) => (
                                <li
                                    key={country}
                                    onClick={() => {
                                        dispatch(setCountryFilter(country));
                                        setIsDropdownCountry(false);
                                    }}
                                    className={filtersStyle.filters__item_country}
                                >
                                    {country}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={filtersStyle.filters__wrapper_btn}>
                    <button className={filtersStyle.filters__btn} onClick={handleClearFilters}>
                        Clear filter
                    </button>
                    <button
                        className={filtersStyle.filters__btn}
                        onClick={handleApplyFilters}
                        disabled={!Object.values(filters).some(val => val !== '')}
                    >
                        Show results
                    </button>
                </div>
            </div>
        </div>
    );
}