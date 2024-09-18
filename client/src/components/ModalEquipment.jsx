import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'

export const ModalEquipment = (props) => {

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/equipment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, descripcion, imagen, precio, stock }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
        // Update state variables
        setNombre('');
        setDescripcion('');
        setImagen('');
        setPrecio(0);
        setStock(0);
  
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
          <label htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={stock}
            className='form-control'
            onChange={(e) => setStock(Number(e.target.value))}
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
          <label htmlFor="imagen">
            Imagen
          </label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            value={imagen}
            className='form-control'
            onChange={(e) => setImagen(e.target.value)}
          />
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
