import api from "../api"

const PREFIX = "/api/product"

export const productApi = {
    getProductAll:()=>{
        return api.get(PREFIX)
    },
    getProductById:(id)=>{
        return api.get(`${PREFIX}/${id}`)
    },
    getRelatedProduct:(productId) =>{
        return  api.get(`${PREFIX}/${id}`)
    }

}