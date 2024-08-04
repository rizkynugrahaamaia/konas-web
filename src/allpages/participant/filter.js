import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FileDownload from 'js-file-download';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'; 
import { useGetRegion, useGetStatus, downloadPrintPeserta, useGetParticipantList } from  '../../api/list-participant';
import PrintView from './print-view';
import Modal from '../../components/sweetalert';
import icons from '../../configs/icons';

import BottomFilter from './bottom-filter'

export default function Filter({
  head = [],
  presence = '',
  search = '',
  status = '',
  wilayah = {},
  setFinalSearch = () => {},
  setPresence = () => {},
  setSearch = () => {},
  setStatus = () => {},
  setWilayah = () => {}
}){

    const refPrint = useRef();
    const navigate = useNavigate();
    const [mobileFilter, setMobileFilter] = useState(false);
    const params = { page: 1, size: -1 };

    const { data: wilayahOptions, isFetching: wilayahFetching, isLoading: wilayahLoading, } = useGetRegion({}, { enabled: true })
    const { data: statusOptions, isFetching: statusFetching, isLoading: statusLoading, } = useGetStatus({}, { enabled: true })
    const { data: dataPrint } = useGetParticipantList({ ...params }, { enabled: true })

    const printnow = useReactToPrint({
      content: () => refPrint.current
    });

    const handlePrint = () => {
      printnow();
    }

    const handleDownload = () => {
      params.csv = true;
      downloadPrintPeserta(params, {
        onSuccess: (res) => {
          const data = res?.data;
          const binaryString = atob(data);
          const binaryLen = binaryString.length;
          const bytes = new Uint8Array(binaryLen);
          for (let i = 0; i < binaryLen; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          FileDownload(blob, `file_peserta.xlsx`);
        },
        onError: (err) => {
          Modal({
            title: 'Gagal!',
            text: err.message,
            icon: 'error',
        })
        },
      });
    };

    const kehadiranOptions = [
      { label: 'Semua', value: '' },
      { label: 'Hadir', value: 'hadir' },
      { label: 'Belum Hadir', value: 'belum_hadir' }
    ]
 
    wilayahOptions?.unshift({ label: 'Semua', value: '' });
    statusOptions?.unshift({ label: 'Semua', value: '' });

    return(
        <div>
        
           <div className="lg:flex lg:justify-between">

            <button 
              className="w-full text-white border bg-[#290849] p-2 rounded-md mb-4 flex lg:hidden justify-center"
              onClick={() => setMobileFilter(prev => !prev)}
            >
                <img alt="filter" src={icons.ic_filter}/>
            </button>
 

            <div className="flex items-end" style={{ gap: '8px' }}>
                <button 
                    className="w-full flex lg:w-24 text-[#ECB602] border border-[#ECB602] p-2 rounded-md h-10 items-center justify-center"
                    onClick={() => handleDownload()}
                >
                    <img alt="unduh" src={icons.download}/>
                    <p className="ml-2 mt-1">Unduh</p>
                </button>

                <button 
                    className="w-full flex lg:w-24 text-[#ECB602] border border-[#ECB602] p-2 rounded-md h-10 items-center justify-center"
                    onClick={() => handlePrint()}
                  >
                      <img alt="print" src={icons.print}/>
                      <p className="ml-2 mt-1">Print</p>
                </button>
            </div>

            <div className="hidden lg:flex" style={{ gap: '8px' }}>
              <div className="w-48">
                <label className="text-sm font-semibold">Wilayah</label>
                <Select
                    isLoading={wilayahFetching || wilayahLoading}
                    onChange={(e) => setWilayah(e)}
                    options={wilayahOptions}
                    placeholder="Pilih Wilayah"
                    value={wilayah}
                />
              </div>
              <div className="w-48">
                <label className="text-sm font-semibold">Kehadiran</label>
                <Select
                   isLoading={statusFetching || statusLoading}
                   onChange={(e) => setPresence(e)}
                   options={kehadiranOptions}
                   placeholder="Pilih Kehadiran"
                   value={presence}
                />
              </div>
              <div className="w-48">
                <label className="text-sm font-semibold">Peserta</label>
                <Select
                 isLoading={statusFetching || statusLoading}
                 onChange={(e) => setStatus(e)}
                 options={statusOptions}
                 placeholder="Pilih Peserta"
                 value={status}
                />
              </div>
             </div>


           </div>
       

            <hr className="my-4"/>

            <div className="flex flex-col md:flex-row justify-between mb-4">

                <button 
                 className="bg-[#ECB602] text-white p-2 rounded-md flex items-center justify-center"
                 onClick={() => navigate('/participant-add')}
                >
                    <img alt="add" src={icons.add}/>
                    <p className="ml-2">Tambah Peserta</p>
                </button>
        
                <div className="flex mt-4 md:mt-0" style={{ gap: "8px" }}>
                  <div className="flex w-full border border-gray-200 rounded-md p-2">
                    <img alt="search" src={icons.ic_search}/>
                    <input
                      className="focus:outline-none ml-2"
                      onChange={(e)=>setSearch(e.target.value)}
                      placeholder="Cari Peserta"
                      type="text"
                      value={search}
                  />
                  </div>
          
                  <button 
                    className="bg-[#ECB602] p-2 text-white rounded-md w-16"
                    onClick={() => setFinalSearch(search)}
                  >
                    Cari
                  </button>
                </div>

            </div>

            <BottomFilter 
               kehadiranOptions={kehadiranOptions}
               mobileFilter={mobileFilter}
               presence={presence}
               setMobileFilter={setMobileFilter}
               setPresence={setPresence}
               setStatus={setStatus}
               setWilayah={setWilayah}
               status={status}
               statusOptions={statusOptions}
               wilayah={wilayah}
               wilayahOptions={wilayahOptions}
            />

            <PrintView
              data={dataPrint}
              headers={head}
              ref={refPrint}
           />
   
        </div>

    )
}

Filter.propTypes = {
  head: PropTypes.array,
  presence: PropTypes.object,
  search: PropTypes.string,
  setFinalSearch: PropTypes.func,
  setPresence: PropTypes.func,
  setSearch: PropTypes.func,
  setStatus:  PropTypes.func,
  setWilayah: PropTypes.func,
  status: PropTypes.object,
  wilayah: PropTypes.object
};
