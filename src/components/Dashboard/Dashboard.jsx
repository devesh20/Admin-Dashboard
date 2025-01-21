import React from 'react'
import { Link } from 'react-router-dom';
import DashboardNavGrid from '../Dashboard-Nav-Grid/DashboardNavGrid';
import RejectionChart from '../Rejection-Chart/RejectionChart';
import RejectionByCause from '../Rejection-Chart/RejectionByCause';
import RecentOrders from '../Recent-Orders/RecentOrders';
import PopularProducts from '../Popular-Products/PopularProducts';

export default function Dashboard() {
    // console.log("Dashboard is rendering");
    
  return (
    <div className='flex flex-col gap-4'>
        <DashboardNavGrid/>
        <div className='flex flex-row gap-4 w-full'>
            <RejectionChart/>
            <RejectionByCause/>
        </div>
        <div className='flex flex-row gap-4 w-full'>
            <RecentOrders/>
            <PopularProducts/>
        </div>
        {/* <Link
        to={"/products"}
        className=''
        >Go to Product page</Link> */}
    </div>
  )
}
