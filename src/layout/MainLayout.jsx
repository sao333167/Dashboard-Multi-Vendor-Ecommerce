import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { socket } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer, updateSeller } from "../store/Reducers/chatReducerSlice";


export default function MainLayout() {

  const {userInfo} = useSelector(state => state.auth)
  const [showSidebar,setShowSidebar] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if(userInfo && userInfo.role === 'seller'){
      socket.emit('add_seller',userInfo._id,userInfo)
    }else{
      socket.emit('add_admin',userInfo)
    }
  },[userInfo])

  useEffect(() => {
    socket.on('activeSeller',(sellers) => {
      dispatch(updateSeller(sellers))
    })
    socket.on('activeCustomer',(customers) => {
      dispatch(updateCustomer(customers))
    })
  },[dispatch])

  return (
    <div className="bg-[#cdcae9] w-full min-h-screen">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className='ml-0 lg:ml-[260px] pt-[95px] transition-all'>
        <Outlet />
      </div>
    </div>
  );
}
