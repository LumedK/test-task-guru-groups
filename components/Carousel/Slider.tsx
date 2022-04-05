import React from 'react'
import { Indexes } from './Carousel'
import style from './Slider.module.scss'

interface Params {
    items: boolean[]
    indexes: Indexes
    handler: React.Dispatch<React.SetStateAction<{ prev: number; cur: number }>>
}

const Slider = ({ items, handler, indexes }: Params) => {
    const changeSlide = async (i: number) => {
        await new Promise((resolve: any) => {
            setTimeout(() => {
                resolve()
            }, 200)
        })
        handler({ prev: indexes.cur, cur: i })
    }

    return (
        <div className={style.slider}>
            {items.map((active, i) => (
                <div
                    key={i}
                    className={`${style['slider-item']} ${active ? style.active : ''}`}
                    onMouseEnter={() => {
                        changeSlide(i)
                    }}
                    onClick={() => {
                        changeSlide(i)
                    }}
                    onTouchStart={() => {
                        changeSlide(i)
                    }}
                />
            ))}
        </div>
    )
}

export default Slider
