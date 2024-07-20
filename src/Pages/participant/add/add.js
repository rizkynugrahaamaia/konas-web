import React from 'react'
import Form from '../../../forms/participant-form';
import Modal from '../../../components/sweetalert';
import { useNavigate } from 'react-router-dom';

export default function Component(){

    const navigate = useNavigate();

    const handleSubmit = () => {
        Modal({
            title: 'Example',
            text: 'Swal injected',
            icon: 'success',
            onConfirm: () => navigate('/')
        })
    }

    return(
        <div className='bg-white p-6 m-6 overflow-auto rounded-md shadow-md'>
           <h1 className='text-2xl font-semibold mb-4'>Tambah Peserta</h1>
           <Form
                onSubmit={handleSubmit}
           />
        </div>
    )
}