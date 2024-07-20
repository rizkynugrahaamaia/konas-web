import React, { useState } from 'react';

import { useLogin } from '../../../api/auth';
import { setLogged } from '../../../utils/storage';

import styles from '../styles.module.css'

export default function Component(){

    const loginMutation = useLogin();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageError, setMessageError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate({ username, password}, 
          {
            onSuccess: () => {
                  setLogged({ isLogged: true })
                  window.location.href = '/';
            },
            onError: (err) => {
                setMessageError('Username atau Password salah!')
            }
        })
    }

    return(
            <form className="" id="form" onSubmit={handleSubmit}>
                
                <section className="mb-12 mt-8">
                  <h1 className='text-4xl text-center font-bold  text-[#ECB602]'>Konas</h1>
                </section>

                <section className="mb-8">
                    <header className="mb-2">
                        <p className="">Username</p>
                    </header>
                    <div className="">
                        <input
                          className='p-4 border-2 rounded-lg w-full'
                          onChange={(event) => { setMessageError(''); setUsername(event.target.value); }}
                          placeholder="Masukkan username"
                          type="text"
                          value={username}
                        />
                    </div>
                </section>

                <section className="mb-12">
                    <header className="mb-2">
                        <p className="">Password</p>
                    </header>
                    <div className="">
                        <input
                          className='p-4 border-2 rounded-lg  w-full'
                          onChange={(event) =>{ setMessageError(''); setPassword(event.target.value) }}
                          placeholder="Masukkan Password"
                          type="text"
                          value={password}
                        />
                    </div>
                </section>

                <button 
                 className="flex relative justify-center bg-[#ECB602] text-white p-4 w-full rounded-lg mt-4 text-lg font-bold disabled:opacity-25 mb-8"
                 disabled={loginMutation?.isPending}
                 type="submit"
                 >

                    <div className="text-center">Login</div>
                    {loginMutation?.isPending ? (<div className={styles['loader']} />) : null} 
                </button>

                <p className="text-center mt-2 text-red-600">{messageError}</p>


            </form>
    )
}