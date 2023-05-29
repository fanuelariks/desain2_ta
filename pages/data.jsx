import React from "react";
import Head from "next/head.js";
import Header from "../components/Header.jsx";
import { FaShoppingBag } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { data, histori } from "../data/data.js";
import BarChart from "../components/BarChart.jsx";
import CatChart from "../components/CatChart.jsx";
import withProtected from "../hoc/withProtected.js";

const Data = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div>
          <Header title="Data" />
        </div>
        <div className="grid lg:grid-cols-5 gap-4 p-4">
          <div className="lg:col-span-2 w-full m-auto lg:h-[40vh] h-[40vh] p-4 border rounded-lg bg-white overflow-y-auto lg:overflow-y-auto">
            <div className="flex flex-col text-center w-full p-2">
              <h1 className="text-3xl font-bold">Histori Pengambilan Data</h1>
            </div>
            <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
              <span className="invisible">Order</span>
              <span className="sm:text-left text-right">Status</span>
              <span className="hidden md:grid">Tanggal</span>
              <span className="hidden sm:grid">Tempat</span>
            </div>
            <ul>
              {histori.map((order, id) => (
                <li
                  key={id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                >
                  <div className="flex">
                    <div className="bg-purple-100 p-3 rounded-lg">
                    </div>
                    <div className="pl-4">
                      <p className="text-gray-800 text-md font-semibold">
                        {order.activity}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 sm:text-left text-right">
                    <span
                      className={
                        order.status == "Diproses"
                          ? "bg-green-200 p-2 rounded-lg"
                          : order.status == "Diterima"
                          ? "bg-blue-200 p-2 rounded-lg"
                          : "bg-red-200 p-2 rounded-lg"
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
          <div className="lg:col-span-3">
            <BarChart />
          </div>
          <div className="lg:col-span-3">
            <CatChart />
          </div>
          <div className="lg:col-span-2 w-full m-auto lg:h-[40vh] h-[40vh] p-4 border rounded-lg bg-white overflow-y-auto lg:overflow-y-auto">
            <div className="flex flex-col w-full text-center p-2">
              <h1 className="text-3xl font-bold">Jadwal Pengambilan Data</h1>
            </div>
            <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
              <span className="invisible">Order</span>
              <span className="sm:text-left text-right">Status</span>
              <span className="hidden md:grid">Tanggal</span>
              <span className="hidden sm:grid">Tempat</span>
            </div>
            <ul>
              {data.map((order, id) => (
                <li
                  key={id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                >
                  <div className="flex">
                    <div className="bg-purple-100 p-3 rounded-lg">
                    </div>
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
      </div>
    </>
  );
};

export default withProtected(Data);
