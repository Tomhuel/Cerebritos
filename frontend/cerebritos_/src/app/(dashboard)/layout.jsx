'use client'
import '../styles.css'
import NavBar from '../../../components/NavBar/NavBar'
import Sidebar from '../../../components/SideBar/SideBar'
import { useEffect, useState } from 'react'
import React from 'react'
import { useSession } from 'next-auth/react'
import apiUrl from '../../../utils/apiConfig'

export default function RootLayout({ children }) {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarCollapsed(prevState => !prevState);
    };

    return (
        <React.StrictMode>
            <div className={isSidebarCollapsed ? "sb-nav-fixed sb-sidenav-toggled" : "sb-nav-fixed"}>
                <NavBar onSidebarToggle={handleSidebarToggle} />
                <div id="layoutSidenav">
                    <Sidebar />
                    <div id="layoutSidenav_content">
                        <main className='h-100 container-fluid'>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    )
}
