import { NextPage } from 'next'
import Image from 'next/image'
import { MouseEventHandler } from 'react'
import style from './ShowMore.module.scss'

interface Props {
    onClickHandler?: MouseEventHandler<HTMLDivElement>
}

const ShowMore: NextPage<Props> = ({ onClickHandler = () => {} }) => {
    return (
        <div className={style['show-more']} onClick={onClickHandler}>
            Показать еще
            <div className={style['show-more-img']}>
                <Image src="./expand.svg" alt="expand" width={16} height={16} />
            </div>
        </div>
    )
}

export default ShowMore
