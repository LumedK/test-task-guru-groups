import { NextPage } from 'next'
import React, { useState } from 'react'
import { Card as CardInterface } from '../../models/card.model'
import { getProductData } from '../../api/product.api'
import style from './Cardholder.module.scss'
import Card from '../Card/Card'
import ShowMore from '../ShowMore/ShowMore'
import Loader from '../Loader/Loader'

interface Props {
    cards?: CardInterface[]
}

const Cardholder: NextPage<Props> = ({ cards = [] }) => {
    const [AllShowed, setAllShowed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [cardList, setCardList] = useState(cards)

    const showMoreHandler = async () => {
        setIsLoading(true)
        const new_cards = await getProductData()
        setIsLoading(false)
        setAllShowed(true)
        setCardList(new_cards)
    }

    return (
        <React.Fragment>
            <div className={style.title}>Похожие объявления</div>
            <div className={style.cardholder}>
                {cardList.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
                <div
                    className={[
                        style.row,
                        style['loader-wrapper'],
                        isLoading ? '' : style.hide
                    ].join(' ')}
                >
                    <Loader />
                </div>
                <div
                    className={[
                        style.row,
                        style['show-more-wrapper'],
                        AllShowed ? style.hide : ''
                    ].join(' ')}
                >
                    <ShowMore onClickHandler={showMoreHandler} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Cardholder
