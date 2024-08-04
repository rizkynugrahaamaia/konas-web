import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './styles.module.css';
import SideMenu from '../side-menu';
import Header from '../header';

function MainLayout() {
return(
    <>
        <Header />
        <main className={styles.main}>
            <SideMenu/>
            <div><Outlet /></div>
            
        </main>
    </>
    )
}
    export default MainLayout;