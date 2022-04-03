import axios from 'axios'
import { NextPage } from 'next'
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface Props {
    url: string
}

const RandomImg: NextPage<Props> = ({ url }) => {
    if (!url) return <React.Fragment />
    return <React.Fragment>{<img src={`${url}`} />}</React.Fragment>
}

export default React.memo(RandomImg)
