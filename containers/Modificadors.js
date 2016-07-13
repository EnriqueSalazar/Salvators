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
import clienteForm from '../components/clienteForm';
import PedidoForm from '../components/PedidoForm';
import ProductoForm from '../components/ProductoForm';
import clientesTable from '../components/clientesTable';
import ProductosTable from '../components/ProductosTable';
import PedidosTable from '../components/PedidosTable';
import restaurantesclientesForm from '../components/restaurantesclientesForm';
import {browserHistory} from 'react-router';
import {Grid, Col, Row, Well, Breadcrumb} from 'react-bootstrap';
import moment from 'moment';

class clientes extends Component {

  constructor(props) {
    super(props);
    this.clienteRemove = this.clienteRemove.bind(this);
    this.clienteAdd = this.clienteAdd.bind(this);
    this.clienteCancel = this.clienteCancel.bind(this);
    this.clienteDetail = this.clienteDetail.bind(this);
    this.clienteAfterSave = this.clienteAfterSave.bind(this);
    this.productoRemove = this.productoRemove.bind(this);
    this.productoAdd = this.productoAdd.bind(this);
    this.productoCancel = this.productoCancel.bind(this);
    this.productoDetail = this.productoDetail.bind(this);
    this.productoAfterSave = this.productoAfterSave.bind(this);
    this.productoChangeStatus = this.productoChangeStatus.bind(this);
    this.productoModalStart = this.productoModalStart.bind(this);
    this.productoModalStop = this.productoModalStop.bind(this);
    this.pedidoRemove = this.pedidoRemove.bind(this);
    this.pedidoAdd = this.pedidoAdd.bind(this);
    this.pedidoCancel = this.pedidoCancel.bind(this);
    this.pedidoDetail = this.pedidoDetail.bind(this);
    this.pedidoAfterSave = this.pedidoAfterSave.bind(this);
    this.pedidoChangeStatus = this.pedidoChangeStatus.bind(this);
    this.pedidoModalStart = this.pedidoModalStart.bind(this);
    this.pedidoModalStop = this.pedidoModalStop.bind(this);
    this.clienteModalStart = this.clienteModalStart.bind(this);
    this.clienteModalStop = this.clienteModalStop.bind(this);
    this.handleclienteSubmit = this.handleclienteSubmit.bind(this);
    this.handlePedidoSubmit = this.handlePedidoSubmit.bind(this);
    this.handleProductoSubmit = this.handleProductoSubmit.bind(this);
  }

  componentDidMount() {
    console.error('componentDidMount');
    let {type, selectedclienteId, selectedPedidoId, selectedProductoId} = this.props.params;
    this.props.updateRenderOptions({
      type,
      selectedclienteId,
      selectedPedidoId,
      selectedProductoId
    });
    this.props.loadclientes();
    this.props.loadProductos();
    this.props.loadPedidos();
    this.props.loadrestaurantesclientes();
  }

  componentWillReceiveProps(nextProps) {
    console.error('componentWillReceiveProps');
    let nextType = Number(nextProps.params.type);

    let nexproductoId = Number(nextProps.params.selectedclienteId);
    let nextPedidoId = Number(nextProps.params.selectedPedidoId);
    let nextProductoId = Number(nextProps.params.selectedProductoId);
    let type = Number(this.props.renderOptions.type);
    let selectedclienteId = Number(this.props.renderOptions.selectedclienteId);
    let selectedPedidoId = Number(this.props.renderOptions.selectedPedidoId);
    let selectedProductoId = Number(this.props.renderOptions.selectedProductoId);
    if ((nextType != type || nexproductoId != selectedclienteId || nextPedidoId != selectedPedidoId || nextProductoId != selectedProductoId)) {
      console.error('props changed');

      let nextRenderOptions = Object.assign(
        {}, nextProps.renderOptions,
        {
          type: nextType,
          selectedclienteId: nexproductoId,
          selectedPedidoId: nextPedidoId,
          selectedProductoId: nextProductoId
        });
      this.props.updateRenderOptions(nextRenderOptions);
      this.props.loadclientes();
      this.props.loadProductos();
      this.props.loadPedidos();
      this.props.loadrestaurantesclientes();
    }

    if (nextProps.shouldUpdateclientes) {
      console.error('shouldUpdateclientes', nextProps.shouldUpdateclientes);
      this.props.loadclientes();
    }
    if (nextProps.shouldUpdateProductos) {
      console.error('shouldUpdateProductos', nextProps.shouldUpdateProductos);
      this.props.loadProductos();
    }
    if (nextProps.shouldUpdatePedidos) {
      console.error('shouldUpdatePedidos', nextProps.shouldUpdatePedidos);
      this.props.loadPedidos();
    }
    if (nextProps.shouldUpdaterestaurantesclientes) {
      console.error('shouldUpdaterestaurantesclientes', nextProps.shouldUpdaterestaurantesclientes);
      this.props.loadrestaurantesclientes();
    }
  }

  clienteDetail(row) {
    browserHistory.push('/taskspage/' + this.props.renderOptions.type + '/' + row.id + '/0/0');
  }


  clienteRemove(row) {
    const toastrConfirmOptions = {
      onOk: () => this.props.destroycliente(row)
    };
    toastr.confirm('Seguro que desea eliminar?', toastrConfirmOptions);
  }

  clienteCancel() {
    this.props.stopAddingcliente();
  }

  clienteAdd() {
    if (!this.props.isAddingcliente) {
      this.props.startAddingcliente();
    }
  }

  clienteAfterSave(row) {
    if (row.id) {
      this.props.updatecliente(row);
    } else if (row.nombre_cliente) {
      row.type = this.props.renderOptions.type;
      this.props.createcliente(row);
      this.props.stopAddingcliente();
    } else {
      toastr.warning('Cuidado', 'Nombre del cliente requerido');
    }
  }

  productoDetail(row) {
    browserHistory.push('/taskspage/' + this.props.renderOptions.type + '/' + row.cliente_id + '/' + row.pedido_id + '/' + row.id);
  }

  productoRemove(row) {
    const toastrConfirmOptions = {
      onOk: () => this.props.destroyProducto(row)
    };
    toastr.confirm('Seguro que desea eliminar?', toastrConfirmOptions);
  }

  productoCancel() {
    this.props.stopAddingProducto();
  }

  productoModalStart(productoModalId) {
    this.props.startModalProducto(productoModalId);
  }

  productoModalStop() {
    this.props.stopModalProducto();
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

  productoAdd() {
    if (!this.props.isAddingProducto) {
      this.props.startAddingProducto();
    }
  }

  productoAfterSave(row) {
    if (row.pedido_id) {
      let newPedido = this.props.pedidos.filter(pedido => pedido.id == row.pedido_id)
      if (newPedido[0]) {
        row.cliente_id = newPedido[0].cliente_id;
      }
    }
    if (row.id) {
      if (row.estado_producto == 1) {
        row.done_producto = moment().format();
      } else {
        row.done_producto = null;
      }
      this.props.updateProducto(row);
    } else if (row.nombre_producto) {
      let selectedPedidoId = this.props.renderOptions.selectedPedidoId;
      if (row.pedido_id || selectedPedidoId != 0) {
        row.pedido_id = row.pedido_id || selectedPedidoId;
        this.props.createProducto(row);
        this.props.stopAddingProducto();
      } else {
        toastr.warning('Cuidado', 'Nombre del producto requerido');
      }

    } else {
      toastr.warning('Cuidado', 'Direccion requerida');
    }
  }


  pedidoDetail(row) {
    browserHistory.push('/taskspage/' + this.props.renderOptions.type + '/' + row.cliente_id + '/' + row.id + '/0');
  }

  pedidoRemove(row) {
    const toastrConfirmOptions = {
      onOk: () => this.props.destroyPedido(row)
    };
    toastr.confirm('Seguro que desea eliminar?', toastrConfirmOptions);
  }

  pedidoCancel() {
    this.props.stopAddingPedido();
  }

  pedidoModalStart(pedidoModalId) {
    this.props.startModalPedido(pedidoModalId);
  }

  pedidoModalStop() {
    this.props.stopModalPedido();
  }

  clienteModalStart(clienteModalId) {
    this.props.startModalcliente(clienteModalId);
  }

  clienteModalStop() {
    this.props.stopModalcliente();
  }

  pedidoChangeStatus(row) {
    (row.estado_pedido) ?
      Object.assign(row, {
        estado_pedido: false,
        done_pedido: null
      }) :
      Object.assign(row, {
        estado_pedido: true,
        done_pedido: moment()
      });
    this.props.updatePedido(row);
  }

  pedidoAdd() {
    if (!this.props.isAddingPedido) {
      this.props.startAddingPedido();
    }
  }

  pedidoAfterSave(row) {
    if (!row.avance_pedido || row.avance_pedido <= 100) {
      if (row.id) {
        if (row.avance_pedido == 100) {
          row.done_pedido = moment().format();
        } else {
          row.done_pedido = null;
        }
        this.props.updatePedido(row);
      } else if (row.nombre_pedido) {
        let selectedclienteId = this.props.renderOptions.selectedclienteId;
        if (row.cliente_id || selectedclienteId != 0) {
          row.cliente_id = row.cliente_id || selectedclienteId;
          this.props.createPedido(row);
          this.props.stopAddingPedido();
        } else {
          toastr.warning('Cuidado', 'Nombre del cliente requerido');
        }
      } else {
        toastr.warning('Cuidado', 'Nombre de la pedido requerido');
      }
    } else {
      this.props.loadPedidos();
      toastr.warning('Cuidado', '% de avance incorrecto');
    }

  }

  renderclientesTable(clientes) {
    let selectedProductoId = this.props.renderOptions.selectedProductoId;
    let selectedclienteId = this.props.renderOptions.selectedclienteId;
    let selectedPedidoId = this.props.renderOptions.selectedPedidoId;
    if (selectedclienteId == 0 && selectedPedidoId == 0 && selectedProductoId == 0) {
      return (
        <clientesTable
          clientes={clientes}
          clienteRemove={this.clienteRemove}
          clienteAdd={this.clienteAdd}
          clienteCancel={this.clienteCancel}
          clienteDetail={this.clienteDetail}
          clienteAfterSave={this.clienteAfterSave}
          clienteModalId={this.props.clienteModalId}
          clienteModalStart={this.clienteModalStart}
          clienteModalStop={this.clienteModalStop}
          isAddingcliente={this.props.isAddingcliente}
          type={this.props.renderOptions.type}
        />
      );
    }
  }

  renderPedidosTable(clientes, pedidos) {
    let selectedProductoId = this.props.renderOptions.selectedProductoId;
    let selectedPedidoId = this.props.renderOptions.selectedPedidoId;
    if (selectedPedidoId == 0 && selectedProductoId == 0) {
      return (
        <PedidosTable
          clientes={clientes}
          pedidos={pedidos}
          usuarios={this.props.usuarios}
          pedidoRemove={this.pedidoRemove}
          pedidoAdd={this.pedidoAdd}
          pedidoCancel={this.pedidoCancel}
          pedidoDetail={this.pedidoDetail}
          pedidoAfterSave={this.pedidoAfterSave}
          pedidoChangeStatus={this.pedidoChangeStatus}
          isAddingPedido={this.props.isAddingPedido}
          pedidoModalId={this.props.pedidoModalId}
          pedidoModalStart={this.pedidoModalStart}
          pedidoModalStop={this.pedidoModalStop}
          type={this.props.renderOptions.type}
          selectedclienteId={this.props.renderOptions.selectedclienteId}
        />
      );
    }
  }

  renderProductosTable(clientes, pedidos, productos) {
    let selectedProductoId = this.props.renderOptions.selectedProductoId;
    if (selectedProductoId == 0) {
      return (
        <ProductosTable
          clientes={clientes}
          pedidos={pedidos}
          productos={productos}
          usuarios={this.props.usuarios}
          productoRemove={this.productoRemove}
          productoAdd={this.productoAdd}
          productoCancel={this.productoCancel}
          productoDetail={this.productoDetail}
          productoAfterSave={this.productoAfterSave}
          productoChangeStatus={this.productoChangeStatus}
          isAddingProducto={this.props.isAddingProducto}
          productoModalId={this.props.productoModalId}
          productoModalStart={this.productoModalStart}
          productoModalStop={this.productoModalStop}
          type={this.props.renderOptions.type}
          selectedclienteId={this.props.renderOptions.selectedclienteId}
          selectedPedidoId={this.props.renderOptions.selectedPedidoId}
        />
      );
    }
  }

  handleclienteSubmit(cliente) {
    this.clienteAfterSave(cliente)
  }

  renderclienteForm() {
    let selectedclienteId = this.props.renderOptions.selectedclienteId;
    let selectedPedidoId = this.props.renderOptions.selectedPedidoId;
    let selectedProductoId = this.props.renderOptions.selectedProductoId;
    if (selectedclienteId != 0 && selectedPedidoId == 0 && selectedProductoId == 0) {
      let initialValues = this.props.clientes.filter(cliente => cliente.id == this.props.renderOptions.selectedclienteId);
      return (
        <Well>
          <clienteForm
            onSubmit={this.handleclienteSubmit}
            initialValues={initialValues[0]}
          />
        </Well>
      );
    }
  }

  handlePedidoSubmit(pedido) {
    this.pedidoAfterSave(pedido);
  }

  renderPedidoForm(clientes) {
    let selectedclienteId = this.props.renderOptions.selectedclienteId;
    let selectedPedidoId = this.props.renderOptions.selectedPedidoId;
    let selectedProductoId = this.props.renderOptions.selectedProductoId;
    if (selectedclienteId != 0 && selectedPedidoId != 0 && selectedProductoId == 0) {
      let initialValues =
        this.props.pedidos.filter(pedido => pedido.id == this.props.renderOptions.selectedPedidoId);
      return (
        <Well>
          <PedidoForm
            usuarios={this.props.usuarios}
            clientes={clientes}
            onSubmit={this.handlePedidoSubmit}
            initialValues={initialValues[0]}
          />
        </Well>
      );
    }
  }

  handleProductoSubmit(producto) {
    this.productoAfterSave(producto);
  }

  renderProductoForm(clientes, pedidos) {
    let selectedclienteId = this.props.renderOptions.selectedProductoId;
    let selectedPedidoId = this.props.renderOptions.selectedPedidoId;
    let selectedProductoId = this.props.renderOptions.selectedProductoId;
    if (selectedclienteId != 0 && selectedPedidoId != 0 && selectedProductoId != 0) {
      let initialValues =
        this.props.productos.filter(producto => producto.id == this.props.renderOptions.selectedProductoId);
      return (
        <Well>
          <ProductoForm
            clientes={clientes}
            pedidos={pedidos}
            usuarios={this.props.usuarios}
            onSubmit={this.handleProductoSubmit}
            initialValues={initialValues[0]}
          />
        </Well>
      );
    }
  }

  renderrestaurantesclientesForm() {
    let selectedclienteId = this.props.renderOptions.selectedclienteId;
    let selectedPedidoId = this.props.renderOptions.selectedPedidoId;
    let selectedProductoId = this.props.renderOptions.selectedProductoId;

    if ((selectedclienteId != 0 && selectedPedidoId == 0 && selectedProductoId == 0) ||
      (selectedclienteId != 0 && selectedPedidoId != 0 && selectedProductoId == 0) ||
      (selectedclienteId != 0 && selectedPedidoId != 0 && selectedProductoId != 0)) {
      let authUser_oms = localStorage.getItem('authUser_oms');
      let initialValues =
        this.props.restaurantesclientes.filter(restaurante =>
          restaurante.cliente_id == selectedclienteId &&
          restaurante.pedido_id == selectedPedidoId &&
          restaurante.producto_id == selectedProductoId
        );
      return (
        <restaurantesclientesForm
          restaurantesclientes={initialValues}
          usuarios={this.props.usuarios}
          restaurantesclienteUpdate={this.props.updaterestaurantescliente}
          restaurantesclienteAdd={this.props.createrestaurantescliente}
          cliente_id={selectedclienteId}
          pedido_id={selectedPedidoId}
          producto_id={selectedProductoId}
          usuario_id={authUser_oms}
        />
      );
    }
  }

  renderBreadcrumb() {
    let selectedclienteId = this.props.renderOptions.selectedclienteId;
    let selectedPedidoId = this.props.renderOptions.selectedPedidoId;
    let selectedProductoId = this.props.renderOptions.selectedProductoId;
    let type = this.props.renderOptions.type;
    let clientes = this.props.clientes;
    let pedidos = this.props.pedidos;
    let productos = this.props.productos;
    let selectedcliente = {};
    let selectedPedido = {};
    let selectedProducto = {};
    let isclienteId = typeof selectedclienteId !== "undefined";
    let isPedidoId = typeof selectedPedidoId !== "undefined";
    let isProductoId = typeof selectedProductoId !== "undefined";
    let rootString = '';
    if (type == 1) {
      rootString = 'clientes';
    } else if (type == 2) {
      rootString = 'Proyectos';
    }
    let level0;
    let level1;
    let level2;
    let level3;
    let level4;
    // debugger
    if (isclienteId && isPedidoId && isProductoId) {
      level0 = (
        <Breadcrumb.Item
          href="/">
          Home
        </Breadcrumb.Item>);
      level1 = (selectedclienteId == 0) ?
        (<Breadcrumb.Item active>
          {rootString}
        </Breadcrumb.Item>) :
        (<Breadcrumb.Item
          href={"/taskspage/" + type + "/0/0/0"}>
          {rootString}
        </Breadcrumb.Item>);
      if (selectedclienteId != 0) {
        selectedcliente = clientes.filter(cliente => cliente.id == selectedclienteId);
        level2 = (selectedPedidoId == 0) ?
          (<Breadcrumb.Item active>
            {selectedcliente[0].nombre_cliente}
          </Breadcrumb.Item>) :
          (<Breadcrumb.Item
            href={"/taskspage/" + type + "/" + selectedclienteId + "/0/0"}>
            {selectedcliente[0].nombre_cliente}
          </Breadcrumb.Item>);
      }
      if (selectedPedidoId != 0) {
        selectedPedido = pedidos.filter(pedido => pedido.id == selectedPedidoId);
        level3 = (selectedProductoId == 0) ?
          (<Breadcrumb.Item active>
            {selectedPedido[0].nombre_pedido}
          </Breadcrumb.Item>) :
          (<Breadcrumb.Item
            href={"/taskspage/" + type + "/" + selectedclienteId + "/" + selectedPedidoId + "/0"}>
            {selectedPedido[0].nombre_pedido}
          </Breadcrumb.Item>);

      }
      if (selectedProductoId != 0) {
        selectedProducto = productos.filter(producto => producto.id == selectedProductoId);
        level4 =
          (<Breadcrumb.Item active>
            {selectedProducto[0].nombre_producto}
          </Breadcrumb.Item>);
      }
      return (<Breadcrumb>{level0}{level1}{level2}{level3}{level4}</Breadcrumb>);
    }
  }

  render() {
    let selectedclienteId = this.props.renderOptions.selectedclienteId;
    let selectedPedidoId = this.props.renderOptions.selectedPedidoId;
    let isclienteId = typeof selectedclienteId !== "undefined";
    let isPedidoId = typeof selectedPedidoId !== "undefined";
    let clientesLength = this.props.clientes.length;
    let productosLength = this.props.productos.length;
    let pedidosLength = this.props.pedidos.length;

    if (isclienteId && isPedidoId && clientesLength > 0 && pedidosLength > 0 && productosLength > 0) {
      let type = this.props.renderOptions.type;
      let clientesData = this.props.clientes.filter(cliente => cliente.type == type);
      let pedidosData = this.props.pedidos.filter(pedido => {
        if (pedido.clientes_table && pedido.clientes_table.type) {
          return (pedido.clientes_table.type == type);
        }
      });
      let productosData = this.props.productos.filter(producto => {
        if (producto.pedidos_table && producto.pedidos_table.clientes_table && producto.pedidos_table.clientes_table.type) {
          return (producto.pedidos_table.clientes_table.type == type);
        }
      });


      return (
        <div>
          {/*{this.renderBreadcrumb()}*/}
          <Grid>
            {/*<Row>*/}
              {/*<Col md={12}>*/}
                {/*{this.renderclienteForm()}*/}
              {/*</Col>*/}
            {/*</Row>*/}
            {/*<Row>*/}
              {/*<Col md={12}>*/}
                {/*{this.renderPedidoForm(clientesData)}*/}
              {/*</Col>*/}
            {/*</Row>*/}
            {/*<Row>*/}
              {/*<Col md={12}>*/}
                {/*{this.renderProductoForm(clientesData, pedidosData)}*/}
              {/*</Col>*/}
            {/*</Row>*/}
            {/*<Row>*/}
              {/*<Col md={12}>*/}
                {/*{this.renderrestaurantesclientesForm()}*/}
              {/*</Col>*/}
            {/*</Row>*/}
            {/*<Row>*/}
              {/*<Col md={12}>*/}
                {/*{this.renderclientesTable(clientesData)}*/}
              {/*</Col>*/}
            {/*</Row>*/}
            {/*<Row>*/}
              {/*<Col md={12}>*/}
                {/*{this.renderPedidosTable(clientesData, pedidosData)}*/}
              {/*</Col>*/}
            {/*</Row>*/}
            <Row>
              <Col md={12}>
                {this.renderProductosTable(clientesData, pedidosData, productosData)}
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else return null;


  }
}

clientes.propTypes = {
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
})(clientes);
