import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import { getLogged } from '../../utils/storage'
import { useLogout } from '../../api/auth';
import mainMenu from '../../pages/main-menu';
import icons from '../../configs/icons';

import styles from './styles.module.css'

export default function Component(){

  const logoutMutation = useLogout();
  const location = useLocation();
  const user = getLogged();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

 return (
  <nav className={styles.root}>

  <div className="w-full flex items-center mt-0 px-4 md:pl-0 shadow-md">
  
  <div className="flex md:hidden justify-between w-full">
    <button
          className="z-30 md:z-0"
          onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
        >
          <span className="bg-black w-5 h-[2px] flex mb-1"/>
          <span className="bg-black w-5 h-[2px] flex mb-1"/>
          <span className="bg-black w-5 h-[2px] flex mb-1"/>
      </button>

      <div className="text-[#ECB602] font-bold text-3xl">
        Konas
      </div>
  </div>


    <div className="bg-[#290849] h-full px-[62.3px] text-center items-center text-[#ECB602] font-bold text-3xl hidden md:flex">
      Konas
    </div>

  
    <div className="w-full hidden md:flex justify-between px-8">
      <div className="text-base font-bold">
        Halo, {user?.fullname}
      </div>
      <div
        className="cursor-pointer flex"
        onClick={() => logoutMutation.mutate()}
       >
        <img alt="logout" src={icons.logout} />
        <p className="ml-2 font-semibold">Logout</p>
      </div>
    </div>
  
  </div>

  <div className={mobileMenuVisible ? 'opacity-10 bg-black  absolute top-0 left-0 right-0 bottom-0 h-[150vh]' : ''}/>
  
  <div className={mobileMenuVisible ? styles.mobileMenuVisible : ''}>
    <div className="text-center items-center text-[#ECB602] font-bold text-3xl">
      Konas
    </div>
    <h1 className='text-center text-lg mt-2'>{user?.fullname}</h1>
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
                <div className="flex">
                  <img alt="icon_menu" src={m.icon} />
                  <span className="text-white ml-2">{m.label}</span>
                </div>
          </Link>
        </li>
      )
    })}
    <li className="flex p-4" onClick={() => logoutMutation.mutate()}>
      <img alt="logout" src={icons.logout_white} />
      <span className="text-white ml-2">Logout</span>
    </li>
    </ul>
  </div>


</nav>
);
}