import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_request = createAsyncThunk(
    'category/get_seller_request',
    async({parPage,page,searchValue},{rejectWithValue,fulfillWithValue}) => {
        try{
         
            const {data} = await api.get(`/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method get_seller_request

export const get_seller = createAsyncThunk(
    'category/get_seller',
    async(sellerId,{rejectWithValue,fulfillWithValue}) => {
        try{
            const {data} = await api.get(`/get-seller/${sellerId}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method get_seller

export const seller_status_update = createAsyncThunk(
    'category/seller_status_update',
    async(info,{rejectWithValue,fulfillWithValue}) => {
        try{
            const {data} = await api.post(`/seller-status-update`,info,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method seller_status_update

export const get_active_sellers = createAsyncThunk(
    'category/get_active_sellers',
    async({parPage,page,searchValue},{rejectWithValue,fulfillWithValue}) => {
        try{
         
            const {data} = await api.get(`/get-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method get_seller_request
export const get_deactive_sellers = createAsyncThunk(
    'category/get_deactive_sellers',
    async({parPage,page,searchValue},{rejectWithValue,fulfillWithValue}) => {
        try{
         
            const {data} = await api.get(`/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method get_deactive_sellers
export const create_stripe_connect_account = createAsyncThunk(
    'seller/create_stripe_connect_account',
    async(_, {rejectWithValue, fulfillWithValue}) => { 
        try { 
            const response = await api.get(`/payment/create-stripe-connect-account`, {withCredentials: true}) 
              
            // Check if data is nested inside response object
            const data = response.data
            
            if (typeof data === 'object' && data !== null && data.url) {
                // console.log('Found URL in data.url:', data.url)
                window.location.href = data.url
                return fulfillWithValue({success: true, redirected: true})
            } else if (typeof data === 'object' && data !== null && data.data && data.data.url) {
                // console.log('Found URL in data.data.url:', data.data.url)
                window.location.href = data.data.url
                return fulfillWithValue({success: true, redirected: true})
            } else {
                // console.log('No URL found. Complete response data:', JSON.stringify(data))
                return rejectWithValue(`Backend response format unexpected. Got: ${JSON.stringify(data)}. Expected: {url: "..."}`)
            }
        } catch (error) {
            // console.log('Full error object:', error)
            // console.log('Error response:', error.response)
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to create Stripe Connect account'
            // console.log('Stripe connect account error:', errorMessage)
            return rejectWithValue(errorMessage)
        }
    }
)

// End method get_deactive_sellers
export const active_stripe_connect_account = createAsyncThunk(
    'seller/active_stripe_connect_account',
    async(activeCode, {rejectWithValue, fulfillWithValue}) => { 
        try { 
            const {data } = await api.put(`/payment/active-stripe-connect-account/${activeCode}`,{},{withCredentials: true}) 
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response.data) 
            return rejectWithValue(error.response.data)
        }
    }
)

// End method get_deactive_sellers


export const sellerReducerSlice  = createSlice({
    name: 'seller',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        sellers : [],
        totalSeller : 0,
        seller : '',
    },
    reducers : {
        messageClear:(state,_) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
       builder
       .addCase(get_seller_request.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_seller_request.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(get_seller_request.fulfilled, (state, { payload }) => {
            state.totalSeller = payload.totalSeller;
            state.sellers = payload.sellers; 
        })
       .addCase(get_seller.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_seller.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(get_seller.fulfilled, (state, { payload }) => {
            state.seller = payload.seller; 
        })
       .addCase(seller_status_update.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(seller_status_update.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(seller_status_update.fulfilled, (state, { payload }) => {
            state.seller = payload.seller; 
            state.successMessage = payload.message; 
        })
        .addCase(get_active_sellers.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_active_sellers.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(get_active_sellers.fulfilled, (state, { payload }) => {
            state.sellers = payload.sellers; 
            state.totalSeller = payload.totalSeller; 
            state.loader = false;
        })
        .addCase(get_deactive_sellers.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_deactive_sellers.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(get_deactive_sellers.fulfilled, (state, { payload }) => {
            state.sellers = payload.sellers; 
            state.totalSeller = payload.totalSeller; 
            state.loader = false;
        })
        .addCase(create_stripe_connect_account.pending, (state) => {
            state.loader = true;
        })
        .addCase(create_stripe_connect_account.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload
        }) 
        .addCase(create_stripe_connect_account.fulfilled, (state) => {
            state.loader = false;
        })
        .addCase(active_stripe_connect_account.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(active_stripe_connect_account.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(active_stripe_connect_account.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message; 
        })

        
    }
})
export const {messageClear} = sellerReducerSlice.actions
export const sellerReducer = sellerReducerSlice.reducer;