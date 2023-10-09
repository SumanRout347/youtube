import { createSlice } from "@reduxjs/toolkit";

const videoSlice=createSlice(({
    name:"videos",
    initialState:{
        initial:null,
        searchVideo:null,
        liveVideo:null
    },
    reducers:{
        setVideos(state,action){
           state.initial= action.payload

        },
        setSearchVideos(state,action){
            state.searchVideo= action.payload
 
         },
         setLiveVideos(state,action){
            state.liveVideo=action.payload
         }
    }
}))
export const {setVideos,setSearchVideos,setLiveVideos} =videoSlice.actions
export default videoSlice.reducer