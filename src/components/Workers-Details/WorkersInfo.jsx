import React from 'react'
import { useReactTable, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table'
import { ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Mail, Phone, Search, User } from 'lucide-react'
import mockData from './data.json' 

const columnhelper = createColumnHelper()

const columns = [
    columnhelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className='flex items-center'>
                <User className="mr-2" size={16}/> ID
            </span>
        ),
    }),

    columnhelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className='flex items-center'>
                <User className="mr-2" size={16}/> Name
            </span>
        ),
    }),

    columnhelper.accessor("email", {
        id: "email",
        cell: (info) => (
            <span className='italic text-blue-600'>{info.getValue()}</span>
        ),
        header: () => (
            <span className='flex items-center'>        
                    <Mail className="mr-2" size={16}/> Email
            </span>
        ),
    }),

    columnhelper.accessor("phone", {
        cel: (info) => info.getValue(),
        header: () => (
            <span className='flex items-center'>
                <Phone className="mr-2" size={16}/> Phone
            </span>
        )
    })
]

const WorkersInfo = () => {
    const [data] = React.useState(() => [...mockData])
    const [sorting, setSorting] = React.useState([])
    const [globalFilter, setGlobalFilter] = React.useState("")

    const table = useReactTable({
    data,
    columns,
    state: {
        sorting,
        globalFilter,
    },
    initialState: {
        pagination: {
            pageSize: 5,
            pageIndex: 0,
        },
    },
    getCoreRowModel: getCoreRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  })

//    console.log(table.getRowModel().rows);
  
  return (
    <div className='flex flex-col min-h-screen max-w-full mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className='mb-2 relative'> 
            <input type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder='Search...' 
            className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm px-4 pl-11 pr-4 shadow-sm'
            />
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'/>
        </div>

        <div className='overflow-x-auto bg-white shadow-md rounded-lg '>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th 
                                key={header.id} 
                                className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ' >
                                    
                                    <div {...
                                        {
                                            className: header.column.getCanSort()
                                            ? "cursor-pointer select-none flex items-center"
                                            : "",
                                            onClick: header.column.getToggleSortingHandler(),
                                        }
                                    }>
                                        {
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                        <ArrowUpDown className='ml-2' size={14}/>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className='hover:bg-gray-50'>
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>

            </table>

        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700'>
            
            
            <div className='flex items-center mb-4 sm:mb-0'>
                <span className='mr-2'>Items per page</span>
                <select name="" id=""
                className='border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-400 outline-none'
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                    table.setPageSize(Number(e.target.value))

                }}
                >
                    {[5,10,20,30].map((pageSize) => (
                        <option key={pageSize} value={pageSize} className='rounded-sm'>{pageSize}</option>
                    ))}

                </select>

            </div>

            <div className='flex items-center space-x-2'>
                    <button
                    className='p-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50'
                    onClick={(e) => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronsLeft size={20}/>
                    </button>

                    <button
                    className='p-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50'
                    onClick={(e) => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft size={20}/>
                    </button>

                    <span className='flex items-center'>
                        <input type='number'
                        min={1}
                        max={table.getPageCount()}
                        value={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                            ? Math.max(0, Math.min(Number(e.target.value) - 1, table.getPageCount() - 1))
                            : 0;
                            table.setPageIndex(page)
                        }}
                        className='w-16 p-2 rounded-md border border-gray-300 text-center'
                        />
                        <span className='ml-1'>of {table.getPageCount()}</span>
                    </span>

                    <button
                    className='p-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50'
                    onClick={(e) => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight size={20}/>
                    </button>

                    <button
                    className='p-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50'
                    onClick={(e) => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    >
                        <ChevronsRight size={20}/>
                    </button>
            </div>

        </div>
                
    </div>
   

  )
}

export default WorkersInfo