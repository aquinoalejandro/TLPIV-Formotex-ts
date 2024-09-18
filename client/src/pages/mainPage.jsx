import React, { useState, useEffect } from 'react';
import '../css/estiloMain.css';
import { SidebarCustom } from '../components/CustomSidebar';
import { LogOutButton } from '../components/LogOutButton';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { ModalEquipment } from '../components/ModalEquipment';  // Asegúrate de que este componente exista
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

export const MainPage = () => {
    const [role, setRole] = useState('');
    const [products, setProducts] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editId, setEditId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/equipment');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const filteredData = products.filter(product => 
        (product.nombre && product.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.descripcion && product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        const role = localStorage.getItem('role');
        setRole(role);
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

    const handleEditClick = (product) => {
        setEditId(product.id);
        setEditedProduct({
            nombre: product.nombre || '',
            descripcion: product.descripcion || '',
            stock: product.stock || '',
            precio: product.precio || '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveClick = async () => {
        if (!editedProduct.nombre || !editedProduct.descripcion || !editedProduct.stock || !editedProduct.precio) {
            Swal.fire({
                icon: 'warning',
                title: 'Por favor completa todos los campos',
                showConfirmButton: true,
                timer: 2000
            });
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/equipment/${editId}`, editedProduct);
            
            if (response.status === 200) {
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === editId ? { ...product, ...editedProduct } : product
                    )
                );

                setEditId(null);
                Swal.fire({
                    icon: 'success',
                    title: 'Equipamiento actualizado',
                    showConfirmButton: true,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal'
                });
                console.error(response);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal'
            });
            console.error(error);
        }
    };

    return (
        <div className="parent">
            <div className="subparent1">
                <h1 className="title">Formotex</h1>
                <SidebarCustom />
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100vh' }}>
                    <LogOutButton />
                </div>
                <ModalEquipment show={modalShow} onHide={() => setModalShow(false)} />
            </div>
            <div className="subparent2">
                <div className="div1">
                    <h1>Estos son nuestros equipamientos</h1>
                    <input
                        type="text"
                        placeholder="Busca por nombre o descripción"
                        value={searchTerm}
                        style={{
                            width: '400px',
                            backgroundColor: '#3b3b3b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px',
                            marginBottom: '10px',
                        }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {role === 'admin' && (
                        <button className="agregar ps-menu-button" onClick={() => setModalShow(true)}>
                            <span>
                                <Plus size={20} color="green" />
                                Agregar
                            </span>
                        </button>
                    )}
                </div>
                {products.length === 0 ? (
                    <p>No hay datos</p>
                ) : (
                    <div className="div2">
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
                                {filteredData.map((product) => (
                                    <tr key={product.id}>
                                        {editId === product.id ? (
                                            <>
                                                <td style={{ padding: '10px' }}>
                                                    <input
                                                        type="text"
                                                        name="nombre"
                                                        value={editedProduct.nombre || ''}
                                                        onChange={handleInputChange}
                                                        style={{ width: '100%' }}
                                                    />
                                                </td>
                                                <td style={{ padding: '10px' }}>
                                                    <input
                                                        type="text"
                                                        name="descripcion"
                                                        value={editedProduct.descripcion || ''}
                                                        onChange={handleInputChange}
                                                        style={{ width: '100%' }}
                                                    />
                                                </td>
                                                <td style={{ padding: '10px' }}>
                                                    <input
                                                        type="number"
                                                        name="stock"
                                                        value={editedProduct.stock || ''}
                                                        onChange={handleInputChange}
                                                        style={{ width: '100%' }}
                                                    />
                                                </td>
                                                <td style={{ padding: '10px' }}>
                                                    <input
                                                        type="number"
                                                        name="precio"
                                                        value={editedProduct.precio || ''}
                                                        onChange={handleInputChange}
                                                        style={{ width: '100%' }}
                                                    />
                                                </td>
                                                <td style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                                                    <button
                                                        className="ps-menu-button agregar"
                                                        style={{ width: '60px', height: '40px' }}
                                                        onClick={handleSaveClick}
                                                    >
                                                        Guardar
                                                    </button>
                                                    <button
                                                        className="ps-menu-button agregar"
                                                        style={{ width: '60px', height: '40px' }}
                                                        onClick={() => setEditId(null)}
                                                    >
                                                        Cancelar
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td style={{ padding: '10px' }}>{product.nombre}</td>
                                                <td style={{ padding: '10px' }}>{product.descripcion}</td>
                                                <td style={{ padding: '10px' }}>{product.stock}</td>
                                                <td style={{ padding: '10px' }}>{product.precio}</td>
                                                {role === 'admin' && (
                                                    <td
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            padding: '10px',
                                                            width: '120px',
                                                        }}
                                                    >
                                                        <button
                                                            className="ps-menu-button agregar"
                                                            style={{ width: '60px', height: '40px' }}
                                                            onClick={() => deleteProduct(product.id)}
                                                        >
                                                            Borrar
                                                        </button>
                                                        <button
                                                            className="ps-menu-button agregar"
                                                            style={{ width: '60px', height: '40px' }}
                                                            onClick={() => handleEditClick(product)}
                                                        >
                                                            Editar
                                                        </button>
                                                    </td>
                                                )}
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
