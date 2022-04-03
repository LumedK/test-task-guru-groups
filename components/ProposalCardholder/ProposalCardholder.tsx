import { NextPage } from 'next'
import React, { useState } from 'react'
import { Card } from '../../models/card.model'
import style from './ProposalCardholder.module.scss'
import ProposalCard from '../ProposalCard/ProposalCard'
import ShowMore from '../ShowMore/ShowMore'
import Loader from '../Loader/Loader'
import axios from 'axios'

interface Props {
    cards?: Card[]
}

const ProposalCardholder: NextPage<Props> = ({ cards = [] }) => {
    const [AllShowed, setAllShowed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [cardList, setCardList] = useState(cards)

    const showMoreHandler = async () => {
        setIsLoading(true)
        const res = await axios.get('https://6075786f0baf7c0017fa64ce.mockapi.io/products')
        setIsLoading(false)
        setAllShowed(true)
        setCardList(res.data)
    }

    const loaderJSX = (
        <div className={style.loader}>
            <Loader />
        </div>
    )

    const showMoreJSX = (
        <div className={style['proposal-cardholder']}>
            <div className={`${style['item-wrapper']} ${style['last-column']}`}>
                <ShowMore onClickHandler={showMoreHandler} />
            </div>
        </div>
    )

    return (
        <React.Fragment>
            <div className={style.title}>Похожие объявления</div>
            <div className={style['proposal-cardholder']}>
                {cardList.map((card) => (
                    <div className={style['item-wrapper']} key={card.id}>
                        <ProposalCard card={card} />
                    </div>
                ))}
            </div>
            {isLoading ? loaderJSX : ''}
            {AllShowed ? '' : showMoreJSX}
        </React.Fragment>
    )
}

export default React.memo(ProposalCardholder)
