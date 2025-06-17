"use client"
import { FilmType } from "@/app/FilmType"
import FilmCards from "./FilmCards/FilmCards"
import filmsStyle from './filmsStyle.module.scss'

export default function Films({ films, searchValue }: { films: FilmType[], searchValue: string }) {
    return (
        <div className={filmsStyle.films}>
            <div className={filmsStyle.films__cards}>
                {films.filter((film) => {
                    return film.nameRu.toLowerCase().includes(searchValue.toLowerCase())
                }).map(film => (
                    <FilmCards key={film.kinopoiskId} films={film} />
                ))}
            </div>
        </div>
    )
}
