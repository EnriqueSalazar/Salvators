import React from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';
import {
  Button,
  Glyphicon,
} from 'react-bootstrap';
import moment from 'moment';
import 'react-date-picker/index.css';

const Hopedidoble = ({
  usuarios,
  productos,
  productoCancel,
  isAddingProducto,
  productoChangeStatus,
}) => {
  const buttonFormatter = (cell, row) => {
    if (row.id) {
      return (
        <div>
          <Button
            className="play"
            href={"/taskspage/" + row.type + "/" + row.cliente_id + "/" + row.pedido_id + "/" + row.id}

            bsSize="xsmall"
            bsStyle="info"
            >
            <Glyphicon glyph="play"/>
          </Button>
        </div>);
    } else {
      return (
        <div>
          <Button
            className="cancel"
            onClick={() => {
              productoCancel();
            }}
            bsSize="xsmall"
            bsStyle="danger"
          >
            <Glyphicon glyph="remove"/>
          </Button>
        </div>);
    }
  };

  let idsUsuario = [];
  if (usuarios) {
    idsUsuario = usuarios.map((usuario) => (usuario.id));
  }
  const selectUsuarioFormatter = (cell, row) => {
    if (cell && row.id && usuarios) {
      let usuario = usuarios.filter(usuario => usuario.id == cell);
      if (usuario[0]) return usuario[0].nombre_usuario;
    }
  };

  const dateFormatter = (cell, row) => {
    if (cell) {
      return (
        <div>
          {moment.utc(cell, "YYYY-MM-DDTHH:mm:ssZ").format('DMMMYY')}
        </div>
      );
    }
  };

  const statusButtonFormatter = (cell, row) => {
    if (row.id) {
      if (row.estado_producto) {
        return (
          <div>
            <Button
              className="check"
              onClick={() => {
                productoChangeStatus(row);
              }}
              bsSize="xsmall"
            >
              <Glyphicon glyph="check"/>
            </Button>
          </div>);
      } else {
        return (
          <div>
            <Button
              className="unchecked"
              onClick={() => {
                productoChangeStatus(row);
              }}
              bsSize="xsmall"
            >
              <Glyphicon glyph="unchecked"/>
            </Button>
          </div>);
      }
    } else {
      return null;
    }
  };
  let now = moment();
  productos.map((producto) => {
    if (producto.deadline_producto) {
      producto.daysLeft = moment.utc(producto.deadline_producto, "YYYY-MM-DDTHH:mm:ssZ").diff(now, 'days');
    }
    if (producto.pedidos_table) {
      producto.nombre_pedido = producto.pedidos_table.nombre_pedido;
      if (producto.pedidos_table.clientes_table.nombre_cliente) {
        producto.nombre_cliente = producto.pedidos_table.clientes_table.nombre_cliente;
        producto.cliente_id = producto.pedidos_table.clientes_table.id;
        producto.type = producto.pedidos_table.clientes_table.type;
      }
    }
  });
  let productosData = [];
  productosData = productos.filter(producto => producto.estado_producto == 0 && producto.deadline_producto);
  return (
    <BootstrapTable
      data={isAddingProducto ? [{}, ...productosData] : productosData}
      striped
      hover
      pagination
      options={{
        defaultSortName: "daysLeft",
        sortOrder: "asc",
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
        ID
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="daysLeft"
        dataAlign="center"
        hidden
      >
        daysLeft
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="nombre_producto"
        dataSort
        headerAlign="center"
      >
        Producto
      </TableHeaderColumn>
      <TableHeaderColumn
        editable={false}
        dataField="deadline_producto"
        dataFormat={dateFormatter}
        headerAlign="center"
        dataAlign="right"
        width="120">
        Deadline
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="id_responsable_producto"
        dataAlign="center"
        headerAlign="center"
        dataFormat={selectUsuarioFormatter}
        editable={{type: 'select', options: {values: idsUsuario}}}
        width="120">
        <h3><Glyphicon glyph="user"/></h3>
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="estado"
        width="40"
        dataAlign="center"
        headerAlign="center"
        dataFormat={statusButtonFormatter}
        editable={false}
      >
        <h3><Glyphicon glyph="tasks"/></h3>
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="button"
        dataAlign="center"
        dataFormat={buttonFormatter}
        headerAlign="center"
        editable={false}
        width="40" />
    </BootstrapTable>
  );
};

Hopedidoble.propTypes = {
  usuarios: React.PropTypes.array.isRequired,
  clientes: React.PropTypes.array.isRequired,
  pedidos: React.PropTypes.array.isRequired,
  productos: React.PropTypes.array.isRequired,
  productoRemove: React.PropTypes.func.isRequired,
  productoAdd: React.PropTypes.func.isRequired,
  productoCancel: React.PropTypes.func.isRequired,
  productoDetail: React.PropTypes.func.isRequired,
  productoAfterSave: React.PropTypes.func.isRequired,
  productoChangeStatus: React.PropTypes.func.isRequired,
  isAddingProducto: React.PropTypes.bool.isRequired,
  selectedclienteId: React.PropTypes.number,
  selectedPedidoId: React.PropTypes.number,
};

export default Hopedidoble;
