import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from "../Pagination";
import { get_seller_orders } from "../../store/Reducers/orderReducerSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Orders() {
  const { loader, myOrders, totalOrder } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState(""); // value used by Search component
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
      sellerId: userInfo._id,
    };
    dispatch(get_seller_orders(obj));
  }, [dispatch, currentPage, searchValue, parPage, userInfo._id]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      {loader && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white/50"></div>
        </div>
      )}
      <h1 className="text-[#000000] font-semibold text-lg mb-3">Orders</h1>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchVaule={searchValue}
        />

        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Date
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="capitalize">
              {myOrders.map((o, i) => (
                <tr key={i}>
                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    #{i + 1}
                  </td>
                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    ${o.price}
                  </td>
                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    {o.payment_status}
                  </td>
                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    {o.delivery_status}
                  </td>
                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    {o.date}
                  </td>

                  <td className="py-1 px-4 font-medium whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/seller/dashboard/order/details/${o._id}`}
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalOrder <= parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={4}
            />
          </div>
        )}
      </div>
    </div>
  );
}
