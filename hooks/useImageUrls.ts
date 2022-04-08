import { useCallback, useEffect, useState } from 'react'
import { generateUrlImageCollection } from '../api/images.api'

export const useImageUrls = (id: string, length: number) => {
    const [ImageUrls, setImageUrls] = useState<string[]>([])

    const addImages = useCallback(async () => {
        setImageUrls(await generateUrlImageCollection(id, length))
    }, [id, length])

    useEffect(() => {
        addImages()
    }, [addImages])

    return ImageUrls
}
