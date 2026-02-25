import React from "react";

export default function Search({ setParPage, setSearchValue, searchVaule }) {
  return (
    <div className="flex justify-between items-center rounded-md">
      <select
        onChange={(e) => setParPage(parseInt(e.target.value))}
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchVaule}
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
