import React, {Component, PropTypes} from 'react';
import {
  Button,
} from 'react-bootstrap';

const HomeButtons = ({
  clientes,
  type,
  bsStyle
}) => {
  return (
    <div>
      <h3><center>{(type==1)?'clientes':'Proyectos'}</center></h3>
      {clientes.map((cliente, i) => {
          if (cliente.type == type) {
            return (
              <Button
                key={i}
                bsStyle={bsStyle}
                block
                style={{whiteSpace: 'normal'}}
                href={"/taskspage/"+type+"/"+cliente.id+"/0/0"}>
                <small>
                  {cliente.nombre_cliente}
                </small>
              </Button>)
          }
        }
      )}
    </div>
  );
}

HomeButtons.propTypes = {
  clientes: React.PropTypes.array.isRequired,
  clienteDetail: React.PropTypes.func.isRequired,
  type: React.PropTypes.number.isRequired,
};

export default HomeButtons;
