import { createSlice } from '@reduxjs/toolkit'
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: []
    },
    reducers: {
        addBook: (state, action) => {
            let book = state.products.find((product)=> product._id === action.payload._id)
            if(!book){
                state.products.push(action.payload)
            }
            //state.products.push(action.payload)
        },
        deleteBook : (state,action)=>{
            state.products = state.products.filter((product)=>product._id != action.payload)
        }
    }
})
export const { addBook,deleteBook } = cartSlice.actions
export default cartSlice.reducer
