import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useDeletePeserta, useGetParticipantList } from  '../../api/list-participant';
import Modal from '../../components/sweetalert';
import Table from '../../components/mytable';
import Filter from './filter';
import icons from '../../configs/icons';

export default function MainPage(){
    
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [finalSearch, setFinalSearch] = useState('');
    const [wilayah, setWilayah] = useState({ label: 'Semua', value: '' });
    const [status, setStatus] =  useState({ label: 'Semua', value: '' });
    const [presence, setPresence] =  useState({ label: 'Semua', value: '' });

    const head = [
        {
            label: 'Nama',
            key: 'fullname'
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
            key: 'status'
        },
        {
            label: 'Action',
            key: 'action'
        }
    ]

    const { data, isFetching, isLoading, isError } = useGetParticipantList({
        page: 1,
        size: 10,
        search: finalSearch,
        region: wilayah?.value || '',
        status: status?.value || '',
        ...( presence?.value && { presence: presence?.value === 'hadir' })
    }, { enabled: true })
    

    const { mutate: removePeserta } = useDeletePeserta();
    const queryClient = useQueryClient();

      if(isFetching || isLoading) {
        return '...isLoading'
      }

      if(isError){
        return 'Error'
      }

    const modalDelete = {
      popup: (data) => (
            Modal({
                confirmButtonText: 'Hapus',
                icon: 'warning',
                showCancelButton: true,
                title: 'Hapus',
                text: `Apakah anda yakin ingin menghapus ${data.fullname} ?`,
                onConfirm: () => modalDelete.api(data.userId)
            })
        ),
        api: (id) => (
            removePeserta(id,
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['get-participant-list'] });
                      Modal({
                          title: 'Berhasil!',
                          text: 'Data telah dihapus.',
                          icon: 'success',
                      })
                  },
                  onError: () => {
                      Modal({
                          title: 'Gagal!',
                          text: 'Data gagal dihapus.',
                          icon: 'error',
                      })
                  }
                },
              )
        )
    }

    return(
        <>
            <p className="ml-2 md:ml-6 mb-6 md:mb-0 text-2xl font-semibold">Peserta</p>
            <div className='bg-white p-6 md:m-6 md:rounded-md shadow-md'>
            <Filter
                head={head}
                presence={presence}
                search={search}
                setFinalSearch={setFinalSearch}
                setPresence={setPresence}
                setSearch={setSearch}
                setStatus={setStatus}
                setWilayah={setWilayah}
                status={status}
                wilayah={wilayah}
            />
            <Table
                data={data?.map((dt) => ({
                 ...dt,
                 presence: (
                    <div>{
                        dt.presence ? 
                        <div className="bg-[#E1F4EC] flex rounded-xl w-32 p-1 justify-center border-2 border-[#98D4B7]">
                            <img alt="delete" src={icons.circle_success}/>
                            <p className="text-[#04763F] ml-1">Hadir</p>
                        </div> : 
                        <div className="bg-[#FCE4E1] flex rounded-xl w-32 p-1 justify-center border-2 border-[#F3A096]">
                            <img alt="delete" src={icons.circle_failed}/>
                            <p className="text-[#B31500] ml-1">Belum Hadir</p>
                        </div>
                        }
                    </div>
                 ),
                 action: (
                    <div className="flex" style={{ gap: '8px' }}>
                      <button 
                        className="flex-shrink-0 p-2 rounded-md text-[#ECB602] w-auto border border-[#ECB602] bg-white" 
                        onClick={() => navigate(`/participant-details/${dt.userId}`)}
                      >
                        <img alt="detail" src={icons.detail}/>
                      </button>
                      <button 
                        className="flex-shrink-0 p-2 rounded-md text-[#ECB602] w-auto border border-[#ECB602] bg-white" 
                        onClick={() => navigate(`/participant-edit/${dt.userId}`)}
                      >
                        <img alt="edit" src={icons.edit}/>
                      </button>
                      <button 
                        className="flex-shrink-0 p-2 rounded-md text-[#ECB602] w-auto border border-[#ECB602] bg-white" 
                        onClick={() => modalDelete.popup(dt)}
                      >
                         <img alt="delete" src={icons.delete}/>
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
        </div>
        </>

    )
}