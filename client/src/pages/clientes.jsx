import React, { useState, useEffect } from "react";
import '../css/estiloMain.css'
import {Plus} from 'lucide-react'
import {SidebarCustom} from '../components/CustomSidebar'
import { LogOutButton } from "../components/LogOutButton";


export const Clientes = () => {
    const [role, setRole] = useState('')

    useEffect(() => {
        const role = localStorage.getItem('role');
        setRole(role)
    }, []);
    return (
            <div class="parent">
                <div className='subparent1'>
                    <h1 className='title'>Formotex</h1>
                    <SidebarCustom />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100vh' }}>
                    <LogOutButton />
                    </div>
                </div>
                <div className='subparent2'>
                    <div class="div1">
                        <h1>
                            Estos son nuestros clientes
                        </h1>
                        {role === 'admin' && (
                            <button class="agregar ps-menu-button">
                                <span>
                                    <Plus size={20} color='green' />
                                    Agregar
                                </span> 
                            </button>
                        )}
                    </div>
                    <div class="div2">
                        2
                    </div>
                </div>
                
            </div>
    )
}