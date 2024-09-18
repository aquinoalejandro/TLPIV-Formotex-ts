import React from 'react'
import { LogOut } from 'lucide-react'
import '../css/botonSidebar.css'



export const LogOutButton = () => {

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    return (
    <button class="ps-menu-button logoutbutton" onClick={handleLogout}>
        <span><LogOut size={20} color='#f23f42' />Logout</span>
    </button>
    )
}