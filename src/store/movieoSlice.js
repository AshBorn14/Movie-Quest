import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    bannerData : [],
    imageUrl : ""
}

export const movieoSlice = createSlice({
    name : 'movieo',
    initialState,
    reducers : {
        setBannerData : (state,action)=>{
            state.bannerData = action.payload
        },
        setImageurl : (state, action) =>{
            state.imageUrl = action.payload
        }
    }
})

export const { setBannerData, setImageurl } = movieoSlice.actions

export default movieoSlice.reducer