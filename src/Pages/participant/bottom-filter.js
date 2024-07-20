import React from 'react';
import PropTypes from 'prop-types';

import { BottomSheetFilter } from '../../components/bottom-sheet-menu';

export default function BottomMenu(props){

    const { mobileFilter, setMobileFilter } = props;

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
          <BottomSheetFilter
            onDismiss={() => { setMobileFilter((prev) => !prev)}}
            visible={mobileFilter}
           > 
          <div className="flex justify-between mb-2">
            <div className="text-base font-bold">
              Filter
            </div>
            <div
              className="text-[#3088C8] text-base font-semibold"
              onClick={() => {}}
            >
              Reset
            </div>
          </div>

          <hr />

          <div className="mt-4">
            <div className="font-semibold text-sm mb-3">Wilayah</div>
            <div className="flex" style={{ gap: '12px' }}>
              {wilayahOptions?.map( (item, key) => (
                <button
                  className="border border-[#ECB602] p-2 rounded-xl cursor-pointer bg-[#ECB602] text-white" 
                  key={key}
                  onClick={() => {}}
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
                  className="border border-[#ECB602] p-2 rounded-xl cursor-pointer"
                  key={key}
                  onClick={() => {}}
                >
                   <div className="text-sm">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="font-semibold text-sm mb-3">Peserta</div>
            <div className="flex" style={{ gap: '12px' }}>
              {pesertaTypeOptions?.map( (item, key) => (
                <button
                  className="border border-[#ECB602] p-2 rounded-xl cursor-pointer"
                  key={key}
                  onClick={() => {}}
                >
                   <div className="text-sm">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

         </BottomSheetFilter>
   </div>

    )
}

BottomMenu.defaultProps = {

};
  
  BottomMenu.propTypes = {
    mobileFilter: PropTypes.bool.isRequired,
    setMobileFilter: PropTypes.func.isRequired,
  };
  