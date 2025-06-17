"use client"
import { FilmType } from "@/app/FilmType"
import trendsStyle from './trends.module.scss'
import FilmTrends from "./FilmCards/FilmTrends"

export default function Trends({ films, searchValue }: { films: FilmType[], searchValue:string}) {
    return (
        <div className={trendsStyle.films}>
            <div className={trendsStyle.films__cards}>
                {films.filter((film) => {
                    if (film.nameRu.toLowerCase().includes(searchValue.toLowerCase())) {
                        return true;
                    }
                    return false
                }).filter((film) => {
                    if (film.ratingKinopoisk > 7.5) {
                        return true;
                    }
                    return false
                }).map(film => (
                    <FilmTrends key={film.kinopoiskId} films={film} />
                ))}
            </div>
        </div>
    )
}