import { createSlice } from '@reduxjs/toolkit';
import { defaultMerchant } from '../../utils/constants';


export const merchantSlice = createSlice({
    name: 'form',
    initialState: {
        merchant: defaultMerchant || {},
    },
    reducers:{
        setState: (state, action) => {
            // console.log({...state, ...action.payload}, '{...state, ...action.payload}');
            return {...state, ...action.payload}
        },
        // getState
    }
})

// export const fetchPermission = params => async (dispatch, getState) => {
//     const res = await getList(params);
//     console.log(res, 'slice-res')
//     dispatch(setState({permission:res.data}));
//     return res.data;
//     // console.log(res.data.data, 'dddd')
// }

// // export const fetchPosts = createAsyncThunk('app/getPermission', async (params) => {
// //     const res = await getList(params);
// //     console.log(res.data.data, 'res.data.data');
// //     // console.log()
// //     return res.data.data;
// // });

export const { setState } = merchantSlice.actions;
export default merchantSlice.reducer;
