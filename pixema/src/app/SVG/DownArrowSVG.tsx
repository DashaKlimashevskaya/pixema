"use client"
import svgStyle from "./svgStyle.module.scss"

export default function DownArrowSVG({onClick} : {onClick : () => void}){
    return(
        <div className={svgStyle.header__SVG}>
            <svg className={svgStyle.svg} width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.7808 0.375342C12.1258 0.806604 12.0559 1.4359 11.6247 1.78091L5.99996 6.28066L0.375268 1.78091C-0.0559941 1.4359 -0.125916 0.806603 0.219094 0.375341C0.564103 -0.0559207 1.1934 -0.125842 1.62466 0.219168L5.99996 3.71941L10.3753 0.219168C10.8065 -0.125842 11.4358 -0.0559202 11.7808 0.375342Z" fill="#AFB2B6"/>
            </svg>
        </div>
    )
}