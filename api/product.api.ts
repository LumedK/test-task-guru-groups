import axios from 'axios'
import { Card } from '../models/card.model'

interface Params {
    page?: number
    limit?: number
}

export const getProductData = async ({ page, limit }: Params = {}): Promise<Card[]> => {
    const params = []
    if (page !== undefined) params.push(`page=${page}`)
    if (limit !== undefined) params.push(`limit=${limit}`)
    const urlPrams = params.length > 0 ? `?${params.join('&')}` : ''
    const url = `https://6075786f0baf7c0017fa64ce.mockapi.io/products${urlPrams}`

    const response = await axios.get(url)

    return response.data || []
}
