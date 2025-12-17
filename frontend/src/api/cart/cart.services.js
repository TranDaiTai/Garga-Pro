import api from '../api'
const PREFIX = '/api/cart/'
export const CartApi = {
        addToCard: (product)=>{
            return api.post(`${PREFIX}`)
        },
    pullToCard: () =>{

    }
}