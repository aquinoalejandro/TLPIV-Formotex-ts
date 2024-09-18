import React, { useEffect } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { Computer, Handshake, TrendingUp } from "lucide-react";


export const SidebarCustom = () => {
    const location = useLocation();

    useEffect(() => {
      const menuItem = document.querySelector(`[href="${location.pathname}"]`);
      if (menuItem) {
        menuItem.classList.add("active");
      }
    }, [location.pathname]);
    return (
        <div>
            <Sidebar>
                <Menu
                    menuItemStyles={{
                    button: {
                        // the active class will be added automatically by react router
                        // so we can use it to style the active menu item
                        backgroundColor: '#333333',
                        color: '#ffffff',

                        

                        [`&:hover`]: {
                        backgroundColor: '#404040',
                        color: '#ffffff',
                        },
                        [`&.active`]: {
                        backgroundColor: '#404040',
                        color: '#ffffff',
                        },
                    }
                    ,
                    }}
                >
                    <MenuItem component={<Link to="/MainPage" />}>
                        <span>
                            <Computer size={20}/>
                            Equipamientos
                        </span>
                    </MenuItem>

                    <MenuItem component={<Link to="/clientes" />}>
                        <span>
                            <Handshake size={20}/>
                            Clientes
                        </span>
                    </MenuItem>

                    <MenuItem component={<Link to="/ventas" />}>
                        <span>
                            <TrendingUp size={20}/>
                            Ventas
                        </span>
                    </MenuItem>
                </Menu>

                    

            </Sidebar>
        </div>
    );
}