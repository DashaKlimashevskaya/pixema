import { FilmType } from "./FilmType";

type ApiType = {
    total: number;
    totalPages: number;
    items: FilmType[];
}
export type {ApiType}