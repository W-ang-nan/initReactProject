import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setToken, removeToken } from '../../utils/request/auth';

const initialState = {
    userData: {},
    token: '',
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<any>) => {
            console.log(action);
            state.userData = action.payload;
        },
        setStoreToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            setToken(action.payload);
        },
        logout: (state) => {
            state.userData = {};
            state.token = '';
            removeToken()
        },
    },
});
export const { setUserData, setStoreToken, logout } = userSlice.actions;
export default userSlice.reducer;