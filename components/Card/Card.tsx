import { NextPage } from 'next'
import React from 'react'
import { useImageUrls } from '../../hooks/useImageUrls'
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

    const numberOfImages = 4
    const ImageUrls = useImageUrls(card.id, numberOfImages)

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
