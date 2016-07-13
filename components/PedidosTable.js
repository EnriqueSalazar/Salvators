import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button, Panel, Glyphicon, Popover, OverlayTrigger, Modal, ProgressBar} from 'react-bootstrap';
import moment from 'moment';
import {MultiMonthView} from 'react-date-picker'
import 'react-date-picker/index.css'

const PedidosTable = ({
  usuarios,
  clientes,
  pedidos,
  pedidoRemove,
  pedidoAdd,
  pedidoCancel,
  pedidoDetail,
  pedidoAfterSave,
  isAddingPedido,
  pedidoModalId,
  pedidoModalStart,
  pedidoModalStop,
  selectedclienteId
}) => {
  const buttonFormatter = (cell, row) => {
    if (row.id) {
      return (
        <div>
          <Button
            className="remove"
            onClick={() => {
              pedidoRemove(row);
            }}
            bsSize="xsmall"
            bsStyle="danger"
          >
            <Glyphicon glyph="remove"/>
          </Button>
          <Button
            className="play"
            onClick={() => {
              pedidoDetail(row);
            }}
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
              pedidoCancel();
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
              {textPiece('Nombre de la pedido', row.nombre_pedido)}
              {textPiece('Nombre del cliente', row.nombre_cliente)}
              {textPiece('Responsable', row.id_responsable_pedido)}
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

  const selecproductoFormatter = (cell, row) => {
    if (cell && clientes) {
      let cliente = clientes.filter(cliente => cliente.id == cell);
      if (cliente[0]) return cliente[0].nombre_cliente;
    }
  };

  const dateModalFormater = (cell, row) => {
    let formattedMoment = '';
    if (cell) {
      let momentFromCell = moment.utc(cell, "YYYY-MM-DDTHH:mm:ssZ");
      formattedMoment = momentFromCell.format('DMMMYY');
    }
    if (row.id) {
      return (
        <div>
          {formattedMoment ? formattedMoment + " " : " "}
          <Button
            bsSize="xsmall"
            onClick={() => {
              pedidoModalStart(row.id);
            }}
          >
            <Glyphicon glyph="edit"/>
          </Button>
          <Modal
            bsSize="large"
            show={(pedidoModalId == row.id)}
            onHide={() => {
              pedidoModalStop();
            }}>
            <Modal.Header closeButton>
              <Modal.Title>Seleccione una fecha</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "center"}}>
              <div>
                <MultiMonthView
                  onChange={(dateString, {dateMoment, timestamp}) => {
                    row.deadline_pedido = dateMoment.format();
                    pedidoAfterSave(row);
                    pedidoModalStop();
                  }}
                /></div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  pedidoModalStop();
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
          {moment.utc(cell, "YYYY-MM-DDTHH:mm:ssZ").format('DMMMYY')}
        </div>
      );
    }
  };

  const avanceFormatter = (cell, row) => {
    let avanceStyle = 'info';
    if (row.id) {
      if (row.avance_pedido) {
        let deadline = moment(row.deadline_pedido, "YYYY-MM-DDTHH:mm:ssZ");
        if (moment().isAfter(deadline, 'day') && row.avance_pedido < 100) {
          avanceStyle = 'danger';
        } else if (row.avance_pedido == 100) {
          avanceStyle = 'success';
        }
        return (
          <div>
            <ProgressBar
              now={Number(row.avance_pedido)}
              label={`${row.avance_pedido}%`}
              bsStyle={avanceStyle}/>
          </div>
        );
      } else {
        return (<Glyphicon glyph="alert"/>);
      }
    }
  }

  const beforeSave = (row, cellName, cellValue) => {
    // debugger
  }

  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    beforeSaveCell: beforeSave,
    afterSaveCell: pedidoAfterSave
  };
  pedidos.map((pedido) => {
    if (pedido.clientes_table) {
      pedido.nombre_cliente = pedido.clientes_table.nombre_cliente;
    }
  });
  let pedidosData = [];
  if (selectedclienteId && selectedclienteId != 0) {
    pedidosData = pedidos.filter(pedido => pedido.cliente_id == selectedclienteId);
  } else {
    pedidosData = pedidos;
  }

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

  let idscliente = [];
  if (clientes) {
    idscliente = clientes.map((cliente) => (cliente.id));
  }

  const title = (
    <h3>Pedidos</h3>
  );
  return (
    <Panel header={title} bsStyle="primary" eventKey="2">
      <BootstrapTable
        data={isAddingPedido ? [{}, ...pedidosData] : pedidosData}
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
          dataField="nombre_pedido"
          dataSort
          headerAlign="center"
        >
          Pedido
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="cliente_id"
          dataFormat={selecproductoFormatter}
          editable={{type: 'select', options: {values: idscliente}}}
          dataSort
          headerAlign="center"
          width="100">
          cliente
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="createdAt"
          dataFormat={dateFormatter}
          editable={false}
          dataAlign="right"
          headerAlign="center"
          dataSort
          width="70">
          Creado
        </TableHeaderColumn>
        <TableHeaderColumn
          editable={false}
          dataField="deadline_pedido"
          dataFormat={dateModalFormater}
          dataSort
          headerAlign="center"
          dataAlign="right"
          width="120">
          Deadline
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="done_pedido"
          dataSort
          dataFormat={dateFormatter}
          dataAlign="right"
          editable={false}
          headerAlign="center"
          width="70">
          Done
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_responsable_pedido"
          dataSort
          dataAlign="center"
          headerAlign="center"
          dataFormat={selectUsuarioFormatter}
          editable={{type: 'select', options: {values: idsUsuario}}}
          width="65">
          <h3><Glyphicon glyph="user"/></h3>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="avance_pedido"
          width="100"
          dataAlign="center"
          headerAlign="center"
          dataSort
          dataFormat={avanceFormatter}
        >
          <h3><Glyphicon glyph="tasks"/></h3>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="button"
          dataAlign="center"
          dataFormat={buttonFormatter}
          headerAlign="center"
          editable={false}
          width="65"
        >
          <Button
            className="plus"
            onClick={pedidoAdd}
            bsStyle="primary"
          >
            <Glyphicon glyph="plus"/>
          </Button>
        </TableHeaderColumn>
      </BootstrapTable>
    </Panel>
  );
};

PedidosTable.propTypes = {
  usuarios: React.PropTypes.array.isRequired,
  clientes: React.PropTypes.array.isRequired,
  pedidos: React.PropTypes.array.isRequired,
  pedidoRemove: React.PropTypes.func.isRequired,
  pedidoAdd: React.PropTypes.func.isRequired,
  pedidoCancel: React.PropTypes.func.isRequired,
  pedidoDetail: React.PropTypes.func.isRequired,
  pedidoAfterSave: React.PropTypes.func.isRequired,
  pedidoChangeStatus: React.PropTypes.func.isRequired,
  isAddingPedido: React.PropTypes.bool.isRequired,
  selectedclienteId: React.PropTypes.number
};

export default PedidosTable;
