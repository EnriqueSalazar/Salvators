import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr';
import {
  loadclientes,
  destroycliente,
  createcliente,
  updatecliente,
  stopAddingcliente,
  startAddingcliente,
  updateRenderOptions,
  startModalcliente,
  stopModalcliente
} from '../actions/clienteActions';
import {
  loadProductos,
  destroyProducto,
  createProducto,
  updateProducto,
  stopAddingProducto,
  startAddingProducto,
  startModalProducto,
  stopModalProducto
} from '../actions/productoActions';
import {
  loadPedidos,
  destroyPedido,
  createPedido,
  updatePedido,
  stopAddingPedido,
  startAddingPedido,
  startModalPedido,
  stopModalPedido
} from '../actions/pedidoActions';
import {
  loadrestaurantesclientes,
  destroyrestaurantescliente,
  createrestaurantescliente,
  updaterestaurantescliente
} from '../actions/restaurantesclienteActions';
import Hopedidoble from '../components/Hopedidoble';
import HomeButtons from '../components/HomeButtons';
import {browserHistory} from 'react-router';
import {Grid, Col, Row, Well, Breadcrumb, Jumbotron} from 'react-bootstrap';
import moment from 'moment';


class Home extends Component {

  constructor(props) {
    super(props);
    this.productoChangeStatus = this.productoChangeStatus.bind(this);
  }

  componentDidMount() {
    console.error('componentDidMount');
    this.props.loadclientes();
    this.props.loadProductos();
  }

  componentWillReceiveProps(nextProps) {
    console.error('componentWillReceiveProps');

    if (nextProps.shouldUpdateclientes) {
      console.error('shouldUpdateclientes', nextProps.shouldUpdateclientes);
      this.props.loadclientes();
    }
    if (nextProps.shouldUpdateProductos) {
      console.error('shouldUpdateProductos', nextProps.shouldUpdateProductos);
      this.props.loadProductos();
    }
  }

  clienteDetail(row) {
    browserHistory.push('/taskspage/' + this.props.renderOptions.type + '/' + row.id + '/0/0');
  }

  productoDetail(row) {
    browserHistory.push('/taskspage/' + this.props.renderOptions.type + '/' + row.cliente_id + '/' + row.pedido_id + '/' + row.id);
  }

  productoChangeStatus(row) {
    (row.estado_producto) ?
      Object.assign(row, {
        estado_producto: false,
        done_producto: null
      }) :
      Object.assign(row, {
        estado_producto: true,
        done_producto: moment()
      });
    this.props.updateProducto(row);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Jumbotron>
              <h1>Salvator's</h1>
              {/*<p>Operations Management System</p>*/}
              {/*<Link to="about" className="btn btn-primary btn-lg">Learn more</Link>*/}
            </Jumbotron>
          </Col>
        </Row>
        {/*<Row>*/}
          {/*<Col md={2}>*/}
            {/*<HomeButtons*/}
              {/*type={1}*/}
              {/*clientes={this.props.clientes}*/}
              {/*bsStyle="primary"/>*/}
          {/*</Col>*/}
          {/*<Col md={2}>*/}
            {/*<HomeButtons*/}
              {/*type={2}*/}
              {/*clientes={this.props.clientes}*/}
              {/*bsStyle="success"/>*/}
          {/*</Col>*/}
          {/*<Col md={8}>*/}
            {/*<Hopedidoble*/}
              {/*productos={this.props.productos}*/}
              {/*usuarios={this.props.usuarios}*/}
              {/*productoChangeStatus={this.productoChangeStatus}*/}
            {/*/>*/}
          {/*</Col>*/}
        {/*</Row>*/}
        <Row>
          <Col md={12}>

          </Col>
        </Row>
      </Grid>

    );
  }

}

Home.propTypes = {
  usuarios: PropTypes.array.isRequired,
  clientes: PropTypes.array.isRequired,
  isAddingcliente: PropTypes.bool.isRequired,
  shouldUpdateclientes: PropTypes.bool.isRequired,
  loadclientes: PropTypes.func,
  destroycliente: PropTypes.func,
  createcliente: PropTypes.func,
  updatecliente: PropTypes.func,
  restaurantesclientes: PropTypes.array.isRequired,
  shouldUpdaterestaurantesclientes: PropTypes.bool.isRequired,
  loadrestaurantesclientes: PropTypes.func,
  destroyrestaurantescliente: PropTypes.func,
  createrestaurantescliente: PropTypes.func,
  updaterestaurantescliente: PropTypes.func,
  startAddingcliente: PropTypes.func,
  stopAddingcliente: PropTypes.func,
  renderOptions: PropTypes.object.isRequired,
  productos: PropTypes.array.isRequired,
  isAddingProducto: PropTypes.bool.isRequired,
  shouldUpdateProductos: PropTypes.bool.isRequired,
  loadProductos: PropTypes.func,
  destroyProducto: PropTypes.func,
  createProducto: PropTypes.func,
  updateProducto: PropTypes.func,
  startAddingProducto: PropTypes.func,
  stopAddingProducto: PropTypes.func,
  startModalProducto: PropTypes.func,
  stopModalProducto: PropTypes.func,
  pedidos: PropTypes.array.isRequired,
  isAddingPedido: PropTypes.bool.isRequired,
  shouldUpdatePedidos: PropTypes.bool.isRequired,
  loadPedidos: PropTypes.func,
  destroyPedido: PropTypes.func,
  createPedido: PropTypes.func,
  updatePedido: PropTypes.func,
  startAddingPedido: PropTypes.func,
  stopAddingPedido: PropTypes.func,
  startModalPedido: PropTypes.func,
  stopModalPedido: PropTypes.func
};

function mapStateToProps(state) {
  const {
    clientesReducer,
    productosReducer,
    pedidosReducer,
    usuariosReducer,
    restaurantesclientesReducer
  } = state;
  const {usuarios} = usuariosReducer;
  const {restaurantesclientes, shouldUpdaterestaurantesclientes} = restaurantesclientesReducer;
  const {clientes, isAddingcliente, shouldUpdateclientes, renderOptions, clienteModalId} = clientesReducer;
  const {productos, isAddingProducto, shouldUpdateProductos, productoModalId} = productosReducer;
  const {pedidos, isAddingPedido, shouldUpdatePedidos, pedidoModalId} = pedidosReducer;
  return {
    clientes,
    isAddingcliente,
    shouldUpdateclientes,
    renderOptions,
    clienteModalId,
    productos,
    isAddingProducto,
    shouldUpdateProductos,
    productoModalId,
    pedidos,
    isAddingPedido,
    shouldUpdatePedidos,
    pedidoModalId,
    usuarios,
    shouldUpdaterestaurantesclientes,
    restaurantesclientes
  };
}

export default connect(mapStateToProps, {
  loadclientes,
  destroycliente,
  createcliente,
  updatecliente,
  startAddingcliente,
  stopAddingcliente,
  updateRenderOptions,
  startModalcliente,
  stopModalcliente,
  loadProductos,
  destroyProducto,
  createProducto,
  updateProducto,
  stopAddingProducto,
  startAddingProducto,
  startModalProducto,
  stopModalProducto,
  loadPedidos,
  destroyPedido,
  createPedido,
  updatePedido,
  stopAddingPedido,
  startAddingPedido,
  startModalPedido,
  stopModalPedido,
  loadrestaurantesclientes,
  destroyrestaurantescliente,
  createrestaurantescliente,
  updaterestaurantescliente
})(Home);
