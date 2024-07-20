import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import { useLogout } from '../../api/auth';
import mainMenu from '../../pages/main-menu';

import styles from './styles.module.css'

export default function Component(){

  const logoutMutation = useLogout();
  const location = useLocation();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

 return (
  <nav className={styles.root}>

  <div className="w-full flex items-center mt-0 pl-4 md:pl-0">
  
    <button
        className="block md:hidden z-30 md:z-0"
        onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
      >
        <span className="bg-black w-5 h-[2px] flex mb-1"/>
        <span className="bg-black w-5 h-[2px] flex mb-1"/>
        <span className="bg-black w-5 h-[2px] flex mb-1"/>
    </button>

    <div className="bg-[#290849] h-full px-[62.3px] text-center items-center text-[#ECB602] font-bold text-3xl hidden md:flex">
      Konas
    </div>
  
    <div className="w-full hidden md:flex justify-between px-8">
      <div>
        Halo, User
      </div>
      <div
        className="cursor-pointer"
        onClick={() => logoutMutation.mutate()}
       >
        Keluar
      </div>
    </div>
  
  </div>

  <div className={mobileMenuVisible ? 'opacity-10 bg-black  absolute top-0 left-0 right-0 bottom-0 h-[150vh]' : ''}/>
  
  <div className={mobileMenuVisible ? styles.mobileMenuVisible : ''}>
    <div className="text-center items-center text-[#ECB602] font-bold text-3xl">
      Konas
    </div>
    <h1 className='text-center text-lg mt-2'>User</h1>
    <ul className="mt-4">

    {mainMenu.map((m) => {
    const isActive = m.path === location.pathname ;

      return (
       <li 
         className={`${isActive && 'bg-[#55185D]'} p-4`} 
         key={m.path}>
          <Link
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            to={m.path}
          >
              <span>{m.label}</span>
          </Link>
        </li>
      )
    })}
    </ul>
  </div>


</nav>
);
}