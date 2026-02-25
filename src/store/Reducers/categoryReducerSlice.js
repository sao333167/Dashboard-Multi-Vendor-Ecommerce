import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const categoryAdd = createAsyncThunk(
    'category/categoryAdd',
    async({name,image},{rejectWithValue,fulfillWithValue}) => {
        try{
            const formData = new FormData()
            formData.append('name',name)  
            formData.append('image',image)  
            const {data} = await api.post('/category-add',formData,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method categoryAdd

export const get_category = createAsyncThunk(
    'category/get_category',
    async({parPage,page,searchValue},{rejectWithValue,fulfillWithValue}) => {
        try{
         
            const {data} = await api.get(`/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method get_category searchValue

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async({id,name,image},{rejectWithValue,fulfillWithValue}) => {
        try{
            const formData = new FormData()
            formData.append('name',name)
            if(image){
                formData.append('image',image)  
            }  
            const {data} = await api.put(`/category-update/${id}`,formData,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method updateCategory
export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async(id,{rejectWithValue,fulfillWithValue}) => {
        try{
             const {data}  = await api.delete(`/category-delete/${id}`);  
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// End method updateCategory





export const categoyReducerSlice  = createSlice({
    name: 'category',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        categories : [],
        totalCategory : 0,
    },
    reducers : {
        messageClear:(state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(categoryAdd.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(categoryAdd.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(categoryAdd.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.categories = [...state.categories,payload.category]

        })
        .addCase(get_category.fulfilled, (state, { payload }) => {
            state.totalCategory = payload.totalCategory;
            state.categories = payload.categories;
        })
        .addCase(updateCategory.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(updateCategory.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(updateCategory.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            const index = state.categories.findIndex((cat) => cat._id === payload.category._id)
            if(index !== - 1){
                state.categories[index] = payload.category
            }
           

        })
        .addCase(deleteCategory.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(deleteCategory.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(deleteCategory.fulfilled, (state, { payload, meta }) => {
            state.categories = state.categories.filter(cat => cat._id !== meta.arg);
            state.successMessage = payload.message           
            state.loader = false;

        })
        

        
    }
})
export const {messageClear} = categoyReducerSlice.actions
export const categoyReducer = categoyReducerSlice.reducer;