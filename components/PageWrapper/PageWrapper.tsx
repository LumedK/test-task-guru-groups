import { NextPage } from 'next'

import styles from './PageWrapper.module.scss'

const PageWrapper: NextPage = ({ children }) => {
    return <div className={styles['page-wrapper']}>{children}</div>
}

export default PageWrapper
