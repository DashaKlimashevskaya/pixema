"use client"
import { FilmType } from "@/app/FilmType"
import FilmCards from "./FilmCards/FilmCards"
import filmsStyle from './filmsStyle.module.scss'

export default function Recomedations({ films }: { films: FilmType[] }) {
    return (
        <div className={filmsStyle.films}>
            <div className={filmsStyle.films__cards}>
                {films.map(film => (
                    <FilmCards key={film.kinopoiskId} films={film} />
                )).slice(15, 20)}
            </div>
        </div>
    )
}
