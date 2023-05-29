import React from "react";
import useGetValue from "../hook/getValue";
import { data as jadwal } from "../data/data.js";
import Link from "next/link";

const TopCards = () => {
  const user = useGetValue("users");
  const data = Object.values(user.snapshot || {});

  // console.log(data);
  return (
    <div className="grid lg:grid-cols-5 grid-cols-4 gap-4 p-4">
      <div className="lg:col-span-2 flex-col bg-white flex justify-between lg:h-[40vh] h-[35vh] lg:w-full w-fit  border p-4 rounded-lg">
        {data.map((item) => {
          return (
            <Link href='/profil'>
              <div key={item.users}>
                <div className="flex flex-col w-full pb-3">
                  <p className="text-2xl font-bold">Nama</p>
                  <p className="text-gray-600">{item.name}</p>
                </div>
                <div className="flex flex-col w-full pb-3">
                  <p className="text-2xl font-bold">Nomor ID</p>
                  <p className="text-gray-600">{item.nomor_ID}</p>
                </div>
                <div className="flex flex-col w-full pb-3">
                  <p className="text-2xl font-bold">Usia</p>
                  <p className="text-gray-600">{item.usia}</p>
                </div>
                <div className="flex flex-col w-full pb-3">
                  <p className="text-2xl font-bold">Jenis Kelamin</p>
                  <p className="text-gray-600">{item.kelamin}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="lg:col-span-3 lg:w-full w-[50vh] m-auto lg:h-[40vh] h-[35vh] p-4 border rounded-lg bg-white overflow-y-auto lg:overflow-y-auto">
        <div className="flex flex-col w-full p-2 text-center">
          <h1 className="text-3xl font-bold">Jadwal Pengambilan Data</h1>
        </div>
        <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
          <span className="invisible">Order</span>
          <span className="sm:text-left text-right">Status</span>
          <span className="hidden md:grid">Tanggal</span>
          <span className="hidden sm:grid">Tempat</span>
        </div>
        <ul>
          {jadwal.map((order, id) => (
            <li
              key={id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
            >
              <div className="flex">
                <div className="bg-purple-100 p-3 rounded-lg"></div>
                <div className="pl-4">
                  <p className="text-gray-800 text-md font-semibold">
                    {order.activity}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 sm:text-left text-right">
                <span
                  className={
                    order.status == "Terjadwal"
                      ? "bg-green-200 p-2 rounded-lg"
                      : order.status == "Completed"
                      ? "bg-blue-200 p-2 rounded-lg"
                      : "bg-yellow-200 p-2 rounded-lg"
                  }
                >
                  {order.status}
                </span>
              </p>
              <p className="hidden md:flex">{order.date}</p>
              <div className="sm:flex hidden justify-between items-center">
                <p>{order.method}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopCards;
