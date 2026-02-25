import React from "react";
import { FaList } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header({ showSidebar, setShowSidebar }) {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
      <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#b1addf] px-5 transition-all">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer"
        >
          <span>
            <FaList />
          </span>
        </div>
        <div className="hidden md:block">
          <input
            className="px-3 py-2 outline-none bg-transparent border border-slate-700 rounded-md  focus:border-indigo-500 overflow-hidden"
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end capitalize">
                <h2 className="text-md font-bold">{userInfo.name} <span className="text-[11px] w-full font-normal text-slate-500">({userInfo.role})</span>
                </h2>
                {
                  userInfo.role === 'seller' &&
                  <span className="text-[14px] w-full font-normal text-slate-500">Shop: {userInfo?.shopInfo?.shopName}</span>
                }
              </div>
              <img
                className="w-[45px] h-[45px] rounded-full"
                src={userInfo.image}
                alt="admin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
