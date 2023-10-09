import { createSlice } from "@reduxjs/toolkit"

const searchSlice=createSlice({
    name:"search",
    initialState:{
        suggestions:{},
        isSearch:false,
        isLive:false
    },
    reducers:{
        cacheData(state,action){
          state.suggestions={...state.suggestions,...action.payload}
        },
        setSearch(state,action){
            state.isSearch=action.payload
        },
        setLive(state,action){
            state.isLive=action.payload
        }
    }
    
})
export const {cacheData,setSearch,setLive}=searchSlice.actions
export default searchSlice.reducer