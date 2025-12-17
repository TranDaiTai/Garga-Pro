import api from '../api'

const PREFIX = '/api/reviews/product'
export const reviewApi = {
    getReviewsProduct:(id) =>{
        return api.get(`${PREFIX}/${id}`)
    }
}