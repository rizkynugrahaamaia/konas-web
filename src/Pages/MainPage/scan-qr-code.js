import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import { Overlay, ModalStyle, CloseButton } from './styles/Modal.styled';
import QrReader from 'react-qr-scanner'
import styles from './styles.module.css'

export default function Component({ open, setVisible }) {
     
  const navigate = useNavigate();

    const handleScan = (e) => {
        if(e){ navigate('/access-details/1')}
      }

  if(!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className={styles['qr_root']}>
        <div className={styles['qr_wrap']}>       
            <QrReader
                delay={100}
                style={{
                    height: 240,
                    width: 320,
                }}
                onError={() => {}}
                onScan={(e)=> handleScan(e)}
            />
            <button 
             className='mt-8 border-white text-white bg-slate-800 border-2 p-2 rounded-md w-full'
             onClick={() => setVisible(prev => !prev)}
            >
              Tutup
            </button>
          </div>
        </div>
    </>,
    document.body
  );
}

Component.defaultProps = {
  children: null,
  setVisible: () => {},
  open: true
};

Component.propTypes = {
  children: PropTypes.node,
  setVisible: PropTypes.func,
  open: PropTypes.bool
};
