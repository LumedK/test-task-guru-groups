import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import style from './Carousel.module.scss'

interface Props {
    images: React.ReactNode[]
    id: string
}

const Carousel: NextPage<Props> = ({ images, id }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const sliderJSX: any = []

    return (
        <div className={style.carousel}>
            {images.map((child, index) => {
                const key = id + ':' + index.toString()
                const isCurrent = index === currentIndex
                sliderJSX.push(
                    <div
                        className={`${style.slide} ${isCurrent ? style.active : ''}`}
                        key={key}
                        onClick={() => {
                            setCurrentIndex(index)
                        }}
                    />
                )
                return isCurrent ? child : <React.Fragment key={key} />
            })}
            <div className={style.slider}>{sliderJSX}</div>
        </div>
    )
}

export default React.memo(Carousel)
