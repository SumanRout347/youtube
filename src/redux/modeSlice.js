import { createSlice } from "@reduxjs/toolkit"


const modeSlice=createSlice({
    name:"mode",
    initialState: {
        value:false,
        token:null,
        slider:false,
        sidebar:true,
    },
    reducers:{
        toggleMode(state){
            state.value=!state.value
        },
        setToken(state,action){
            state.token=action.payload
        },
        toggleSlider(state){
            state.slider=!state.slider

        },
        toggleSidebar(state,action){
            state.sidebar=action.payload
        }
    }
})
export const {toggleMode,setToken,toggleSlider,toggleSidebar}=modeSlice.actions
export default modeSlice.reducer