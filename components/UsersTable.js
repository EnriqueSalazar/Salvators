import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button, Panel, Glyphicon, Modal} from 'react-bootstrap';
import {MultiMonthView} from 'react-date-picker'
import moment from 'moment';

const clientesTable = ({
  clientes,
  clienteRemove,
  clienteAdd,
  clienteCancel,
  clienteDetail,
  clienteAfterSave,
  isAddingcliente,
  clienteModalId,
  clienteModalStart,
  clienteModalStop,
  type
}) => {

  const buttonFormatter = (cell, row) => {
    if (row.id) {
      return (
        <div>
          <Button
            className="remove"
            onClick={() => {
              clienteRemove(row);
            }}
            bsSize="xsmall"
            bsStyle="danger"
          >
            <Glyphicon glyph="remove"/>
          </Button>
          <Button
            className="play"
            onClick={() => {
              clienteDetail(row);
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
              clienteCancel();
            }}
            bsSize="xsmall"
            bsStyle="danger"
          >
            <Glyphicon glyph="remove"/>
          </Button>
        </div>);
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
              clienteModalStart(row.id);
            }}
          >
            <Glyphicon glyph="edit"/>
          </Button>
          <Modal
            bsSize="large"
            show={(clienteModalId == row.id)}
            onHide={() => {
              clienteModalStop();
            }}>
            <Modal.Header closeButton>
              <Modal.Title>Seleccione una fecha</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "center"}}>
              <div>
                <MultiMonthView
                  onChange={(dateString, {dateMoment, timestamp}) => {
                    row.deadline_proyecto = dateMoment.format();
                    clienteAfterSave(row);
                    clienteModalStop();
                  }}
                /></div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  clienteModalStop();
                }}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  };

  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: clienteAfterSave
  };
  const title = (
    <h3>clientes</h3>
  );

  return (
    <Panel header={title} bsStyle="primary" eventKey="1">
      <BootstrapTable
        data={isAddingcliente ? [{}, ...clientes] : clientes}
        striped
        hover
        pagination
        search
        clearSearch
        cellEdit={cellEditProp}
      >
        <TableHeaderColumn
          dataField="id"
          isKey dataAlign="center"
          dataSort hidden
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="type"
          dataAlign="center"
          dataSort hidden
        >
          Type
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="nombre_cliente"
          dataSort
          headerAlign="center"
        >
          Nombre
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="descripcion_cliente"
          headerAlign="center"
        >
          Descripcion
        </TableHeaderColumn>
        <TableHeaderColumn
          editable={false}
          dataField="deadline_proyecto"
          dataFormat={dateModalFormater}
          dataSort
          hidden={type!=2}
          headerAlign="center"
          dataAlign="right"
          width="120">
          Deadline
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="button"
          dataFormat={buttonFormatter}
          editable={false}
          width="65">
          <Button
            className="plus"
            onClick={clienteAdd}
            bsStyle="primary">
            <Glyphicon glyph="plus"/>
          </Button>
        </TableHeaderColumn>
      </BootstrapTable>
    </Panel>
  );
};

clientesTable.propTypes = {
  clientes: React.PropTypes.array.isRequired,
  clienteRemove: React.PropTypes.func.isRequired,
  clienteAdd: React.PropTypes.func.isRequired,
  clienteCancel: React.PropTypes.func.isRequired,
  clienteDetail: React.PropTypes.func.isRequired,
  clienteAfterSave: React.PropTypes.func.isRequired,
  isAddingcliente: React.PropTypes.bool.isRequired,
  type: React.PropTypes.number.isRequired,
  clienteModalId: React.PropTypes.number.isRequired,
  clienteModalStart: React.PropTypes.func.isRequired,
  clienteModalStop: React.PropTypes.func.isRequired
};

export default clientesTable;
