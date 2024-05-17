import React from 'react'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

function NavBar() {
  return (
    <nav className='h-16 w-full flex flex-row'>
      <div className='width-primary m-auto h-full flex flex-row justify-between items-center'>
        <div className='navbar_logo'>
          <a href="/" className='navbar_logo'>
            <Image
              src="/assets/images/sgt-logo.png"
              alt="canh-dong-quat-gio"
              // width={144}
              // width={164}
              width={200}
              height={0}
            />
          </a>
        </div>
        <div className='w-full flex justify-end items-center gap-5 text-sm font-medium'>
          <a href="/" className='flex flex-row gap-1.5 justify-center items-center'>
            <FontAwesomeIcon className='text-sm text-gray-400' icon={['fas', 'phone']} />
            <p>0916 938 824</p>
          </a>
          <a href="/" className='flex flex-row gap-1.5 justify-center items-center'>
            <FontAwesomeIcon className='text-sm text-gray-400' icon={['fas', 'envelope']} />
            <p>info@saigontimestravel.com</p>
          </a>
          <a href="/" className='flex flex-row gap-1.5 justify-center items-center px-4 py-2 border rounded-lg border-sgt-primary-default'>
            <FontAwesomeIcon className='text-yellow-400' icon={['fas', 'user-circle']} />
            <p className='font-bold'>Tài khoản</p>
          </a>
        </div>
      </div >
    </nav >
  )
}

export default NavBar