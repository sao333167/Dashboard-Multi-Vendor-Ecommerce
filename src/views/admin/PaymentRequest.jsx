import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import { confirm_payment_request, get_payment_request, messageClear } from "../../store/Reducers/paymentReducerSlice";
import moment from "moment/moment";
import toast from "react-hot-toast";

function handleOnWheel ({deltaY}){
    console.log('handleOnWheel', deltaY)
}

const outerElementType = forwardRef((props,ref) =>  (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
))

export default function PaymentRequest() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVaule, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch()
  const {loader,successMessage,errorMessage,pendingWithdraws} = useSelector(state => state.payment)
  const [paymentId,setPaymentId] = useState('')

  useEffect(() => {
    dispatch(get_payment_request())
  }, [dispatch])

  const confirm_request = (id) => {
    setPaymentId(id)
    dispatch(confirm_payment_request(id))
  }

  useEffect(() => {
      if(successMessage){
        toast.success(successMessage)
        dispatch(messageClear())
      }
      if(errorMessage){
        toast.error(errorMessage)
        dispatch(messageClear())
      }
    },[successMessage,errorMessage,dispatch])

    const Row = ({index,style}) => {
        return (
            <div style={style} className="flex text-sm text-white font-medium border-b border-slate-600">
                <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
                <div className="w-[25%] p-2 whitespace-nowrap">${pendingWithdraws[index]?.amount || 0}</div>
                <div className="w-[25%] p-2 whitespace-nowrap capitalize"><span className="py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm">{pendingWithdraws[index]?.status || 'Pending'}</span></div>
                <div className="w-[25%] p-2 whitespace-nowrap">{moment(pendingWithdraws[index]?.createdAt).format("DD MMM YYYY")}</div>
                <div className="w-[25%] p-2 whitespace-nowrap">
                  <button disabled={loader} onClick={() => confirm_request(pendingWithdraws[index]?._id)} className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm">
                    {(loader && paymentId === pendingWithdraws[index]?._id) ? 'Loading...':'Confirm'}
                    </button></div>
            </div>
        )
    }



  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <h2 className="text-xl font-medium pb-5 text-[#d0d2d6]">Withdraw Request</h2>
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            name=""
            id=""
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <input
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            type="text"
            placeholder="Search"
          />
        </div>

        <div className="w-full">
            <div className="w-full overflow-x-auto">
                <div className="flex bg-[#a7a3de] font-bold uppercase text-xs min-w-[340px] rounded-md mt-4">
                    <div className="w-[25%] p-2">No</div>
                    <div className="w-[25%] p-2">Amount</div>
                    <div className="w-[25%] p-2">Status</div>
                    <div className="w-[25%] p-2">Date</div>
                    <div className="w-[25%] p-2">Action</div>
                </div>
                {
                    <List style={{minWidth: '340px'}}
                        className="List"
                        height={350}
                        itemCount={pendingWithdraws.length}
                        itemSize={35}
                        outerElementType={outerElementType}
                    >
                        {Row}
                    </List>
                }

            </div>
        </div>
      </div>
    </div>
  );
}
