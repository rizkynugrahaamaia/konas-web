import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// import { useGetParticipantList } from  '../../api/list-participant';
import Modal from '../../components/sweetalert';
import Table from '../../components/table';
import Filter from './filter';
import QrScan from './scan-qr-code';   

export default function MainPage(){

    const [qrVisible, setQrVisible] = useState(false)
    const navigate = useNavigate();

    const head = [
        {
            label: 'Nama',
            key: 'name'
        },
        {
            label: 'Wilayah',
            key: 'region'
        },
        {
            label: 'Status Kehadiran',
            key: 'presence'
        },
        {
            label: 'Status Peserta',
            key: 'participant_status'
        },
        {
            label: 'Action',
            key: 'action'
        }
    ]


    // const { data, isFetching, isLoading, isError } = useGetParticipantList()

    //   if(isFetching || isLoading) {
    //     return '...isLoading'
    //   }

    //   if(isError){
    //     return 'Error'
    //   }

    const data = [
            {
                name: 'Rizky Nugraha Amaia',
                region: 'Indonesia Timur',
                presence: false,
                participant_status: 'formal',
            },
            {
                name: 'Ryan Alfaro',
                region: 'Kalimantan Barat',
                presence: true,
                participant_status: 'non_formal',
            },
            {
                name: 'Harley Luphin',
                region: 'I Papua',
                presence: true,
                participant_status: 'non_formal',
            },
            {
                name: 'Rizky Nugraha Amaia',
                region: 'Indonesia Timur',
                presence: false,
                participant_status: 'formal',
            },
            {
                name: 'Rizky Nugraha Amaia',
                region: 'Indonesia Timur',
                presence: false,
                participant_status: 'formal',
            },
    ]

    const modalDelete = () => {
        Modal({
            title: 'Example',
            text: 'Swal injected',
            icon: 'success',
            showCancelButton: true,
        })
    }

    return(
        <div className='bg-white p-6 m-6 rounded-md shadow-md'>
                {/* <button 
                      className="bg-sky-600 p-2 rounded-md text-white" 
                      onClick={() => setQrVisible(prev => !prev)}
                    >
                       Scan
                </button> */}
            <Filter />
            <Table
                data={data?.map((dt) => ({
                 ...dt,
                 presence: (
                    <div>{dt.presence ? 'Hadir' : 'Belum Hadir'}</div>
                 ),
                 action: (
                    <div className="flex" style={{ gap: '8px' }}>
                      <button 
                        className="p-2 rounded-md text-[#ECB602] w-16 border border-[#ECB602] bg-white" 
                        onClick={() => navigate('/participant-details/1')}
                      >
                         Detail
                      </button>
                      <button 
                        className="p-2 rounded-md text-[#ECB602] w-16 border border-[#ECB602] bg-white" 
                        onClick={() => navigate('/participant-edit/1')}
                      >
                         Edit
                      </button>
                      <button 
                        className="p-2 rounded-md text-[#ECB602] w-16 border border-[#ECB602] bg-white" 
                        onClick={() => modalDelete()}
                      >
                         Hapus
                      </button>
                     </div>
                 
                 )
                }))}
                head={head}
                pagination={{
                    page: 1,
                    totalPage: 1,
                    totalData: 5,
                    totalDataOnPage: 5,
                }}
            />
        
            <QrScan
              navigate
              open={qrVisible}
              setVisible={setQrVisible}
            />
        {/* {qrVisible ? (
            <div className={styles['qr_root']}>
                <QrReader
                    delay={100}
                    style={{
                        height: 240,
                        width: 320,
                    }}
                    onError={() => {}}
                    onScan={(e)=> handleScan(e)}
                />
            </div>
        ) : null} */}
        </div>
    )
}