import React, { useState } from 'react';
import ProductCard from './Components/ProductCard'

const productos = [
  { id: 1, nombre: 'Papitas', precio: 2, imagen: 'https://s7d1.scene7.com/is/image/mcdonalds/COM_1PUB_Meal_FreeLargeFries:1-column-desktop?resmode=sharp2' },
  { id: 2, nombre: 'Hamburguesas', precio: 20, imagen: 'https://s7d1.scene7.com/is/image/mcdonalds/1PUB_bestburger_trendingnow:1-column-desktop?resmode=sharp2' },
  { id: 3, nombre: 'Combos', precio: 30, imagen: 'https://s7d1.scene7.com/is/image/mcdonalds/1PUB_DigitalExperience_McDelivery:1-column-desktop?resmode=sharp2' },
  { id: 4, nombre: 'Camiseta Deportiva', precio: 20, imagen: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5ee24b019f8640e886ffd3e19a6f2fc8_9366/Camiseta_de_Entrenamiento_Power_Rosa_IX9092_HM1.jpg' },
];

const TiendaVirtual = () => {
  const [carrito, setCarrito] = useState([]);
  const [buscar, setBuscar] = useState('');

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const EliminarElementocarrito = (idProducto) => {
    const index = carrito.findIndex((item)=>item.id==idProducto)
    if(index !== -1){
      const newCarrito = [...carrito]
      newCarrito.splice(index,1)
      setCarrito(newCarrito)
    }
  };


  const filter = productos.filter((producto)=> producto.nombre.toLowerCase().includes(buscar.toLowerCase()))
  console.log(filter)

  return (
    <div className="container">
      <h1>Mi Tienda Virtual</h1>

      <input type="text" onChange={(e)=>setBuscar(e.target.value)}/>
      
      <div className="productos-grid">
        {filter.length>0? filter.map((producto) => (
          <ProductCard 
            key={producto.id} 
            producto={producto} 
            onAgregarAlCarrito={agregarAlCarrito}
          />
        )):(<p>No se encuentran productos</p>)}
      </div>
      
      <div className="carrito">
        <h2>Carrito</h2>
        <div className="boton-agregar">
          <p>{carrito.length} artículos</p>
          <button onClick={() => vaciarCarrito()}>Vaciar carrito</button>
        </div>
        <ul className="mt-2">
          {carrito.map((item, index) => (
            <div key={index} className="carrito-item ">
              <img 
                src={item.imagen} 
                alt={item.nombre} 
                className="carrito-item-imagen"
              />
              <span>{item.nombre} - ${item.precio}</span>
              <button onClick={() => EliminarElementocarrito(item.id)}>Eliminar</button>
            </div>
          ))}
        </ul>
        <p className="carrito-total">
          Total: ${carrito.reduce((sum, item) => sum + item.precio, 0)}
        </p>
      </div>
    </div>
  );
};

export default TiendaVirtual;