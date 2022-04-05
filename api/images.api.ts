import axios from 'axios'

const urlImageCache: Map<string, string[]> = new Map()

export const generateUrlImage = async (id: string, index: number) => {
    const photos = urlImageCache.get(id) || []
    urlImageCache.set(id, photos)

    if (!photos[index]) {
        const res = await axios.get(`https://source.unsplash.com/random/${id}_${index}`)
        const url = (res.request.responseURL || '').replace(/&w=1080/, '&w=380')
        photos[index] = url
    }

    return photos[index]
}
