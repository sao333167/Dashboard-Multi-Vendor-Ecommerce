import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_payment_details = createAsyncThunk(
    'category/get_seller_payment_details',
    async(sellerId,{rejectWithValue,fulfillWithValue}) => {
        try{
            
            const {data} = await api.get(`/payment/seller-payment-details/${sellerId}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method categoryAdd
export const send_withdrawal_request = createAsyncThunk(
    'payment/send_withdrawal_request',
    async(info,{rejectWithValue,fulfillWithValue}) => {
        try{
            
            const {data} = await api.post(`/payment/send-withdrawal-request`,info,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method categoryAdd
export const get_payment_request = createAsyncThunk(
    'payment/get_payment_request',
    async(_,{rejectWithValue,fulfillWithValue}) => {
        try{
            
            const {data} = await api.get(`/payment/request`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method categoryAdd
export const confirm_payment_request = createAsyncThunk(
    'payment/confirm_payment_request',
    async(paymentId,{rejectWithValue,fulfillWithValue}) => {
        try{
            
            const {data} = await api.post(`/payment/request-confirm`,{paymentId},{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method categoryAdd







export const paymentReducerSlice  = createSlice({
    name: 'payment',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        pendingWithdraws : [],
        successWithdraws : [],
        totalAmount : 0,
        withdrawAmount : 0,
        pendingAmount : 0,
        availableAmount : 0,
    },
    reducers : {
        messageClear:(state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_seller_payment_details.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_seller_payment_details.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(get_seller_payment_details.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.pendingWithdraws = payload.pendingWithdraws
            state.successWithdraws = payload.successWithdraws
            state.totalAmount = payload.totalAmount
            state.withdrawAmount = payload.withdrawAmount
            state.pendingAmount = payload.pendingAmount
            state.availableAmount = payload.availableAmount
        })
        .addCase(send_withdrawal_request.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(send_withdrawal_request.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(send_withdrawal_request.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.pendingWithdraws = [...state.pendingWithdraws, payload.withdrawal]
            state.availableAmount = state.availableAmount - payload.withdrawal.amount
            state.pendingAmount = payload.withdrawal.amount
        })
        .addCase(get_payment_request.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_payment_request.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(get_payment_request.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.pendingWithdraws = payload.withdrawalRequest
            
        })
        .addCase(confirm_payment_request.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(confirm_payment_request.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(confirm_payment_request.fulfilled, (state, { payload }) => {
            const temp = state.pendingWithdraws.filter(request => request._id !== payload.payment._id)
            state.loader = false;
            state.successMessage = payload.message
            state.pendingWithdraws = temp
            
        })
   

        
    }
})
export const {messageClear} = paymentReducerSlice.actions
export const paymentReducer = paymentReducerSlice.reducer;