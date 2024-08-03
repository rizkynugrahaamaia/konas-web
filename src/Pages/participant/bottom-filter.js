import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { BottomSheetFilter } from '../../components/bottom-sheet-menu';

export default function BottomMenu(props){

    const { 
      kehadiranOptions,
      mobileFilter,
      presence,
      setMobileFilter,
      setPresence,
      setStatus,
      setWilayah,
      status,
      statusOptions,
      wilayah,
      wilayahOptions
    } = props;

    const [regional, setRegional] = useState(wilayah);
    const [type, setType] = useState(status);
    const [kehadiran, setKehadiran] = useState(presence);

    const handleTerapkan = () => {
      setWilayah(regional);
      setPresence(kehadiran);
      setStatus(type);
      setMobileFilter(prev => !prev)
    }

    const handleReset = () => {
      setRegional({ label: 'Semua', value: '' });
      setKehadiran({ label: 'Semua', value: '' });
      setType({ label: 'Semua', value: '' });
    }

    const handleDismiss = () => {
      setRegional(wilayah);
      setKehadiran(presence);
      setType(status);
      setMobileFilter(prev => !prev)
    }

    return(
          <BottomSheetFilter
            onDismiss={() => { handleDismiss()}}
            visible={mobileFilter}
           > 
           
           <div className="flex justify-between mb-2">
            <div className="text-base font-bold">
              Filter
            </div>
            <div
              className="text-[#290849] text-base font-semibold"
              onClick={() => handleReset()}
            >
              Reset
            </div>
          </div>

          <hr />


          <div className="max-h-60 overflow-y-auto">
            <div className="mt-4">
              <div className="font-semibold text-sm mb-3">Wilayah</div>
              <div className="flex flex-wrap" style={{ gap: '12px' }}>
                {wilayahOptions?.map( (item, key) => (
                  <button
                    className={`border border-[#ECB602] p-2 rounded-xl cursor-pointer ${regional?.value === item?.value ? 'bg-[#ECB602] text-white' : ''}`}
                    key={key}
                    onClick={() => { setRegional(item); }}
                  >
                    <div className="text-sm">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="font-semibold text-sm mb-3">Kehadiran</div>
              <div className="flex" style={{ gap: '12px' }}>
                {kehadiranOptions?.map( (item, key) => (
                  <button
                    className={`border border-[#ECB602] p-2 rounded-xl cursor-pointer ${kehadiran?.value === item?.value ? 'bg-[#ECB602] text-white' : ''}`}
                    key={key}
                    onClick={() => { setKehadiran(item); }}
                  >
                    <div className="text-sm">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="font-semibold text-sm mb-3">Peserta</div>
              <div className="flex" style={{ gap: '12px' }}>
                {statusOptions?.map( (item, key) => (
                  <button
                  className={`border border-[#ECB602] p-2 rounded-xl cursor-pointer ${type?.value === item?.value ? 'bg-[#ECB602] text-white' : ''}`}
                    key={key}
                    onClick={() => { setType(item); }}
                  >
                    <div className="text-sm">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>


            <button 
              className="bg-[#290849] rounded-md text-white p-2 w-full mt-4"
              onClick={() => handleTerapkan()}
             >
              Terapkan
            </button>

         </BottomSheetFilter>
    )
}

  BottomMenu.propTypes = {
    kehadiranOptions: PropTypes.array.isRequired,
    mobileFilter: PropTypes.bool.isRequired,
    presence: PropTypes.object.isRequired,
    setMobileFilter: PropTypes.func.isRequired,
    setPresence: PropTypes.func.isRequired,
    setStatus: PropTypes.func.isRequired,
    setWilayah: PropTypes.func.isRequired,
    status: PropTypes.object.isRequired,
    statusOptions: PropTypes.array.isRequired,
    wilayah: PropTypes.object.isRequired,
    wilayahOptions: PropTypes.array.isRequired
  };
  