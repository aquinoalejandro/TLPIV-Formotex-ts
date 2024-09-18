
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalEquipment = (props)  => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      
      
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <h4>Agrega un equipo</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >

        <form action="http://localhost:3000/equipment/create" method="post" style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="nombre">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className='form-control'
          />
          <label htmlFor="descripcion">
            Descripción
          </label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            className='form-control'
          />
          <label htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            className='form-control'
          />
          <label htmlFor="precio">
            Precio
          </label>
          <input

            type="number"
            id="precio"
            name="precio"
            className='form-control'
          />
          <label htmlFor="imagen">
            Imagen
          </label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            className='form-control'
          />
          <Button
            type="submit"
          >
            Agregar
          </Button>


        </form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
