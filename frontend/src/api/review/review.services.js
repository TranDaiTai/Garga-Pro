import api from '../api'

const PREFIX = '/api/products'
const SUFFIX = '/reviews'

export const reviewApi = {
    getReviewsProduct:async(id) =>{
        const res =  await api.get(`${PREFIX}/${id}${SUFFIX}`)
        if ( res.data.success ){
            const {success, ...data} = res.data ;
            return data ;
        }
        return null ;
    }
}