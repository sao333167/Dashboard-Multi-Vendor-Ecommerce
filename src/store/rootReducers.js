import { authReducer } from "./Reducers/authReducerSlice";
import { bannerReducer } from "./Reducers/bannerReducerSlice";
import { categoyReducer } from "./Reducers/categoryReducerSlice";
import { chatReducer } from "./Reducers/chatReducerSlice";
import { dashboardReducer } from "./Reducers/dashboardReducerSlice";
import { orderReducer } from "./Reducers/orderReducerSlice";
import { paymentReducer } from "./Reducers/paymentReducerSlice";
import { productReducer } from "./Reducers/productReducerSlice";
import { sellerReducer } from "./Reducers/sellerReducerSlice";


const rootReducer = {
    auth: authReducer,
    chat: chatReducer,
    category: categoyReducer,
    product: productReducer,
    seller: sellerReducer,
    order: orderReducer,
    payment: paymentReducer,
    dashboard: dashboardReducer,
    banner: bannerReducer,
}

export default rootReducer;