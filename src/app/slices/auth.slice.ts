import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User{
    id: string;
    email:string
    name:string
}

interface AuthState{
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean
}

const initialState : AuthState={
    user: null,
    isAuthenticated: false,
    isLoading: true
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setCredentials: (state, action: PayloadAction<User>)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false
        },
        logout: (state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false
        }
    }
})

export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer