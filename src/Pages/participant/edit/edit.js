import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import Form from '../../../forms/participant-form';
import Modal from '../../../components/sweetalert'
import icons from '../../../configs/icons'
import { useGetDetail, useGetStatus, useGetRegion, useUpdatePeserta } from '../../../api/list-participant';;


export default function Component(){

    const navigate = useNavigate();
    const { id } = useParams();

    const { data: detailData, isLoading: detailLoading } = useGetDetail(id, {}, { enabled: true })
    const { data: statusOptions, isLoading: statusLoading, } = useGetStatus({}, { enabled: true })
    const { data: wilayahOptions,  isLoading: wilayahLoading, } = useGetRegion({}, { enabled: true })

    const { mutate: editPeserta, isLoading: editLoading } = useUpdatePeserta();

    const handleSubmit = (values) => {
        const payload = {
            ...values,
            region: values?.region?.value,
            status: values?.status?.value,
            password: values?.username
        }
        editPeserta(payload,
          {
            onSuccess: () => {
                Modal({
                    allowOutsideClick: false,
                    title: 'Berhasil!',
                    text: 'Data telah diubah.',
                    icon: 'success',
                    onConfirm: () => navigate('/')
                })
            },
            onError: () => {
                Modal({
                    allowOutsideClick: false,
                    title: 'Gagal!',
                    text: 'Data gagal diubah.',
                    icon: 'error',
                    onConfirm: () => navigate('/')
                })
            }
          },
        );
      };


    if(detailLoading){ return 'Loading...';}

    return(
        <>
            <div className="ml-4 flex cursor-pointer" onClick={() => navigate('/')}>
                <img alt="arrow_back" src={icons.arrow_back}/>
                <h1 className="ml-2 text-2xl font-medium">Kembali</h1>
            </div>
            <div className='bg-white p-6 m-6 overflow-auto rounded-md shadow-md'>
            <h1 className='text-2xl font-semibold mb-4'>Edit Peserta</h1>
                <Form
                    defaultValues={{
                        fullname: detailData?.fullname,
                        username: detailData?.username,
                        birthday: detailData?.birthday,
                        status: detailData && statusOptions ? statusOptions.filter(item => item.label === detailData['status']) : [],
                        region: detailData && wilayahOptions ? wilayahOptions.filter(item => item.label === detailData['region']) : [],
                        roomMeet: detailData?.roomMeet,
                        flight: detailData?.flight,
                        roomStay: detailData?.roomStay,
                        }}
                    isEdit={true}
                    isLoading={editLoading}
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