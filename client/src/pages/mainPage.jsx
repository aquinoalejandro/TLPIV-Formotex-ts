import React from 'react'
import '../css/grid.css'
import {SidebarCustom} from '../components/sidebar'



export const MainPage = () => {
    return (
            <div class="parent">
                <div className='subparent1'>
                    <h1 className='title'>FORMOTEX</h1>
                    <SidebarCustom/>    
                </div>
                <div className='subparent2'>
                    <div class="div1">
                        1
                    </div>
                    <div class="div2">
                        2
                    </div>
                </div>
                
            </div>
    )
}
