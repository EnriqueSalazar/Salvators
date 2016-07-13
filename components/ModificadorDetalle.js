import React from 'react';
import {Button, Glyphicon, FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap';

const clienteDetalle = ({
  clientes,
  selectedclienteId
}) => {


  const handleNombreChange = (e) => {
    // console.error('this selected cliente', this.selectedcliente)
    selectedcliente.nombre_cliente= e.target.value;
    // debugger
    console.error('selected cliente', e.target.value)
  };

  console.error('clienteDetalle');
  let cliente = clientes.filter(cliente => cliente.id == selectedclienteId);
  var selectedcliente = {};
  if (cliente && cliente[0]) {
    selectedcliente = cliente[0];
  }


  return (
    <form>
      <FormGroup
        controlId="clienteForm"
      >
        <ControlLabel>Nombre del cliente</ControlLabel>
        <FormControl
          type="text"
          value={selectedcliente.nombre_cliente}
          placeholder="Escriba el nombre"
          onChange={handleNombreChange}
        />
      </FormGroup>
    </form>
  );
};

clienteDetalle.propTypes = {
  clientes: React.PropTypes.array.isRequired,
  selectedclienteId: React.PropTypes.number
};

export default clienteDetalle;
