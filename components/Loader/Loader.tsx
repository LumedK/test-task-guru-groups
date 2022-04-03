import style from './Loader.module.scss'

const Loader = () => {
    return (
        <div>
            <div className={style['lds-ellipsis']}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader
