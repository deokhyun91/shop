import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice.js";

let stock = createSlice({
    name: 'stock', // state 이름
    initialState: [10, 11, 12] // 값
})

let cart = createSlice({
    name: 'cart', // state 이름y
    initialState: [
        {id: 0, name: 'white and black' , count:2},
        {id: 2, name: 'Gret' , count:1}
    ], // 값
    reducers : {
        addCount(state, action){

            let id = state.findIndex((a) => {return a.id === action.payload})
            state[id].count++
        },
        
        addList(state, action){
            state.push(action.payload)
         
        }
    }, 
  
        
 
})

export let {addCount, addList} = cart.actions;

export default configureStore({
    reducer: {
        user : user.reducer, //값등록
        stock : stock.reducer,
        cart : cart.reducer
    }
})