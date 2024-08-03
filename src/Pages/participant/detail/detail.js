import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

import { getLogged } from '../../../utils/storage';
import Form from '../../../forms/participant-form';
import Modal from '../../../components/sweetalert'
import icons from '../../../configs/icons'
import { useGetDetail, useGetStatus, useGetRegion, useUpdatePeserta, useLoginUser } from '../../../api/list-participant';;


export default function Component(){

    const navigate = useNavigate();
    const { id } = useParams();
    const user = getLogged();

    const cekRole = user.role !== 'Formal' && user.role !== 'Non Formal';

    const { data: loginData, isLoading: userLoading } = useLoginUser({}, { enabled: !cekRole })
    const { data: detailData, isLoading: detailLoading, error } = useGetDetail(id, {}, { enabled: cekRole })
    const { data: statusOptions, isLoading: statusLoading, } = useGetStatus({}, { enabled: cekRole })
    const { data: wilayahOptions,  isLoading: wilayahLoading,  } = useGetRegion({}, { enabled: cekRole })

    const { mutate: editPeserta, isLoading: editLoading } = useUpdatePeserta();

    const handleSubmit = (values) => {
        const payload = {
            ...values,
            region: values?.region?.value,
            status: values?.status?.value,
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

    const userData = cekRole ? detailData : loginData
    const tmpStatus = cekRole ? statusOptions?.filter(item => item.label === userData?.status) : [{ label: userData?.status, value: userData?.status }]
    const tmpRegion = cekRole ? wilayahOptions?.filter(item => item.label === userData?.region) : [{ label: userData?.region, value: userData?.region }]

    let view = (
        <>
        <h1 className='text-2xl font-semibold mb-4'>Detail Peserta</h1>
          <div className='border-2 p-4 m-auto mb-6' style={{ width: '220px' }}>
            <QRCodeSVG size={180} value={`/participant-details/${id}`} />
          </div>
           <Form
              defaultValues={{
                fullname: userData?.fullname,
                username: userData?.username,
                birthday: userData?.birthday,
                status: tmpStatus,
                region: tmpRegion,
                roomMeet: userData?.roomMeet,
                flight: userData?.flight,
                roomStay: userData?.roomStay,
                }}
               isDetail={true}
               isLoading={editLoading}
               onSubmit={handleSubmit}
               statusLoading={statusLoading}
               statusOptions={statusOptions}
               wilayahLoading={wilayahLoading}
               wilayahOptions={wilayahOptions}
           />
        </>
    )


    if(detailLoading || userLoading){ return 'Loading...';}

    if(error?.code === 404){ 
      view = (
        <div className="text-center text-2xl mt-4">
            Peserta tidak ditemukan
        </div>
      )
    }

    return(
        <>
        {cekRole ? (
            <div className="ml-4 flex cursor-pointer" onClick={() => navigate('/')}>
                <img alt="arrow_back" src={icons.arrow_back}/>
                <h1 className="ml-2 text-2xl font-medium">Kembali</h1>
            </div>
        ) : null}
        <div className='bg-white p-6 m-6 overflow-auto rounded-md shadow-md'>
            {view}
        </div>
        </>

    )
}