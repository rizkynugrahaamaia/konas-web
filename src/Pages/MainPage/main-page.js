import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from '../../components/Table';
import QrScan from './scan-qr-code';
// import styles from './styles.module.css'

export default function MainPage(){

    const [post, setPost] = useState(null);
    const [qrVisible, setQrVisible] = useState(false)
    const navigate = useNavigate();

    const head = [
        {
            label: 'Nama',
            key: 'name'
        },
        {
            label: 'NIK',
            key: 'nik'
        },
        {
            label: 'Jenis Kelamin',
            key: 'jenis_kelamin'
        },
        {
            label: 'Kota',
            key: 'kota'
        },
        {
            label: 'Alamat',
            key: 'alamat'
        },
        {
            label: 'Action',
            key: 'action'
        }
    ]

    useEffect(() => {
        axios.get('http://localhost:4000/peserta').then((response) => {
          setPost(response.data.data);
        });
      }, [])

    return(
        <div className='bg-white p-6 m-6 overflow-auto rounded-md shadow-md'>
                <h1 className='text-2xl font-semibold mb-4 text-center'>List Peserta</h1>
                <button 
                      className="bg-sky-600 p-2 rounded-md text-white ml-8" 
                      onClick={() => setQrVisible(prev => !prev)}
                    >
                       Scan
                </button>
            
            <Table
                data={post?.map((dt) => ({
                 ...dt,
                 action: (
                    <button 
                      className="bg-sky-600 p-2 rounded-md text-white" 
                      onClick={() => navigate('/participant-details/1')}
                    >
                       Detail
                    </button>
                 )
                }))}
                head={head}
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