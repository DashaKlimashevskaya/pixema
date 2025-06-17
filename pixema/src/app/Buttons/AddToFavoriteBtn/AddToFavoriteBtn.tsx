"use client"
import FavoriteSVG from "@/app/SVG/FavoriteSVG"
import globalStyleBtn from "../globalStyleBtn.module.scss"

export default function AddToFavoriteBtn() {
    return (
        <button className={globalStyleBtn.favorite_btn}>
            <FavoriteSVG />
        </button>
    )
}