import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {
  Button,
  Glyphicon,
  FormGroup,
  FormControl,
  Row,
  Col
} from 'react-bootstrap';
import moment from 'moment';
import 'react-date-picker/index.css'

const restaurantesclientesForm = ({
  usuarios,
  restaurantesclientes,
  restaurantesclienteAdd,
  cliente_id,
  pedido_id,
  producto_id,
  usuario_id,
  restaurante = ''
}) => {

  const formatter = (cell, row) => {
    let printFecha;
    if (row.createdAt) {
      printFecha = (
        <div>
          {moment.utc(row.createdAt, "YYYY-MM-DDTHH:mm:ssZ").format('DD MMMM YYYY')}
        </div>
      );
    }
    let printUsuario;
    if (row.usuario_id && row.id && usuarios) {
      let usuario = usuarios.filter(usuario => usuario.id == row.usuario_id);
      if (usuario[0]) {
        printUsuario = usuario[0].nombre_usuario;
      }
    }
    return (<div><strong>{printUsuario}</strong><br />{printFecha}</div>)
  };

  const onSubmitrestaurante = () => {
    if (restaurante) {
      restaurantesclienteAdd({
        restaurante,
        cliente_id,
        pedido_id,
        producto_id,
        usuario_id
      });
    }
  }

  return (
    <div>
      <Row>
        <Col md={10}>
          <right>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="restaurante"
                onChange={(e) => {
                  restaurante = e.target.value;
                }}/>
            </FormGroup>
          </right>
        </Col>
        <Col md={2}>
          <left>
            <Button
              onClick={onSubmitrestaurante}>
              <Glyphicon glyph="comment"/>
            </Button>
          </left>

        </Col>
      </Row>
      <BootstrapTable
        data={restaurantesclientes}
        striped
        hover
        pagination
        condensed
        options={{
          defaultSortName: "id",
          sortOrder: "desc",
          sizePerPage: 5,
          sizePerPageList: [5, 10, 20, 50]
        }}

      >

        <TableHeaderColumn
          dataField="id"
          isKey
          dataAlign="center"
          hidden
        >
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="createdAt"
          dataFormat={formatter}
          editable={false}
          dataAlign="right"
          headerAlign="center"
          width="120">
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="restaurante"
          headerAlign="center"
        >
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

restaurantesclientesForm.propTypes = {
  usuarios: React.PropTypes.array.isRequired,
  restaurantesclientes: React.PropTypes.array.isRequired,
  restaurantesclienteUpdate: React.PropTypes.func.isRequired,
  restaurantesclienteAdd: React.PropTypes.func.isRequired,
  cliente_id: React.PropTypes.number.isRequired,
  pedido_id: React.PropTypes.number.isRequired,
  producto_id: React.PropTypes.number.isRequired,
  usuario_id: React.PropTypes.number.isRequired,
  restaurante: React.PropTypes.string
};

export default restaurantesclientesForm;
