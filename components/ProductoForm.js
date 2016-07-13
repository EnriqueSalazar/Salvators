import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {MonthView} from 'react-date-picker'
import 'react-date-picker/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import {
  Button, Checkbox,
  Glyphicon,
  Row, Col, Grid,
  Input, FormControl, Label
} from 'react-bootstrap';
import moment from 'moment';
export const fields = ['id',
  'nombre_producto',
  'pedido_id',
  'deadline_producto',
  'done_producto',
  'estado_producto',
  'id_responsable_producto'];

class ProductoForm extends Component {


  render() {
    const {
      fields: {
        id,
        nombre_producto,
        pedido_id,
        deadline_producto,
        done_producto,
        estado_producto,
        id_responsable_producto
      },
      handleSubmit,
      pedidos,
      clientes,
      usuarios
    } = this.props;
    // debugger
    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          <Row>
            <Col md={6}>
              <Input
                type="text"
                name="nombre_producto"
                label="Nombre producto"
                {...nombre_producto}/>
              <label>Responsable</label>
              <FormControl
                componentClass="select"
                placeholder="select"
                {...id_responsable_producto}>
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
              <Row>
                <Col md={6}>
                  <label>Pedido</label>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    {...pedido_id}>
                    <option value="">
                      Seleccione una pedido...
                    </option>
                    {pedidos.map(pedido =>
                      <option
                        value={pedido.id}
                        key={pedido.id}>
                        {pedido.nombre_pedido}
                      </option>)}
                  </FormControl>
                </Col>
                <Col md={6}>
                  <label>cliente</label><br />
                     {clientes.map(cliente =>
                       cliente.id == pedido_id.initialValue ? cliente.nombre_cliente : ''
                     )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Checkbox {...estado_producto}>Realizado</Checkbox>
                     {/*<input type="checkbox" {...estado_producto}/> Estado*/}
                </Col>
                <Col md={6}>
                  <label>Done </label><br />
                  <h4>
                    <Label
                      bsStyle={done_producto.initialValue ? 'success' : 'warning'}>
                      {moment(done_producto.initialValue).format("DD MMMM YYYY")}
                    </Label>
                  </h4>
                </Col>
              </Row>

            </Col>
            <Col md={5} mdOffset={1}>
              <label>Deadline </label><br />
              <MonthView
                defaultDate={deadline_producto.initialValue}
                forceValidDate
                dateFormat="YYYY-MM-DD"
                {...deadline_producto}>
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

ProductoForm.reduxForm = {
  fields: PropTypes.object.isRequired,
  clientes: PropTypes.array.isRequired,
  pedidos: PropTypes.array.isRequired,
  usuarios: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'productoform',
  fields
})(ProductoForm);
