import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_deactive_sellers } from "../../store/Reducers/sellerReducerSlice";

export default function DeactiveSellers() {
  const { sellers, totalSeller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_deactive_sellers(obj));
  }, [dispatch, parPage, currentPage, searchValue]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[18px] font-semibold mb-3">Deactive Seller</h1>
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
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
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            type="text"
            placeholder="Search"
          />
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Shop Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Devision
                </th>
                <th scope="col" className="py-3 px-4">
                  District
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="capitalize">
              {sellers &&
                sellers.map((s, i) => (
                  <tr key={i}>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {i + 1}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      <img
                        className="w-[45px] h-[45px] rounded-md"
                        src={s.image}
                        alt={s.name}
                      />
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {s.name}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap capitalize">
                      {s.shopInfo?.shopName}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {s.payment}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {s.email}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {s.status}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {s.shopInfo?.division}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {s.shopInfo?.district}
                    </td>

                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      <div className="flex justify-start items-center gap-4">
                        <Link
                          to={`/admin/dashboard/seller/details/${s._id}`}
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

        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          {totalSeller <= parPage ? (
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalSeller}
                parPage={parPage}
                showItem={5}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
