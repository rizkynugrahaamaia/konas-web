import React from 'react'
import { useNavigate } from 'react-router-dom';

import Form from '../../../forms/participant-form';
import Modal from '../../../components/sweetalert';
import icons from '../../../configs/icons'
import { useCreatePeserta, useGetRegion, useGetStatus  } from '../../../api/list-participant';

export default function Component(){

    const navigate = useNavigate();

    const { data: wilayahOptions,  isLoading: wilayahLoading, } = useGetRegion({}, { enabled: true })
    const { data: statusOptions, isLoading: statusLoading, } = useGetStatus({}, { enabled: true })

    const { mutate: addPeserta, isLoading: addLoading } = useCreatePeserta();

    const handleSubmit = (values) => {
        const payload = {
            ...values,
            region: values?.region?.value,
            status: values?.status?.value,
        }
        addPeserta(payload,
          {
            onSuccess: () => {
                Modal({
                    allowOutsideClick: false,
                    title: 'Berhasil!',
                    text: 'Data telah ditambahkan',
                    icon: 'success',
                    onConfirm: () => navigate('/')
                })
            },
            onError: () => {
                Modal({
                    allowOutsideClick: false,
                    title: 'Gagal!',
                    text: 'Data gagal ditambahkan.',
                    icon: 'error',
                    onConfirm: () => navigate('/')
                })
            }
          },
        );
      };

    return(
        <>
        <div className="ml-4 flex cursor-pointer" onClick={() => navigate('/')}>
            <img alt="arrow_back" src={icons.arrow_back}/>
            <h1 className="ml-2 text-2xl font-medium">Kembali</h1>
        </div>
  
        <div className='bg-white p-6 m-6 overflow-auto rounded-md shadow-md'>
           <h1 className='text-2xl font-semibold mb-4'>Tambah Peserta</h1>
           <Form
              isLoading={addLoading}
              onSubmit={handleSubmit}
              statusLoading={statusLoading}
              statusOptions={statusOptions}
              wilayahLoading={wilayahLoading}
              wilayahOptions={wilayahOptions}
           />
        </div>
        </>
    )
}