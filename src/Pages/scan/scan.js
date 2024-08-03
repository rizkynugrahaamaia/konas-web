import React, { useState } from 'react';

import illustrations from '../../configs/illustration';
import QrScan from './scan-qr-code';

export default function Scan(){

    const [view, setView] = useState({ status: 1 });
    const [qrVisible, setQrVisible] = useState(null);

    const ViewA = () => <>
                <img alt="scan" src={illustrations.scan}/>
                <p className="text-sm md:text-xl mt-3 md:mt-16">Silakan Melakukan Scan</p>
                <p className="text-sm md:text-xl mt-1 md:mt-4 text-center">Anda dapat melakukan scan Kehadiran atau profile peserta</p>
                <div className="mt-3 md:mt-16 flex flex-col md:flex-row gap-2 md:gap-8 w-full justify-center">
                    <button
                      className="bg-[#290849] w-full md:w-60 p-2 md:p-3 rounded-md text-white text-sm md:text-xl font-semibold"
                      onClick={() => setQrVisible({ 
                        open: true,
                        type: 'presence'
                       })}
                    >
                        Scan Kehadiran
                    </button>
                    <button
                      className="bg-[#290849] w-full md:w-60 p-2 md:p-3 rounded-md text-white text-sm md:text-xl font-semibold"
                      onClick={() => setQrVisible({ 
                        open: true,
                        type: 'profile'
                       })}
                    >
                        Scan Profile
                    </button>
                </div>
     </>;
    
    const ViewB = () => <>
                <img alt="scan" src={illustrations.success_scan}/>
                <p className="text-sm md:text-xl mt-3 md:mt-16">Berhasil Absen!</p>
                <p className="text-sm md:text-xl mt-1 md:mt-4 text-center">Peserta Telah Berhasil di Absen</p>
                <div className="mt-3 md:mt-16 flex flex-col md:flex-row gap-2 md:gap-8 w-full justify-center">
                    <button
                      className="bg-[#290849] w-full md:w-60 p-2 md:p-3 rounded-md text-white text-sm md:text-xl font-semibold"
                      onClick={() => {
                        setView({
                            status: 1
                        });
                      }}
                    >
                        Kembali
                    </button>
                </div>
    </>;

    const ViewC = () => <>
                <p className="text-sm md:text-xl mt-3 md:mt-16">Gagal Scan!</p>
                <p className="text-sm md:text-xl mt-1 md:mt-4 text-center">{view?.message || 'Terjadi Kesalahan'}</p>
                <div className="mt-3 md:mt-16 flex flex-col md:flex-row gap-2 md:gap-8 w-full justify-center">
                    <button
                    className="bg-[#290849] w-full md:w-60 p-2 md:p-3 rounded-md text-white text-sm md:text-xl font-semibold"
                    onClick={() => {
                        setView({
                            status: 1
                        });
                    }}
                    >
                        Kembali
                    </button>
                </div>
    </>;


    return(
        <>
            <p className="ml-2 md:ml-6 mb-2 md:mb-0 text-2xl font-semibold">Scan</p>
            <div
             className='bg-[#F6F6F6] px-6 py-4  md:py-24 md:m-6 md:rounded-md shadow-lg flex flex-col justify-center items-center max-h-screen'
            >
                 {view.status === 1 && <ViewA />}
                 {view.status === 2 && <ViewB />}
                 {view.status === 3 && <ViewC />}

                 <QrScan
                    qrVisible={qrVisible}
                    setView={setView}
                    setVisible={setQrVisible}
                /> 

            </div>
        </>
        )

}