import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

interface InitialState{
    token:string | null;
    loading: boolean;
    error:string | null;
}

const initialState:InitialState = {
    token:null,
    loading:false,
    error:null
}


const loginSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(login.pending,(state) => {
            state.loading = true
            state.error = null
        })
        .addCase(login.fulfilled,(state,action) => {
            state.loading = false
            state.error =  null
            localStorage.setItem('accessToken',action.payload.accessToken);
        })
        .addCase(login.rejected,(state,action) => {
            state.loading = false
            state.error = typeof action.payload === 'string' ? action.payload : "Something went Wrong"
        })
    }
})


export const login = createAsyncThunk<
  { accessToken:string }, // return type
  { email: string; password: string }, // argument type
  { rejectValue: string } // error type
>(
    'auth/login',
    async (credential,thunkAPI) => {
        try{
            const response = await api.post<{accessToken:string}>("/login",credential);
            return response.data;
        } catch(err:any) {
           return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login Failed'); 
        }
});

export default loginSlice.reducer;