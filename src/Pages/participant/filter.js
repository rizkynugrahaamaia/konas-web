import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'; 

import BottomFilter from './bottom-filter'

export default function Filter(){

    const [mobileFilter, setMobileFilter] = useState(false);
    const navigate = useNavigate();

    const wilayahOptions = [
      { label: 'I PAPUA', value: 'I PAPUA' },
      { label: 'II PAPUA', value: 'II PAPUA' }
    ]

    const kehadiranOptions = [
      { label: 'Hadir', value: 'Hadir' },
      { label: 'Belum Hadir', value: 'Belum Hadir' }
    ]

    const pesertaTypeOptions = [
      { label: ' Formal', value: 'Formal' },
      { label: 'Non Formal', value: 'Non Formal' }
    ]


    return(
        <div>

     
           <div className="lg:flex lg:justify-between">

            <button 
              className="w-full text-[#ECB602] border border-[#ECB602] p-2 rounded-md mb-4 block lg:hidden"
              onClick={() => setMobileFilter(prev => !prev)}
            >
              Filter
            </button>
 

            <div className="flex items-end" style={{ gap: '8px' }}>
                <button 
                    className="w-full lg:w-20 text-[#ECB602] border border-[#ECB602] p-2 rounded-md h-10">
                    Unduh
                </button>

                <button 
                    className="w-full lg:w-20 text-[#ECB602] border border-[#ECB602] p-2 rounded-md h-10">
                    Print
                </button>
            </div>

            <div className="hidden lg:flex" style={{ gap: '8px' }}>
              <div className="w-44">
                <label className="text-sm font-semibold">Wilayah</label>
                <Select
                    options={wilayahOptions}
                    placeholder="Pilih Wilayah"
                />
              </div>
              <div className="w-44">
                <label className="text-sm font-semibold">Kehadiran</label>
                <Select
                    options={kehadiranOptions}
                    placeholder="Pilih Kehadiran"
                />
              </div>
              <div className="w-44">
                <label className="text-sm font-semibold">Peserta</label>
                <Select
                    options={pesertaTypeOptions}
                    placeholder="Pilih Peserta"
                />
              </div>
             </div>


           </div>
       

            <hr className="my-4"/>

            <div className="flex flex-col md:flex-row justify-between mb-4">

                <button 
                 className="bg-[#ECB602] text-white p-2 rounded-md"
                 onClick={() => navigate('/participant-add')}
                >
                   Tambah Peserta
                </button>
        
                <div className="flex mt-4 md:mt-0" style={{ gap: "8px" }}>
                  <input
                    className="border border-gray-200 rounded-md p-2 focus:outline-none w-full"
                    onChange={()=>{}}
                    placeholder="Cari Peserta"
                    type="text"
                   value=""
                  />
                  <button className="bg-[#ECB602] p-2 text-white rounded-md w-16">
                    Cari
                  </button>
                </div>

            </div>

            <BottomFilter 
               mobileFilter={mobileFilter}
               setMobileFilter={setMobileFilter}
            />
   
        </div>

    )
}