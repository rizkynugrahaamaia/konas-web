import React from 'react'
import { QRCodeSVG } from 'qrcode.react';

export default function Component(){
    return(
        <div className='bg-white p-6 m-6 overflow-auto rounded-md shadow-md'>
           <h1 className='text-2xl font-semibold mb-4'>Participant Details</h1>
            <div className='p-4 grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className=''>
                    <div className='border-b-2'>
                        <p className="text-gray-400 text-sm mb-2">Nama</p>
                        <p className='text-gray-900 font-semibold'>Rizky Nugraha Amaia</p>
                    </div>
                    <div className='border-b-2 mt-8'>
                        <p className="text-gray-400 text-sm mb-2">NIK</p>
                        <p className='text-gray-900 font-semibold'>7371101</p>
                    </div>
                    <div className='border-b-2 mt-8'>
                        <p className="text-gray-400 text-sm mb-2">Jenis Kelamin</p>
                        <p className='text-gray-900 font-semibold'>Pria</p>
                    </div>
                    <div className='border-b-2 mt-8'>
                        <p className="text-gray-400 text-sm mb-2">Kota</p>
                        <p className='text-gray-900 font-semibold'>Jayapura</p>
                    </div>
                </div>
                <div className=''>
                    <div className='border-b-2'>
                        <p className="text-gray-400 text-sm mb-2">Alamat</p>
                        <p className='text-gray-900 font-semibold'>Jl. Penghibur</p>
                    </div>
                    <div className='mt-8 row-span-3'>
                        <p className="text-gray-400 text-sm mb-2">Qr Code</p>
                        {/* <div className=''> */}
                            <div className='border-2 p-4 mx-auto md:mx-0' style={{ width: '220px' }}>
                                <QRCodeSVG size={180} value="https://reactjs.org/" />
                            </div>
                  
                        {/* </div> */}
                    </div>
                </div>
       
            </div>

        </div>
    )
}