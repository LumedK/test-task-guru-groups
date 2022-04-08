import axios from 'axios'

export const generateUrlImageCollection = async (id: string, length: number) => {
    const width = 400
    const height = 400
    const res = await axios.get(`https://picsum.photos/v2/list?page=${id}&limit=${length}`)
    const photos = res.data.map((item: { download_url: string }) =>
        item.download_url.replace(/\d*\/\d*$/, `${width}/${height}`)
    )
    return photos
}
