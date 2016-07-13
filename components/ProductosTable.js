import React from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';
import {
  Button,
  Panel,
  Glyphicon,
  Popover,
  OverlayTrigger,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import {MultiMonthView} from 'react-date-picker'
import {TransitionView, Calendar} from 'react-date-picker'

import 'react-date-picker/index.css'

const ProductosTable = ({
  usuarios,
  clientes,
  pedidos,
  productos,
  productoRemove,
  productoAdd,
  productoCancel,
  productoDetail,
  productoAfterSave,
  isAddingProducto,
  productoChangeStatus,
  productoModalId,
  productoModalStart,
  productoModalStop,
  selectedPedidoId,
  selectedclienteId
}) => {
  const buttonFormatter = (cell, row) => {
    if (row.id) {
      return (
        <div>
          <Button
            className="remove"
            onClick={() => {
              productoRemove(row);
            }}
            bsSize="xsmall"
            bsStyle="danger"
          >
            <Glyphicon glyph="remove"/>
          </Button>
          {/*<Button*/}
          {/*className="play"*/}
          {/*onClick={() => {*/}
          {/*productoDetail(row);*/}
          {/*}}*/}
          {/*bsSize="xsmall"*/}
          {/*bsStyle="info"*/}
          {/*>*/}
          {/*<Glyphicon glyph="play"/>*/}
          {/*</Button>*/}
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
  const infoFormatter = (cell, row) => {
    if (row.id) {
      let textPiece = (subtitle, text) => {
        if (text)
          return (<p><strong>{subtitle}</strong><br/>{text}</p>);
      }
      return (
        <OverlayTrigger
          trigger="focus"
          placement="right"
          overlay={
            <Popover id={row.id} title='Detalle'>
              {textPiece('Direccion', row.nombre_producto)}
              {textPiece('Producto', row.nombre_pedido)}
              {textPiece('Domiciliario', row.id_responsable_producto)}
            </Popover>}>
          <Button
            bsSize="xsmall"
            bsStyle="info"
          >
            <Glyphicon glyph="info-sign"/>
          </Button>
        </OverlayTrigger>
      );
    }
  };

  const clienteFormatter = (cell, row) => {
    if (cell && row.id && clientes) {
      let cliente = clientes.filter(cliente => cliente.id == cell);
      if (cliente[0]) return cliente[0].nombre_cliente;
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

  const selectPedidoFormatter = (cell, row) => {
    if (cell && pedidos) {
      let pedido = pedidos.filter(pedido => pedido.id == cell);
      if (pedido[0]) return pedido[0].nombre_pedido;
    }
  };

  const dateModalFormater = (cell, row) => {
    let formattedMoment = '';
    if (cell) {
      let momentFromCell = moment.utc(cell, "YYYY-MM-DDTHH:mm:ssZ");
      formattedMoment = momentFromCell.format('DMMMYY h:m:s');
    }
    if (row.id) {
      return (
        <div>
          {formattedMoment ? formattedMoment + " " : " "}
          <Button
            bsSize="xsmall"
            onClick={() => {
              productoModalStart(row.id);
            }}
          >
            <Glyphicon glyph="edit"/>
          </Button>
          <Modal
            bsSize="large"
            show={(productoModalId == row.id)}
            onHide={() => {
              productoModalStop();
            }}>
            <Modal.Header closeButton>
              <Modal.Title>Seleccione una fecha</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "center"}}>
              <div>
                <TransitionView>
                  <Calendar
                    dateFormat="DD/MM/YYYY HH:mm:ss"
                    defaultDate={moment()}
                    onChange={(dateString, {dateMoment, timestamp}) => {
                      row.deadline_producto = dateMoment.format('YYYY-MM-DDTHH:mm:ssZ');
                      productoAfterSave(row);
                      productoModalStop();
                    }}
                  />
                </TransitionView>
                {/*<MultiMonthView*/}
                {/*onChange={(dateString, {dateMoment, timestamp}) => {*/}
                {/*row.deadline_producto = dateMoment.format();*/}
                {/*productoAfterSave(row);*/}
                {/*productoModalStop();*/}
                {/*}}*/}
                {/*/>*/}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  productoModalStop();
                }}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  };

  const dateFormatter = (cell, row) => {
    if (cell) {
      return (
        <div>
          {moment.utc(cell, "YYYY-MM-DDTHH:mm:ssZ").format('DMMMYY h:m:s')}
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
  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: productoAfterSave
  };
  productos.map((producto) => {
    if (producto.pedidos_table) {
      producto.nombre_pedido = producto.pedidos_table.nombre_pedido;
      if (producto.pedidos_table.clientes_table.nombre_cliente) {
        producto.nombre_cliente = producto.pedidos_table.clientes_table.nombre_cliente;
        producto.cliente_id = producto.pedidos_table.clientes_table.id;
      }
    }
  });

  let productosData = [];
  if (selectedPedidoId && selectedPedidoId != 0) {
    productosData = productos.filter(producto => producto.pedido_id == selectedPedidoId);
  } else if (selectedclienteId && selectedclienteId != 0) {
    productosData = productos.filter(producto => producto.cliente_id == selectedclienteId);
  } else {
    productosData = productos;
  }

  let idsPedido = [];
  if (pedidos) {
    idsPedido = pedidos.map((pedido) => (pedido.id));
  }

  const title = (
    <h3>Pedidos</h3>
  );

  return (
    <Panel header={title} bsStyle="primary" eventKey="3">
      <BootstrapTable
        data={isAddingProducto ? [{}, ...productosData] : productosData}
        striped
        hover
        pagination
        search
        clearSearch
        cellEdit={cellEditProp}
      >
        <TableHeaderColumn
          dataFormat={infoFormatter}
          editable={false}
          dataAlign="center"
          width="65"
        />
        <TableHeaderColumn
          dataField="id"
          isKey
          dataAlign="center"
          hidden
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="nombre_producto"
          dataSort
          headerAlign='center'
        >
          Direccion
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="pedido_id"
          dataSort
          dataFormat={selectPedidoFormatter}
          editable={{type: 'select', options: {values: idsPedido}}}
          headerAlign='center'
          width="100">
          Producto
        </TableHeaderColumn>
        {/*<TableHeaderColumn*/}
        {/*dataField="cliente_id"*/}
        {/*dataFormat={clienteFormatter}*/}
        {/*editable={false}*/}
        {/*dataSort*/}
        {/*headerAlign='center'*/}
        {/*width="100">*/}
        {/*cliente*/}
        {/*</TableHeaderColumn>*/}
        <TableHeaderColumn
          dataField="createdAt"
          dataFormat={dateFormatter}
          editable={false}
          dataAlign="right"
          headerAlign='center'
          dataSort
          width="140">
          Creado
        </TableHeaderColumn>
        <TableHeaderColumn
          editable={false}
          dataField="deadline_producto"
          dataFormat={dateModalFormater}
          dataSort
          headerAlign='center'
          dataAlign="right"
          width="160">
          Programado
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="done_producto"
          dataSort
          dataFormat={dateFormatter}
          dataAlign="right"
          editable={false}
          headerAlign='center'
          width="140">
          Entregado
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_responsable_producto"
          dataSort
          dataAlign="center"
          headerAlign='center'
          dataFormat={selectUsuarioFormatter}
          editable={{type: 'select', options: {values: idsUsuario}}}
          width="160">
          <h3><Glyphicon glyph="user"/></h3>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="estado"
          width="40"
          dataAlign="center"
          headerAlign='center'
          dataSort
          dataFormat={statusButtonFormatter}
          editable={false}
        >
          <h3><Glyphicon glyph="tasks"/></h3>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="button"
          dataAlign="center"
          dataFormat={buttonFormatter}
          headerAlign='center'
          editable={false}
          width="60"
        >
          <Button
            className="plus"
            onClick={productoAdd}
            bsStyle="primary"
          >
            <Glyphicon glyph="plus"/>
          </Button>
        </TableHeaderColumn>
      </BootstrapTable>
    </Panel>
  );
};

ProductosTable.propTypes = {
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

export default ProductosTable;
