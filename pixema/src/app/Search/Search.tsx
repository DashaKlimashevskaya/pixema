"use client"
import Account from "../Account/Account"
import FiltersSVG from "../SVG/FiltersSVG"
import searchStyle from "./searchStyle.module.scss"

interface SearchProps {
    searchValue: string
    setSearchValue: (value: string) => void
    setShowFilters: (isOpen: boolean) => void
}

export default function Search({ searchValue, setSearchValue, setShowFilters }: SearchProps) {

    return (
        <>
            <div className={searchStyle.search}>
                <label className={searchStyle.search__wrapper_input}>
                    <input onChange={(event) => setSearchValue(event.target.value)}
                        autoComplete="off" placeholder="Search"
                        type="search" name="search"
                        className={searchStyle.search__input}
                        value={searchValue}></input>
                    <div onClick={() => setShowFilters(true)}>
                        <FiltersSVG  />
                    </div>
                </label>
                <Account />
            </div>
        </>
    )
}