"use client"
import globalStyleBtn from "../globalStyleBtn.module.scss"

export default function ShowMore({showMore} : { showMore : () => void}){
    return(
        <button onClick={showMore} className={globalStyleBtn.show_more__btn}>
            Show more 
        </button>
    )
}