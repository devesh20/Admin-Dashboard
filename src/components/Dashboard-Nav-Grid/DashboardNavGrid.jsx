import React from 'react'
import { MdDescription, MdOutlineInventory, MdTimeline } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';

function DashboardNavGrid() {
  const navigate = useNavigate()
  return (
    <div className='gap-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
        <button 
        onClick={() => {navigate('/inventory')}}
        >
            <BoxWrapper>
                <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500 shrink-0'>
                    <MdOutlineInventory className='text-2xl text-white'></MdOutlineInventory>
                </div>
                <div className='pl-6 '>
                    <strong className=' text-md text-gray-700 font-semibold'>Manage Inventory</strong>
                </div>
            </BoxWrapper>
        </button>
        <button onClick={() => {navigate('/production-progress')}}>
            <BoxWrapper>
                <div className='rounded-full h-12 w-12 flex items-center justify-center bg-orange-600 shrink-0'>
                    <HiOutlineChartBar className='text-2xl text-white'></HiOutlineChartBar>
                </div>
                <div className='pl-6'>
                    <strong className='text-md text-gray-700 font-semibold'>Production Progress</strong>
                </div>
            </BoxWrapper>
        </button>    
        <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400 shrink-0'>
                <MdDescription className='text-2xl text-white'></MdDescription>
            </div>
            <div className='pl-6 '>
                <strong className='text-md text-gray-700 font-semibold '>Casting Specification</strong>
            </div>
        </BoxWrapper>
        <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-green-600 shrink-0'>
                <MdTimeline className='text-2xl text-white'></MdTimeline>
            </div>
            <div className='pl-6'>
                <strong className='text-md text-neutral-700 font-semibold'>Monitor Casting</strong>
            </div>
        </BoxWrapper>
    
    </div>
  )
}

function BoxWrapper({ children }) {
	return (<div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center cursor-pointer shadow-sm active:bg-neutral-400/20 pr-4">{children}</div>)
}

export default DashboardNavGrid
