import React from 'react'
import { Indexes } from './Carousel'
import style from './Slider.module.scss'

interface Params {
    items: boolean[]
    indexes: Indexes
    handler: React.Dispatch<React.SetStateAction<{ prev: number; cur: number }>>
}

const Slider = ({ items, handler, indexes }: Params) => {
    return (
        <div className={style.slider}>
            {items.map((active, i) => (
                <div
                    key={i}
                    className={`${style['slider-item']} ${active ? style.active : ''}`}
                    onMouseEnter={async () => {
                        await new Promise((resolve: any) => {
                            setTimeout(() => {
                                resolve()
                            }, 200)
                        })
                        handler({ prev: indexes.cur, cur: i })
                    }}
                />
            ))}
        </div>
    )
}

export default Slider
