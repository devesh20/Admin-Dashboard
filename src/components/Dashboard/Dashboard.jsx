import React from 'react'
import { Link } from 'react-router-dom';
import DashboardNavGrid from '../Dashboard-Nav-Grid/DashboardNavGrid';
import RejectionChart from '../Rejection-Chart/RejectionChart';
import RejectionByCause from '../Rejection-Chart/RejectionByCause';
import PopularProducts from '../Popular-Products/PopularProducts';
import TrackUsage from '../Track-Usage/TrackUsage';

export default function Dashboard() {
    // console.log("Dashboard is rendering");
    
  return (
    <div className='flex flex-col gap-4 w-full overflow-hidden bg-fixed '>
        <DashboardNavGrid/>
        <div className='flex flex-col md:flex-row gap-4 w-full'>
            <RejectionChart/>
            <RejectionByCause/>
        </div>
        <div className='flex flex-row gap-4 w-full'>
            <TrackUsage/>
            {/* <PopularProducts/> */}
        </div>
        {/* <Link
        to={"/products"}
        className=''
        >Go to Product page</Link> */}
    </div>
  )
}
