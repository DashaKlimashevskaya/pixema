"use client"
import { FilmType } from "@/app/FilmType"
import filmCardsStyle from "./filmCardsStyle.module.scss"
import TrendsSVG from "@/app/SVG/TrendsSVG";

export default function FilmTrends({ films }: { films: FilmType }) {
    const { nameRu, nameEn, genres, posterUrl, ratingKinopoisk } = films;
    return (
        <div className={filmCardsStyle.card}>
            <div className={filmCardsStyle.card__fade_in}>
                <div className={filmCardsStyle.container}>
                    <p className={filmCardsStyle.card__raiting}><TrendsSVG color="#ffffff"/>{ratingKinopoisk}</p>
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



