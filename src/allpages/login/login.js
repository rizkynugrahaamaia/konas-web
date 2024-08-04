import React, { useEffect } from 'react';
import LoginForm from './form-login';
import styles from './styles.module.css';


export default function Component(){

    useEffect(() => {
        document.body.classList.add(styles.root);
        document.title = 'Login Konas';
    
        return () => {
          document.body.classList.remove(styles.root);
        };
      }, []);

    return(
        <div className='flex items-center' style={{ minHeight: '100vh', width: '100vw' }}>
              <div className='shadow-md w-[426px] mx-2 md:mx-auto p-8 py-6 rounded-lg bg-white'>
                <LoginForm />
            </div>
        </div>
 
    )
}