import React from "react";
import Head from "next/head";
import Image from "next/image";
import useGetValue from "../hook/getValue";
import logo from "../picture/image_3.png";
import Link from "next/link";

const Header = ({ title }) => {
  const user = useGetValue("users");
  const data = Object.values(user.snapshot || {});
  const snap = user.snapshot;
  // console.log({data})

  const defaultTitle = "Hospital";
  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="flex justify-between px-4 pt-2 items-center">
        <Link href="/">
          <Image src={logo} width={200} height={200} alt="" priority />
        </Link>
        <div className="h-auto mr-2">
          <h2 className="text-sm">Selamat Datang, </h2>
          <div>
            {data.map((item) => {
              return (
                <Link href="/profil">
                  <div key={item.nama}>
                    <h1 className=" font-semibold text-2xl">{item.name}</h1>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
