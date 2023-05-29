import React from "react";
import Header from "../components/Header";
import Link from "next/link";
import { BsClipboardData, BsMic } from "react-icons/bs";
import withProtected from "../hoc/withProtected";

const ambilData = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div>
        <Header title='Ambil Data'/>
      </div>
      <div className="lg:col-span- col-span-1 flex justify-between items-center lg:w-1/2 w-full p-2 m-auto my-10">
        <Link href='/survey'>
          <div className="bg-green-400 hover:bg-green-300 cursor-pointer flex flex-col justify-center items-center p-8 rounded-xl w-auto my-28">
            <p className="text-white text-2xl p-8">Kuesioner</p>
            <BsClipboardData size={48} className="text-white" />
          </div>
        </Link>
        <Link href='/rekaman'>
          <div className="bg-red-400 hover:bg-red-300 cursor-pointer flex flex-col justify-center items-center lg:p-8 p-8 rounded-xl w-auto my-28">
            <p className="text-white text-2xl p-8">Rekaman</p>
            <BsMic size={48} className="text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default withProtected(ambilData);
