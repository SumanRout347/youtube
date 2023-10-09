import { createSlice } from "@reduxjs/toolkit";


const chatSlice=createSlice({
    name:"chat",
    initialState:{
        chatData:[]
    },
    reducers:{
        addChat(state,action){
            if(state.chatData.length>25){
                state.chatData.splice(25,1)
            }
            state.chatData.unshift(action.payload)
        }
    }
})
export const {addChat}=chatSlice.actions
export default chatSlice.reducer