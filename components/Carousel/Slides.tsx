import Image from 'next/image'
import { Fragment } from 'react'
import { Indexes } from './Carousel'
import style from './Slides.module.scss'

interface Params {
    slides: string[]
    indexes: Indexes
}

const Slides = ({ slides, indexes }: Params) => {
    return (
        <Fragment>
            {slides.map((url, index) => (
                <div
                    className={[
                        style.slide,
                        index === indexes.cur ? style.current : '',
                        index === indexes.prev ? style.previous : '',
                        index === indexes.cur && indexes.cur > indexes.prev
                            ? style['next-slide']
                            : '',
                        index === indexes.cur && indexes.cur < indexes.prev
                            ? style['prev-slide']
                            : ''
                    ].join(' ')}
                    key={index}
                >
                    <Image src={url} layout="fill" alt="card image" />
                </div>
            ))}
        </Fragment>
    )
}

export default Slides
