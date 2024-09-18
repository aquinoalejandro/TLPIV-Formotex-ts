import React, { useState, useEffect } from 'react'
import '../css/estiloMain.css'
import {SidebarCustom} from '../components/CustomSidebar'
import { LogOutButton } from '../components/LogOutButton'
import { Plus } from 'lucide-react'
import axios from 'axios'
import { ModalEquipment } from '../components/ModalEquipment'
import 'bootstrap/dist/css/bootstrap.min.css';



export const MainPage = () => {
    const [role, setRole] = useState('')
    const [products, setProducts] = useState([])
    const [modalShow, setModalShow] = useState(false);

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/equipment');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const role = localStorage.getItem('role');
        setRole(role)

        getProducts();
    }, []);


    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/equipment/${id}`);
            getProducts();
        } catch (error) {
            console.error(error);
        }
    };




    return (
            <div class="parent">
                <div className='subparent1'>
                    <h1 className='title'>Formotex</h1>
                    <SidebarCustom />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100vh' }}>
                    <LogOutButton />
                    </div>
                    <ModalEquipment
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                    />
                </div>
                <div className='subparent2'>
                    <div class="div1">
                        <h1>
                            Estos son nuestros equipamientos
                        </h1>
                        {role === 'admin' && (
                            <button class="agregar ps-menu-button" onClick={() => setModalShow(true)}>
                                <span>
                                    <Plus size={20} color='green' />
                                    Agregar
                                </span> 
                            </button>
                        )}

                    </div>
                    <div class="div2">
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#3b3b3b', color: 'white' }}>
                                <th style={{ padding: '10px' }}>Nombre</th>
                                <th style={{ padding: '10px' }}>Descripción</th>
                                <th style={{ padding: '10px' }}>Stock</th>
                                <th style={{ padding: '10px' }}>Precio</th>
                                {role === 'admin' && <th style={{ padding: '10px' }}>Acciones</th>}
                                </tr>
                            </thead>
                            <tbody style={{ backgroundColor: '#2b2b2b' }}>
                                {products.map((product) => (
                                <tr key={product.id}>
                                    <td style={{ padding: '10px' }}>{product.nombre}</td>
                                    <td style={{ padding: '10px' }}>{product.descripcion}</td>
                                    <td style={{ padding: '10px' }}>{product.stock}</td>
                                    <td style={{ padding: '10px' }}>{product.precio}</td>
                                    {
                                        role === 'admin' && (
                                            <td style={{ display: 'flex', flexDirection: 'row',justifyContent: 'space-between', width: "120px", alignItems: 'center', padding: '10px' }}>
                                                <button class="agregar ps-menu-button" style={{width: '60px', height: '40px'}} onClick={() => deleteProduct(product.id)}>Borrar</button>
                                                <button class="agregar ps-menu-button" style={{width: '60px', height: '40px'}}>Editar</button>
                                            </td>
                                        )
                                    }
                                    
                                </tr>
                                ))}
                            </tbody>
                        </table>                       
                    </div>
                </div>
                
            </div>
    )
}
