import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: 'user', // state 이름
    initialState: {name : 'hong' , age : 20} , // 값
    reducers : {
        changeName(state){
            // return  {name : 'hong gildong' , age : 20}// 변경할때
            state.name = "hong gildong"
        },
        changeAge(state, action){
            // return  {name : 'hong gildong' , age : 20}// 변경할때
            state.age += action.payload
        }
    }
})




export let {changeName, changeAge} = user.actions //사용하려면
export default user