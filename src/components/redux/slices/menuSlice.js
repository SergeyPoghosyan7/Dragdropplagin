import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const getMenu = createAsyncThunk(
    "menu/get",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:4000/menu")
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)
export const changeMenu = createAsyncThunk(
    "menu/change",
    async (menu, thunkAPI) => {
        try {
            const response = await axios.put(`http://localhost:4000/menu/${menu.index+1}` , menu.menu)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)
export const postMenu = createAsyncThunk(
    "menu/post",
    async (menu, thunkAPI) => {
        try {
            const response = await axios.post(`http://localhost:4000/menu` , menu)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)




const menuSlice = createSlice({
    name : "menu",
    initialState : {
        menu : []
    },
    extraReducers : {
        [getMenu.fulfilled] : (state , action) => {
            state.menu = action.payload
        }
    }

})

export default menuSlice.reducer