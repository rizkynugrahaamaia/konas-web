import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import QrReader from 'react-qr-scanner'

import { useScanKehadiran } from '../../api/scan';

import styles from './styles.module.css'

export default function Component({ 
  qrVisible = {},
  setView = () => {},
  setVisible = () => {},
}) {
     
  const navigate = useNavigate();
  const { mutate: scanPeserta } = useScanKehadiran();

  const handleScanProfile = (e) => {
      if(e){ navigate(e.text)}
  }

  const handleScanKehadiran = (e) => {
    if(e){
      const path = e.text
      const parts = path.split('/');
      const id = parts.pop();
      scanPeserta(id,
        {
          onSuccess: () => {
            setView({
              status: 2
            });
            setVisible(null);
          },
          onError: (err) => {
            setView({
              status: 3,
              message: err.message
            });
            setVisible(null);
          }
        },
      );
    }
  };

  if(!qrVisible?.open) return null;
  return ReactDOM.createPortal(
    <>
      <div className={styles['qr_root']}>
        <div className={styles['qr_wrap']}>       
            <QrReader
                delay={100}
                facingMode="environment"
                style={{
                    height: 240,
                    width: 320,
                }}
                onError={() => {}}
                onScan={(e)=> { qrVisible?.type === 'profile' ? handleScanProfile(e) : handleScanKehadiran(e) }}
            />
            <button 
             className='mt-8 border-white text-white bg-slate-800 border-2 p-2 rounded-md w-full'
             onClick={() => setVisible(null)}
            >
              Tutup
            </button>
          </div>
        </div>
    </>,
    document.body
  );
}

Component.propTypes = {
  qrVisible: PropTypes.object,
  setView: PropTypes.func,
  setVisible: PropTypes.func
};
