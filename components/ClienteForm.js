import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {
  Button,
  Glyphicon,
  Row,
  Col,
  Input
} from 'react-bootstrap';
export const fields = ['id', 'nombre_cliente', 'descripcion_cliente'];

class clienteForm extends Component {
  render() {
    const {
      fields: {id, nombre_cliente, descripcion_cliente},
      handleSubmit
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Input type="text" name="nombre_cliente" label="Nombre cliente" {...nombre_cliente}/>
          </Col>
          <Col md={6}>
            <Input type="text" name="descripcion_cliente" label="Descripcion cliente" {...descripcion_cliente}/>
          </Col>
        </Row>
        <Button
          type="submit"
          bsStyle="primary"
        >
          Guardar <Glyphicon glyph="floppy-save"/>
        </Button>

      </form>
    );
  }
}

clienteForm.reduxForm = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'clienteform',
  fields
})(clienteForm);
