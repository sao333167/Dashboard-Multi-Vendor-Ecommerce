import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_admin_orders = createAsyncThunk(
    'orders/get_admin_orders',
    async({parPage,page,searchValue},{rejectWithValue,fulfillWithValue}) => {
        try{
         
            const {data} = await api.get(`/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
export const get_admin_order = createAsyncThunk(
    'orders/get_admin_order',
    async(orderId,{rejectWithValue,fulfillWithValue}) => {
        try{
         
            const {data} = await api.get(`/admin/order/${orderId}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
export const admin_order_status_update = createAsyncThunk(
    'orders/admin_order_status_update',
    async({orderId,info},{rejectWithValue,fulfillWithValue}) => {
        try{
         
            const {data} = await api.put(`/admin/order-status/update/${orderId}`,info,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_seller_orders = createAsyncThunk(
    'orders/get_seller_orders',
    async({parPage,page,searchValue,sellerId},{rejectWithValue,fulfillWithValue}) => {
        try{
         
            const {data} = await api.get(`/seller/orders/${sellerId}?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_seller_order = createAsyncThunk(
    'orders/get_seller_order',
    async(orderId,{rejectWithValue,fulfillWithValue}) => {
        try{
         
            const {data} = await api.get(`/seller/order/${orderId}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_order_status_update = createAsyncThunk(
    'orders/seller_order_status_update',
    async({orderId,info},{rejectWithValue,fulfillWithValue}) => {
        try{
         
            const {data} = await api.put(`/seller/order-status/update/${orderId}`,info,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)




export const orderReducerSlice  = createSlice({
    name: 'order',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        myOrders : [],
        totalOrder : 0,
        order : {},
    },
    reducers : {
        messageClear:(state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
       builder
       .addCase(get_admin_orders.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_admin_orders.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(get_admin_orders.fulfilled, (state, { payload }) => {
            state.totalOrder = payload.totalOrder;
            state.myOrders = payload.orders; 
            state.loader = false;
        })
       .addCase(get_admin_order.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_admin_order.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(get_admin_order.fulfilled, (state, { payload }) => {
            state.order = payload.order; 
            state.loader = false;
        })
       .addCase(admin_order_status_update.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(admin_order_status_update.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(admin_order_status_update.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message; 
            state.loader = false;
        })
        .addCase(get_seller_orders.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_seller_orders.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(get_seller_orders.fulfilled, (state, { payload }) => {
            state.myOrders = payload.orders; 
            state.totalOrder = payload.totalOrder;
            state.loader = false;
        }).addCase(get_seller_order.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(get_seller_order.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(get_seller_order.fulfilled, (state, { payload }) => {
            state.order = payload.order; 
            state.loader = false;
        })
        .addCase(seller_order_status_update.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(seller_order_status_update.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(seller_order_status_update.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message; 
            state.loader = false;
        })
       

        
    }
})
export const {messageClear} = orderReducerSlice.actions
export const orderReducer = orderReducerSlice.reducer;