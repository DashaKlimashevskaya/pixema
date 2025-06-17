"use client"
import Search from "../Search/Search"
import FavoriteNoneSVG from "../SVG/FavoriteNoneSVG"
import favoriteStyle from './favoriteStyle.module.scss'
import homeStyle from '../homeStyle.module.scss'
import { useState } from "react"

export default function Favorite() {
    const [searchValue, setSearchValue] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    return (

        <div className={homeStyle.container}>
            <div className={homeStyle.search}>
                <Search
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setShowFilters={setShowFilters}
                />
            </div>
            <div className={favoriteStyle.fade_in}>
                <div className={favoriteStyle.favorite}>
                    <FavoriteNoneSVG />
                    <p className={favoriteStyle.favorite__text}>Add favorite movies</p>
                </div>
            </div>
        </div>
    )
}