import React, { useEffect, useState } from 'react';
import { Placeholder } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'

export const ModalEquipment = (props) => {

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [precio, setPrecio] = useState(0);
  const [clients, setClients] = useState([]);
  const [clienteDueño, setClienteDueño] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/client')
      .then(response => response.json())
      .then(data => setClients(data));
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/equipment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, descripcion, estado, precio, clienteDueño: clienteDueño }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
        // Update state variables
        setNombre('');
        setDescripcion('');
        setEstado('');
        setPrecio(0);
        
        console.log('clienteDueño:', clienteDueño);
  
        Swal.fire({
          icon: 'success',
          title: 'Equipo agregado',
          showConfirmButton: false,
          timer: 1500
        });
  
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
  
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal'
        });
      }
    } catch (error) {
      console.error(error);
  
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal'
      });
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      data-bs-theme="dark"
      style={{ color: "#ffffff"}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Agrega un equipo</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} method="post" style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="nombre">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            className='form-control'
            onChange={(e) => setNombre(e.target.value)}
          />
          <label htmlFor="descripcion">
            Descripción
          </label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            value={descripcion}
            className='form-control'
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <label htmlFor="precio">
            Precio
          </label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={precio}
            className='form-control'
            onChange={(e) => setPrecio(Number(e.target.value))}
          />
          <label htmlFor="estado">
            Estado
          </label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={estado}
            className='form-control'
            onChange={(e) => setEstado(e.target.value)}
          />
          <label htmlFor="client">
            Cliente
          </label>
          <select name="clienteDueño" id="clienteDueño" className='form-control' value={clienteDueño} onChange={(e) => setClienteDueño(e.target.value)}>
            <option selected disabled hidden value="">Selecciona un cliente</option>
            {clients && clients.map((client) => (
              <option key={client.id} value={client.socioNombre}>{client.socioNombre} ({client.nombreEmpresa})</option>
            ))}
          </select>
          <button type="submit" className='btn btn-primary mt-3'>
            Agregar
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
