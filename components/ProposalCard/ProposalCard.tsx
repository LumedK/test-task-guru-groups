import axios from 'axios'
import { NextPage } from 'next'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Card } from '../../models/card.model'
import Carousel from '../Carousel/Carousel'
import IconCompare from '../Icons/IconCompare'
import IconDeal from '../Icons/IconDeal'
import IconDelivery from '../Icons/IconDelivery'
import IconFavourite from '../Icons/IconFavourite'
import RandomImg from '../RandomImg'
import style from './ProposalCard.module.scss'

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

const urlImageCache = new Map()
const generateUrlImage = async (key: string) => {
    if (!urlImageCache.has(key)) {
        const res = await axios.get(`https://source.unsplash.com/random/${key}`)
        const url = (res.request.responseURL || '').replace(/&w=1080/, '&w=500')
        urlImageCache.set(key, url)
    }
    return urlImageCache.get(key)
}

const ProposalCard: NextPage<Props> = ({ card }) => {
    const styleSeen = card.seen ? 'card-seen' : ''

    const [images, setImages] = useState<React.ReactNode[]>([])
    const createRandomImage = useCallback(async () => {
        const newImages = []
        for (let i = 0; i < 4; i++) {
            const url = await generateUrlImage(card.id + ':' + i)
            newImages.push(<RandomImg key={url} url={url} />)
        }
        setImages(newImages)
    }, [card.id])
    useEffect(() => {
        createRandomImage()
    }, [createRandomImage])

    return (
        <div className={`${style['proposal-card']} ${style[styleSeen]}`}>
            <div className={style['img-holder']}>
                <Carousel images={images} id={card.id} />

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

export default React.memo(ProposalCard)
