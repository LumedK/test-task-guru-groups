import { NextPage } from 'next'
import { useState } from 'react'
import style from './Carousel.module.scss'
import Slider from './Slider'
import Slides from './Slides'

interface Props {
    imageUrls: string[] | undefined
}

export interface Indexes {
    prev: number
    cur: number
}

const Carousel: NextPage<Props> = ({ imageUrls = [] }) => {
    const [indexes, setIndexes] = useState<Indexes>({ prev: 0, cur: 0 })

    return (
        <div className={style.carousel}>
            <Slider
                items={imageUrls.map((el, i) => i === indexes.cur)}
                indexes={indexes}
                handler={setIndexes}
            />
            <Slides slides={imageUrls} indexes={indexes} />
        </div>
    )
}

export default Carousel
