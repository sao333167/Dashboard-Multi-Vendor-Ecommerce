import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_admin_dashboard_data = createAsyncThunk(
    'dashboard/get_admin_dashboard_data',
    async(_,{rejectWithValue,fulfillWithValue}) => {
        try{
            
            const {data} = await api.get(`/admin/get-dashboard-data`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method get_admin_dashboard_data
export const get_seller_dashboard_data = createAsyncThunk(
    'dashboard/get_seller_dashboard_data',
    async(_,{rejectWithValue,fulfillWithValue}) => {
        try{
            
            const {data} = await api.get(`/seller/get-dashboard-data`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method get_seller_dashboard_data






export const dashboardReducerSlice  = createSlice({
    name: 'dashboard',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        totalSale : 0,
        totalOrder : 0,
        totalProduct : 0,
        totalPendingOrder : 0,
        totalSeller : 0,
        recentOrder : [],
        recentMessage : [],
        
    },
    reducers : {
        messageClear:(state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_admin_dashboard_data.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_admin_dashboard_data.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(get_admin_dashboard_data.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.totalSale = payload.totalSale
            state.totalProduct = payload.totalProduct
            state.totalOrder = payload.totalOrder
            state.totalSeller = payload.totalSeller
            state.recentMessage = payload.messages
            state.recentOrder = payload.recentOrder

        })
        .addCase(get_seller_dashboard_data.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_seller_dashboard_data.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(get_seller_dashboard_data.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.totalSale = payload.totalSale
            state.totalProduct = payload.totalProduct
            state.totalOrder = payload.totalOrder
            state.recentMessage = payload.messages
            state.recentOrder = payload.recentOrder
            state.totalPendingOrder = payload.totalPendingOrder

        })
        
   

        
    }
})
export const {messageClear} = dashboardReducerSlice.actions
export const dashboardReducer = dashboardReducerSlice.reducer;