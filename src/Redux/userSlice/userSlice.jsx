import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    userInfo: {},
   
}

export const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        setUserDetails: (state, action) => {
            state.userInfo = action.payload;
            console.log(action.payload,'-----------------------------------');
        },
        resetState: (state) => {
            return INITIAL_STATE;
        },
        getOnlineUsers: (state, action) => {
            state.socketInfo = action.payload;
            
        },

    }

})

export const { setUserDetails,resetState,getOnlineUsers } = userSlice.actions; 

export default userSlice.reducer;