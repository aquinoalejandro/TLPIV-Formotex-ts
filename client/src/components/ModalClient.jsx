import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'

export const ModalClient = (props) => {

  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [socioNombre, setSocioNombre] = useState('');
  const [socioDNI, setSocioDNI] = useState('');
  const [email, setEmail] = useState('');
  const [domicilio, setDomicilio] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/client/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreEmpresa,socioNombre, socioDNI, email, domicilio }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
        // Update state variables
        setSocioNombre('');
        setNombreEmpresa('');
        setSocioDNI('');
        setEmail(0);
        setSocioDNI(0);
  
        Swal.fire({
          icon: 'success',
          title: 'Cliente agregado',
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
          <h4>Agrega un cliente</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} method="post" style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="Socio">
            Nombre del socio
          </label>
          <input
            type="text"
            id="socioNombre"
            name="socioNombre"
            value={socioNombre}
            className='form-control'
            onChange={(e) => setSocioNombre(e.target.value)}
          />
          <label htmlFor="nombreEmpresa">
            Nombre de la empresa
          </label>
          <input
            type="text"
            id="nombreEmpresa"
            name="nombreEmpresa"
            value={nombreEmpresa}
            className='form-control'
            onChange={(e) => setNombreEmpresa(e.target.value)}
          />
          <label htmlFor="socioDNI">
            DNI del socio
          </label>
          <input
            type="number"
            id="socioDNI"
            name="socioDNI"
            value={socioDNI}
            className='form-control'
            onChange={(e) => setSocioDNI(Number(e.target.value))}
          />
          <label htmlFor="Email">
            Email de contacto
          </label>
          <input
            type="email"
            id="email"
            name="Email"
            value={email}
            className='form-control'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="Domicilio">
            Domicilio
          </label>
          <input
            type="text"
            id="Domicilio"
            name="Domicilio"
            value={domicilio}
            className='form-control'
            onChange={(e) => setDomicilio(e.target.value)}
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
