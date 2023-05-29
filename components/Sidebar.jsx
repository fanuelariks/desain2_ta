import React from 'react';
import Link from 'next/link';
import { RxPerson } from 'react-icons/rx';
import { BsClipboardData, BsMic } from "react-icons/bs";
import { FiHome, FiLogOut } from 'react-icons/fi';
import { SignOut } from '../firebase/firebase';
import { Button } from '@mui/material';

const Sidebar = ({ children }) => {
  return (
    <div className='flex'>
      <div className='fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
        <div className='flex flex-col items-center'>
          <Link href='/'>
            <div className='bg-blue-900 text-white p-3 rounded-lg inline-block'>
              <FiHome size={20} />
            </div>
          </Link>
          <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
          <Link href='/profil'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <RxPerson size={20} />
            </div>
          </Link>
          <Link href='/data'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <BsClipboardData size={20} />
            </div>
          </Link>
          <Link href='/AmbilData'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <BsMic size={20} />
            </div>
          </Link>
          <Button onClick={SignOut}>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <FiLogOut size={20} className='text-red-600' />
            </div>
          </Button>
        </div>
      </div>
      <main className='ml-20 w-full'>{children}</main>
    </div>
  );
};

export default Sidebar;
