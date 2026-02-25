import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_customers = createAsyncThunk(
    'chat/get_customers',
    async (sellerId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/chat/seller/get-customers/${sellerId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// end get_customers

export const get_customer_message = createAsyncThunk(
    'chat/get_customer_message',
    async (customerId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/chat/seller/get-customer-message/${customerId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// end get_customer_message
export const send_message = createAsyncThunk(
    'chat/send_message',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/chat/seller/send-message-to-customer/`, info, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// end send_message

export const get_sellers = createAsyncThunk(
    'chat/get_sellers',
    async (sellerId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/chat/admin/get-sellers`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// end get_customers
export const send_message_seller_admin = createAsyncThunk(
    'chat/send_message_seller_admin',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/chat/admin/send-message-to-seller-admin`, info, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// end send_message_seller_admin
export const get_admin_messages = createAsyncThunk(
    'chat/get_admin_messages',
    async (receverId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/chat/admin/get-admin-messages/${receverId}`,  { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// end get_admin_message
export const get_seller_message = createAsyncThunk(
    'chat/get_seller_message',
    async(receverId,{rejectWithValue, fulfillWithValue}) => {

        try {
            const {data} = await api.get(`/chat/get-seller-messages`, {withCredentials: true}) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) { 
            return rejectWithValue(error.response.data)
        }
    }
)

// end get_seller_messages


export const chatReducerSlice = createSlice({
    name: 'chat',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        customers: [],
        messages: [],
        activeCustomer: [],
        activeSeller: [],
        activeAdmin: [],
        friends: [],
        seller_admin_message: [],
        currentSeller: {},
        currentCustomer: {},
        sellers: [],

    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
         updateMessage: (state, {payload}) => {
            state.messages = [...state.messages,payload]
        },
        updateSeller: (state, {payload}) => {
            state.activeSeller = payload
        },
        updateCustomer: (state, {payload}) => {
            state.activeCustomer = payload
        },
        updateAdminMessage: (state, {payload}) => {
            state.seller_admin_message = [...state.seller_admin_message,payload]
        },
        updateSellerMessage: (state, {payload}) => {
            state.seller_admin_message = [...state.seller_admin_message,payload]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_customers.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(get_customers.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error
            })
            .addCase(get_customers.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.customers = payload.customers
            })
            .addCase(get_customer_message.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(get_customer_message.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error
            })
            .addCase(get_customer_message.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.messages = payload.messages
                state.currentCustomer = payload.currentCustomer
            })
            .addCase(send_message.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(send_message.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(send_message.fulfilled, (state, { payload }) => {
                state.loader = false;
                let tempFriends = state.customers
                let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId)
                while (index > 0) {
                    let temp = tempFriends[index]
                    tempFriends[index] = tempFriends[index - 1]
                    tempFriends[index - 1] = temp
                    index--
                }
                state.customers = tempFriends;
                state.messages = [...state.messages, payload.message];
                state.successMessage = 'Message Send Success';
            })
            .addCase(get_sellers.fulfilled, (state, { payload }) => {
                state.sellers = payload.sellers
            })
            .addCase(send_message_seller_admin.fulfilled, (state, { payload }) => {
                state.seller_admin_message = [...state.seller_admin_message,payload.message]
                state.successMessage = 'Message Send Success';
            })
            .addCase(get_admin_messages.fulfilled, (state, { payload }) => {
                state.seller_admin_message = payload.messages
                state.currentSeller = payload.currentSeller
            })
            .addCase(get_seller_message.fulfilled, (state, { payload }) => {
                state.seller_admin_message = payload.messages
            })


    }
})
export const { messageClear,updateMessage,updateSeller,updateCustomer,updateAdminMessage,updateSellerMessage } = chatReducerSlice.actions
export const chatReducer = chatReducerSlice.reducer;