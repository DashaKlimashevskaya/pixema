"use client"
import Link from "next/link"
import LogoSVG from "../SVG/LogoSVG"
import HomeSVG from "../SVG/HomeSVG"
import TrendsSVG from "../SVG/TrendsSVG"
import FavoriteSVG from "../SVG/FavoriteSVG"
import SettingSVG from "../SVG/SettingSVG"
import headerStyle from "./headerStyle.module.scss"
import { useState } from "react"

export default function Header() {
    const [activeTab, setActiveTab] = useState('home')

    const handleTabColor = (item: string) => {
        setActiveTab(item);
    }
    const activeColor = '#7B61FF';
    const defaultColor = '#80858B';
    return (
        <>
            <header className={headerStyle.header}>
                <div>
                    <Link href="/" className={headerStyle.header__logo}><LogoSVG /></Link>
                    <nav className={headerStyle.header__nav}>
                        <ul className={headerStyle.header__list}>
                            <Link href="/Home" className={headerStyle.header__item}
                                onClick={() => handleTabColor('home')}
                                style={{
                                    color: activeTab === 'home' ? activeColor : defaultColor
                                }}>
                                {activeTab === 'home' ?
                                    (<HomeSVG color={activeColor} />)
                                    : (<HomeSVG color={defaultColor} />)} Home</Link>
                            <Link href="/Trends" className={headerStyle.header__item}
                                onClick={() => handleTabColor('trends')}
                                style={{
                                    color: activeTab === 'trends' ? activeColor : defaultColor
                                }}>
                                {activeTab === 'trends' ?
                                    (<TrendsSVG color={activeColor} />)
                                    : (<TrendsSVG color={defaultColor} />)} Trends</Link>
                            <Link href="/Favorite" className={headerStyle.header__item}
                                onClick={() => handleTabColor('favorite')}
                                style={{
                                    color: activeTab === 'favorite' ? activeColor : defaultColor
                                }}>
                                {activeTab === 'favorite' ?
                                    (<FavoriteSVG color={activeColor} />)
                                    : (<FavoriteSVG color={defaultColor} />)}Favorites</Link>
                            <Link href="" className={headerStyle.header__item}
                                onClick={() => handleTabColor('setting')}
                                style={{
                                    color: activeTab === 'setting' ? activeColor : defaultColor
                                }}>
                                {activeTab === 'setting' ?
                                    (<SettingSVG color={activeColor}/>)
                                    : (<SettingSVG color={defaultColor}/>)} Settings</Link>
                        </ul>
                    </nav>
                </div>
                <p className={headerStyle.header__text}>© All Rights Reserved</p>
            </header>
        </>
    )
}