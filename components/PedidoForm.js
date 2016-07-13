import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {MonthView} from 'react-date-picker'
import 'react-date-picker/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import {
  Button,
  Glyphicon,
  ProgressBar,
  Row, Col, Grid,
  Input, FormControl, Label
} from 'react-bootstrap';
import moment from 'moment';
export const fields = [
  'id',
  'nombre_pedido',
  'avance_pedido',
  'deadline_pedido',
  'id_responsable_pedido',
  'cliente_id',
  'done_pedido'];

class PedidoForm extends Component {


  render() {
    const {
      fields: {
        id,
        nombre_pedido,
        avance_pedido,
        deadline_pedido,
        id_responsable_pedido,
        cliente_id,
        done_pedido
      },
      handleSubmit,
      clientes,
      usuarios
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Row>
            <Col md={6}>
              <Input
                type="text"
                name="nombre_pedido"
                label="Nombre pedido"
                {...nombre_pedido}/>
              <label>Responsable</label>
              <FormControl
                componentClass="select"
                placeholder="select"
                {...id_responsable_pedido}>
                <option value="">
                  Seleccione un usuario...
                </option>
                {usuarios.map(usuario =>
                  <option
                    value={usuario.id}
                    key={usuario.id}>
                    {usuario.nombre_usuario}
                  </option>)}
              </FormControl>
              <label>cliente</label>
              <FormControl
                componentClass="select"
                placeholder="select"
                {...cliente_id}>
                <option value="">
                  Seleccione un cliente...
                </option>
                {clientes.map(cliente =>
                  <option
                    value={cliente.id}
                    key={cliente.id}>
                    {cliente.nombre_cliente}
                  </option>)}
              </FormControl>
              <Row>
                <Col md={6}>
                  <Input
                    type="text"
                    name="avance_pedido"
                    label="Avance"
                    {...avance_pedido}/>
                </Col>
                <Col md={6}>
                  <label>Done </label><br />
                  <h4>
                    <Label
                      bsStyle={done_pedido.initialValue ? 'success' : 'warning'}>
                      {moment(done_pedido.initialValue).format("DD MMMM YYYY")}
                    </Label>
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <ProgressBar
                    now={Number(avance_pedido.initialValue)}
                    label={`${avance_pedido.initialValue}%`}/>
                </Col>
              </Row>
            </Col>
            <Col md={5} mdOffset={1}>
              <label>Deadline </label><br />
              <MonthView
                defaultDate={deadline_pedido.initialValue}
                forceValidDate
                dateFormat="YYYY-MM-DD"
                {...deadline_pedido}>
              </MonthView>
            </Col>
          </Row>
          <Row>
            <Col md={5}>

            </Col>
            <Col md={5}>

            </Col>
          </Row>

          <Row><Button
            type="submit"
            bsStyle="primary">
            Guardar <Glyphicon glyph="floppy-save"/>
          </Button>
          </Row>
        </Grid>
      </form>
    );
  }
}

PedidoForm.reduxForm = {
  fields: PropTypes.object.isRequired,
  clientes: PropTypes.array.isRequired,
  usuarios: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'pedidoform',
  fields
})(PedidoForm);
