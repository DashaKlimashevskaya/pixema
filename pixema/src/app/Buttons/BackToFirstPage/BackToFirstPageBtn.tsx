"use client"
import globalStyleBtn from "../globalStyleBtn.module.scss"

export default function BackToFirstPageBtn({backToFirstPage} : { backToFirstPage : () => void}){
    return(
        <button onClick={backToFirstPage} className={globalStyleBtn.back_to_first__btn}>
            Back to first page
        </button>
    )
}