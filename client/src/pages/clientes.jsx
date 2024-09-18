import React, { useState, useEffect } from 'react';
import '../css/estiloMain.css';
import { SidebarCustom } from '../components/CustomSidebar';
import { LogOutButton } from '../components/LogOutButton';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { ModalClient } from '../components/ModalClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

export const Clientes = () => {
    const [role, setRole] = useState('');
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editId, setEditId] = useState(null);
    const [editedData, setEditedData] = useState({});

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/client');
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const filteredData = data.filter(client =>
        (client.socioNombre && client.socioNombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
        client.socioDNI ||
        (client.nombreEmpresa && client.nombreEmpresa.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (client.domicilio && client.domicilio.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        const role = localStorage.getItem('role');
        setRole(role);

        getData();
    }, []);

    const deleteClient = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/client/${id}`);
            getData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (client) => {
        setEditId(client.id);
        setEditedData({
            nombreEmpresa: client.nombreEmpresa || '',
            socioNombre: client.socioNombre || '',
            email: client.email || '',
            domicilio: client.domicilio || '',
        });
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveClick = async () => {
        if (!editedData.nombreEmpresa || !editedData.socioNombre || !editedData.email || !editedData.domicilio) {
            Swal.fire({
                icon: 'warning',
                title: 'Por favor completa todos los campos',
                showConfirmButton: true,
                timer: 2000
            });
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:3000/client/${editId}`, editedData);
            
            if (response.status === 200) {
                // Actualiza el cliente editado directamente en el estado local 'data'
                setData((prevData) =>
                    prevData.map((client) =>
                        client.id === editId ? { ...client, ...editedData } : client
                    )
                );
    
                // Restablece los valores después de guardar
                setEditId(null);
    
                Swal.fire({
                    icon: 'success',
                    title: 'Cliente actualizado',
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
                <ModalClient show={modalShow} onHide={() => setModalShow(false)} />
            </div>
            <div className="subparent2">
                <div className="div1">
                    <h1>Estos son nuestros clientes</h1>
                    <input
                        type="text"
                        placeholder="Busca por nombre de empresa o socio"
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
                {data.length === 0 ? (
                    <p>No hay datos</p>
                ) : (
                    <div className="div2">
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#3b3b3b', color: 'white' }}>
                                    <th style={{ padding: '10px' }}>Nombre de empresa</th>
                                    <th style={{ padding: '10px' }}>Nombre de Socio</th>
                                    <th style={{ padding: '10px' }}>Email</th>
                                    <th style={{ padding: '10px' }}>Domicilio</th>
                                    {role === 'admin' && <th style={{ padding: '10px' }}>Acciones</th>}
                                </tr>
                            </thead>
                            <tbody style={{ backgroundColor: '#2b2b2b' }}>
                                {filteredData.map((client) => (
                                    <tr key={client.id}>
                                        {editId === client.id ? (
                                            <>
                                                <td style={{ padding: '10px' }}>
                                                    <input
                                                        type="text"
                                                        name="nombreEmpresa"
                                                        value={editedData.nombreEmpresa || ''}
                                                        onChange={handleInputChange}
                                                        style={{ width: '100%' }}
                                                    />
                                                </td>
                                                <td style={{ padding: '10px' }}>
                                                    <input
                                                        type="text"
                                                        name="socioNombre"
                                                        value={editedData.socioNombre || ''}
                                                        onChange={handleInputChange}
                                                        style={{ width: '100%' }}
                                                    />
                                                </td>
                                                <td style={{ padding: '10px' }}>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={editedData.email || ''}
                                                        onChange={handleInputChange}
                                                        style={{ width: '100%' }}
                                                    />
                                                </td>
                                                <td style={{ padding: '10px' }}>
                                                    <input
                                                        type="text"
                                                        name="Domicilio"
                                                        value={editedData.domicilio || ''}
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
                                                <td style={{ padding: '10px' }}>{client.nombreEmpresa}</td>
                                                <td style={{ padding: '10px' }}>{client.socioNombre}</td>
                                                <td style={{ padding: '10px' }}>{client.email}</td>
                                                <td style={{ padding: '10px' }}>{client.domicilio}</td>
                                                {role === 'admin' && (
                                                    <td
                                                        style={{
                                                            display: 'flex',
                                                            justifsyContent: 'space-between',
                                                            padding: '10px',
                                                            width: '120px',
                                                        }}
                                                    >
                                                        <button
                                                            className="ps-menu-button agregar"
                                                            style={{ width: '60px', height: '40px' }}
                                                            onClick={() => deleteClient(client.id)}
                                                        >
                                                            Borrar
                                                        </button>
                                                        <button
                                                            className="ps-menu-button agregar"
                                                            style={{ width: '60px', height: '40px' }}
                                                            onClick={() => handleEditClick(client)}
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
