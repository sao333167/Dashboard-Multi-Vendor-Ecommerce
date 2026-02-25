import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_seller_order,messageClear,seller_order_status_update } from "../../store/Reducers/orderReducerSlice";
import toast from "react-hot-toast";

export default function OrderDetails() {
  const {orderId} = useParams()
  const dispatch = useDispatch()
  const {order,loader,errorMessage,successMessage} = useSelector(state => state.order)
  const [status ,setStatus] = useState("")

  const status_update = (e) => {
      dispatch(seller_order_status_update({orderId,info: {status: e.target.value}}))
      setStatus(e.target.value)
    }

  useEffect(() => {
      setStatus(order?.delivery_status)
    }, [dispatch, order])

   useEffect(() => {
          if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
          }
          if (successMessage) {
              toast.success(successMessage);
              dispatch(messageClear());
          }
        }, [successMessage, errorMessage,dispatch]);

  useEffect(() => {
    dispatch(get_seller_order(orderId))
  }, [dispatch, orderId])
  return (
    <div className="px-2 lg:px-7 pt-5">
      {loader && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white/50"></div>
        </div>
      )}
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <select 
           onChange={status_update}
           value={status} 
          className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6] capitalize">
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="warehouse">warehouse</option>
            <option value="placed">placed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>

        <div className="p-4">
          <div className="flex gap-2 text-lg text-[#d0d2d6]">
            <h2>#{order?._id}</h2>
            <span>{order?.date}</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[30%]">
              <div className="pr-3 text-[#d0d2d6] text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver To : {order?.shippingInfo}
                  </h2>
                 
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Payment Status</h2>
                  <span className="text-base">{order?.payment_status}</span>
                </div>
                <span>Price : ${order?.price}</span>


                {order?.products && order?.products?.map((p,i) => (
                  <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md capitalize" key={i}>
                    <div className="text-[#d0d2d6]">
                      <div className="flex gap-3 text-md items-center p-1">
                      <img
                        className="w-[50px] h-[50px] rounded-md object-cover"
                          src={p?.images[0]}
                          alt=""
                        />
                        <div>
                          <h2>{p?.name}</h2>
                          <p>
                            <span>Brand : </span>
                            <span>{p?.brand}</span>
                            <span className="text-lg"> Quantity : {p?.quantity} </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
