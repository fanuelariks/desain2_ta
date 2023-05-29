import React from "react";
import { BsClipboardData, BsMic } from "react-icons/bs";
import Link from "next/link.js";

const RecentOrders = () => {
  return (
    <div className="w-full col-span-1 relative lg:h-[40vh] h-[35vh] m-auto p-4 border rounded-lg bg-white">
      <div className="flex flex-col text-center w-full pb-2">
        <p className="text-3xl font-bold">Ambil Data</p>
      </div>
      <div className="lg:col-span-2 col-span-1 lg:flex lg:justify-between items-center p-1 m-auto w-2/3 my-8">
        <Link href="/survey">
          <div className="bg-green-400 hover:bg-green-300 cursor-pointer flex flex-col justify-center items-center p-2 rounded-xl w-auto my-2">
            <p className="text-white text-xl p-3">Kuesioner</p>
            <BsClipboardData size={28} className="text-white" />
          </div>
        </Link>
        <Link href="/rekaman">
          <div className="bg-red-400 hover:bg-red-300 cursor-pointer flex flex-col justify-center items-center p-2 rounded-xl w-auto my-2">
            <p className="text-white text-xl p-3 px-4">Rekaman</p>
            <BsMic size={28} className="text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecentOrders;
