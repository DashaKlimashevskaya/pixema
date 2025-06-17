"use client"
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedFilm, closeDetails } from "../Redux/selectedMovieSlice";
import { AppDispatch, RootState } from "../store";
import FavoriteSVG from "../SVG/FavoriteSVG";
import ShareSVG from "../SVG/ShareSVG";
import IMDBsvg from "../SVG/IMDBsvg";
import movieStyle from "./movieStyle.module.scss"
import Recomedations from "../Recomendations/Recomendations";

export default function MovieDetails() {
    const films = useSelector((state: RootState) => state.films.films);
    const dispatch = useDispatch<AppDispatch>();
    const { film, isDetailsOpen } = useSelector(
        (state: RootState) => state.selectedMovie
    );

    const handleClose = () => {
        dispatch(clearSelectedFilm());
        dispatch(closeDetails());
    };

    if (!isDetailsOpen) {
        console.log('Modal closed: isDetailsOpen = false');
        return null;
    }
    if (!film) {
        console.log('Modal closed: film data missing');
        return null;
    }

    return (
        <div className={movieStyle.movie}>
            <div className={movieStyle.movie__fade_in}>
                <div className={movieStyle.container}>
                    <div className={movieStyle.movie__item_img}>
                        <div className={movieStyle.movie__wrapper_img}>
                            {film.posterUrl ? (
                                <img src={film.posterUrl} alt={film.nameRu} className={movieStyle.movie__img} />
                            ) : (
                                <div className={movieStyle.movie__img_404}>Нет изображения</div>
                            )}
                        </div>
                        <div className={movieStyle.movie__wrapper_btn}>
                            <button className={movieStyle.movie__btn}>
                                <FavoriteSVG />
                            </button>
                            <button className={movieStyle.movie__btn}>
                                <ShareSVG />
                            </button>
                        </div>
                    </div>
                    <div className={movieStyle.movie__item}>
                        <p className={movieStyle.movie__genres}>
                            {film.genres.slice(0, 3).map(({ genre }) => genre).join(" ‧ ")}
                        </p>
                        <h2 className={movieStyle.movie__title}>{film.nameEn || film.nameRu}</h2>
                        <div className={movieStyle.movie__wrapper_raiting}>
                            <div className={movieStyle.movie__raiting_kinopoisk}>
                                {film.ratingKinopoisk === null ? (
                                    <p className={movieStyle.movie__none_raiting}></p>
                                ) : film.ratingKinopoisk > 6 ? (
                                    <p className={movieStyle.movie__raiting}>{film.ratingKinopoisk}</p>
                                ) : film.ratingKinopoisk < 6 && film.ratingKinopoisk > 0 ? (
                                    <p className={movieStyle.movie__bad_raiting}>{film.ratingKinopoisk}</p>
                                ) :
                                    (<p></p>)}
                            </div>
                            <div className={movieStyle.movie__raiting_imdb}>
                                <IMDBsvg />
                                {film.ratingImbd && (
                                    <p className={movieStyle.movie__raiting}>
                                        {film.ratingImbd}</p>
                                )}
                            </div>
                        </div>
                        {film.description &&
                            <p className={movieStyle.movie__description}>{film.description}</p>
                        }
                        <div className={movieStyle.movie__wrapper_text}>
                            <div className={movieStyle.movie__name_item}>
                                <p className={movieStyle.movie__name}>Year</p>
                                <p className={movieStyle.movie__name}>Countries</p>
                                <p className={movieStyle.movie__name}>Type</p>
                                <p className={movieStyle.movie__name}>Rating age limits</p>
                            </div>
                            <div className={movieStyle.movie__value_item}>
                                <p className={movieStyle.movie__value}>{film.year}</p>
                                <p className={movieStyle.movie__value}>
                                    {film.countries.slice(0, 3).map(({ country }) => country).join(", ")}
                                </p>
                                {film.type === 'FILM ' ? (<p className={movieStyle.movie__value}>Film</p>)
                                    : film.type === 'TV_SERIES' ? (
                                        <p className={movieStyle.movie__value}>Tv series</p>
                                    ) :
                                        (<p className={movieStyle.movie__value}>-</p>)}
                                {film.ratingAgeLimits === null ? (
                                    <p className={movieStyle.movie__value}>
                                        -</p>) :
                                    (<p className={movieStyle.movie__value_age}>
                                        {film.ratingAgeLimits}</p>)}
                            </div>
                        </div>
                        <button onClick={handleClose} className={movieStyle.movie__btn_close}>← back to the movies</button>
                        <div className={movieStyle.movie__recomendations}>
                            <h2 className={movieStyle.movie__recomendations_title}>Recommendations</h2>
                            <div className={movieStyle.movie__recomendations_films}>
                                <Recomedations films={films} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}