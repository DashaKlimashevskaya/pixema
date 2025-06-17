"use client"
import { FilmType } from "@/app/FilmType"
import filmCardsStyle from "./filmCardsStyle.module.scss"
import { useDispatch } from "react-redux";
import { fetchFilmDetails, openDetails } from '@/app/Redux/selectedMovieSlice'
import { AppDispatch } from "@/app/store";

export default function FilmCards({ films }: { films: FilmType }) {
    const dispatch = useDispatch<AppDispatch>();
    const { nameRu, nameEn, genres, posterUrl, ratingKinopoisk } = films;

    const handleClick = async () => {
        if (typeof films.kinopoiskId === 'number') {
            try {
                await dispatch(fetchFilmDetails(films.kinopoiskId)).unwrap();
                dispatch(openDetails());
            } catch (error) {
                console.error('Failed to load film details:', error);
            }
        }
    };
    return (
        <div className={filmCardsStyle.card} onClick={handleClick}>
            <div className={filmCardsStyle.card__fade_in}>
                <div className={filmCardsStyle.container}>
                    {ratingKinopoisk > 6 ? (
                        <p className={filmCardsStyle.card__raiting}>{ratingKinopoisk}</p>
                    ) : ratingKinopoisk < 6 && ratingKinopoisk > 5 ? (
                        <p className={filmCardsStyle.card__average_raiting}>{ratingKinopoisk}</p>
                    ) : ratingKinopoisk < 5 && ratingKinopoisk > 4 ? (
                        <p className={filmCardsStyle.card__bad_raiting}>{ratingKinopoisk}</p>
                    ) : ratingKinopoisk < 4 && ratingKinopoisk > 0 ? (
                        <p className={filmCardsStyle.card__very_bad_raiting}>{ratingKinopoisk}</p>
                    ) : (
                        <p></p>
                    )}
                    <div className={filmCardsStyle.card__wrapper_img}>
                        {posterUrl ? (
                            <img src={posterUrl} alt={nameRu} className={filmCardsStyle.card__img} />
                        ) : (
                            <div className={filmCardsStyle.card__img_404}>Нет изображения</div>
                        )}
                    </div>
                    <h2 className={filmCardsStyle.card__title}>{nameEn || nameRu}</h2>
                    <p className={filmCardsStyle.card__genres}>
                        {genres.slice(0, 3).map(({ genre }) => genre).join(" ‧ ")}
                    </p>
                </div>
            </div>
        </div>
    )
}

