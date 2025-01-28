import React from 'react'
import { FcBullish } from "react-icons/fc";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../lib/consts/Navigation';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';

const linkClass ='flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

function Sidebar() {
  return (
    <div className='bg-neutral-900 p-3 flex flex-col text-white w-[12rem] h-[fvh] overflow-x-auto'>
      <div className='flex items-center px-1 py-3 gap-2 '>
        {/* <FcBullish fontSize={24} /> */}
        <span className='text-neutral-100 text-md text-nowrap'>Admin Dashboard</span>
      </div>
      <div className='flex-1 py-6 gap-1 flex flex-col border-t border-neutral-700'>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item}/>
        ))}
      </div>
      <div className='flex flex-col gap-1 pt-2 border-t border-neutral-700'>
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div
          className={classNames( 'text-red-500 cursor-pointer', linkClass)}
        >
          <span className="text-xl"><HiOutlineLogout/></span>
          Logout
        </div>
      </div>
    </div>
  )
}

function SidebarLink({item}){
  const { pathname } = useLocation()

  return (
    <Link
			to={item.path }
      className={classNames( pathname === item.path?  'bg-neutral-700 text-white ' : 'text-neutral-400' ,linkClass)}
		>
			<span className="text-xl">{item.icon}</span>
			{item.label}
		</Link>
  )
}

export default Sidebar