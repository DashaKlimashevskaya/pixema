"use client"
import DownArrowSVG from "../SVG/DownArrowSVG"
import accountStyle from "./accountStyle.module.scss"

export default function Account(){
    return(
        <div className={accountStyle.account}>
                    <div className={accountStyle.account__wrapper_item}>
                        <div className={accountStyle.account__wrapper_photo}>
                            <p className={accountStyle.account__account_name}>AL</p>
                        </div>
                        <p className={accountStyle.account__username}>Artem Lapitsky</p>
                    </div>
                    <button className={accountStyle.account__drop_down_button}>
                        <DownArrowSVG />
                    </button>
                </div>
    )
}