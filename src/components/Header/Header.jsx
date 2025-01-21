import React from 'react'
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch } from 'react-icons/hi'
import { Popover, PopoverButton, PopoverPanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate()

  return (
    <div
    className='bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200 shadow-sm'
    >
      <div className='relative drop-shadow-sm' >
        <HiOutlineSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'/>
        <input type="text" placeholder='Search...' className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-200 rounded-sm px-4 pl-11 pr-4'/>
      </div>
      <div className='flex items-center gap-2 mr-2'>
      <Popover className="relative">
          <PopoverButton className="p-1.5 rounded-lg inline-flex items-center text-sm/6 font-semibold text-gray-700 focus:outline-none data-[active]:bg-gray-100 data-[hover]:text-opacity-100 data-[active]:shadow ">
          <HiOutlineBell fontSize={24}/>
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="absolute right-0 z-10 mt-2.5 transform w-80 p-1"
          >
            <div className='bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5'>
              <strong className='text-gray-700 font-medium'>Notifications</strong>
              <div className='mt-2 py-1 text-sm'>
                This is the notification panel
              </div>
              <div className='mt-2 py-1 text-sm'>
                This is the notification panel
              </div>
            </div>
          </PopoverPanel>
      </Popover>
      <Menu as={"div"} className="relative">
        <div>
          <MenuButton className="inline-flex items-center rounded-full focus:outline-none hover:ring-2 hover:ring-gray-300 data-[active]:ring-gray-400">
            <span className='sr-only'>open user menu</span>
            <div className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                  style={{ backgroundImage: 'url("https://picsum.photos/80/80")' }}>
              <span className='sr-only'>Huge Jackson</span>
            </div>
          </MenuButton>
        </div> 
        <div>
          <MenuItems
            transition
            anchor="bottom end"
            className="flex flex-col  gap-0.5 origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <MenuItem>
              <button onClick={() => navigate("/profile")}
                className={classNames(
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200 hover:bg-gray-100'
										)}>Profile
              </button> 
            </MenuItem>
            <MenuItem>
              <button onClick={() => navigate("/settings")}
                className={classNames(
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200 hover:bg-gray-100'
										)}>Settings
              </button> 
            </MenuItem>
            <MenuItem>
              <button onClick={() => navigate("/logout")}
                className={classNames(
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200 hover:bg-gray-100'
										)}>Logout
              </button> 
            </MenuItem>
          </MenuItems>
        </div> 
      </Menu>
      </div>
    </div>
  )
}

export default Header