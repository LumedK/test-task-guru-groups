import { NextPage } from 'next'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { generateUrlImage } from '../../api/images.api'
import { Card } from '../../models/card.model'
import Carousel from '../Carousel/Carousel'
import IconCompare from '../Icons/IconCompare'
import IconDeal from '../Icons/IconDeal'
import IconDelivery from '../Icons/IconDelivery'
import IconFavourite from '../Icons/IconFavourite'
import style from './Card.module.scss'

interface Props {
    card: Card
}

const dateFormat = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
})

const Card: NextPage<Props> = ({ card }) => {
    const styleSeen = card.seen ? 'card-seen' : ''

    const [ImageUrls, setImageUrls] = useState<string[]>([])

    const addImages = useCallback(async () => {
        const images: Set<string> = new Set()
        for (let i = 0; i < 4; i++) {
            images.add(await generateUrlImage(card.id, i))
        }
        setImageUrls(Array.from(images))
    }, [card.id])

    useEffect(() => {
        addImages()
    }, [addImages])

    return (
        <div className={`${style['card']} ${style[styleSeen]}`}>
            <div className={style['img-holder']}>
                <Carousel imageUrls={ImageUrls} />

                <div className={style['img-icon-holder']}>
                    <IconFavourite />
                    <IconCompare />
                </div>
            </div>
            <div className={style.description}>
                <header>
                    <div className={style.prices}>
                        <span className={style['old-price']}>{card.oldPrice}</span>
                        <span className={style['price']}>{card.price}</span>
                    </div>
                    <div className={style['description-icon-holder']}>
                        <IconDelivery />
                        <IconDeal />
                    </div>
                </header>
                <main>
                    <span className={style['title']}>{card.title}</span>
                </main>
                <footer>
                    <span className={style['city']}>{card.locality}</span>
                    <span className={style['date']}>
                        {dateFormat.format(new Date(card.date * 1000))}
                    </span>
                </footer>
            </div>
        </div>
    )
}

export default React.memo(Card)
