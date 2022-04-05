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
            {slides.map((url, index) => {
                const isCurrent = index === indexes.cur
                const isPrevious = index === indexes.prev
                const useNextAnimation = isCurrent && indexes.cur > indexes.prev
                const usePrevAnimation = isCurrent && indexes.cur < indexes.prev
                const hideImage = !isCurrent && !isPrevious

                return (
                    <div
                        className={[
                            style.slide,
                            isCurrent ? style.current : '',
                            isPrevious ? style.previous : '',
                            useNextAnimation ? style['next-slide'] : '',
                            usePrevAnimation ? style['prev-slide'] : '',
                            hideImage ? style.hide : ''
                        ].join(' ')}
                        key={index}
                    >
                        <Image
                            src={url}
                            layout="fill"
                            alt="card image"
                            unoptimized={true}
                            hidden={hideImage}
                        />
                    </div>
                )
            })}
        </Fragment>
    )
}

export default Slides
