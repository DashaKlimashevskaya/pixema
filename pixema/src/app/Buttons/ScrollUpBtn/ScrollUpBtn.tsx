"use client"
import TriangleUpSVG from "@/app/SVG/TriangleUpSVG"
import globalStyleBtn from "../globalStyleBtn.module.scss"

export default function ScrollUpBtn(){
    return(
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={globalStyleBtn.scroll_up__btn}>
            <TriangleUpSVG />
        </button>
    )
}