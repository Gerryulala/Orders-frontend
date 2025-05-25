import { useState } from 'react';
import StatusBadge from '../StatusBadge';
import './OrderList.css'; // ✅ y asegúrate de importar los estilos correctamente

export default function OrderList({ orders }) {
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchUser = order.user_id.toString().includes(search);
    const matchEstado = order.estado.toLowerCase().includes(search.toLowerCase());
    const matchProducto = order.productos.some(p =>
      p.nombre.toLowerCase().includes(search.toLowerCase())
    );
    return matchUser || matchEstado || matchProducto;
  });

  return (
    <div className="order-list-wrapper">
      <div className="order-list-container">
        <h2>📦 Órdenes</h2>

        <input
          className="search-input"
          placeholder="🔍 Buscar por producto, usuario o estado..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredOrders].sort((a, b) => b.id - a.id).map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user_id}</td>
                  <td>
                    <ul>
                      {order.productos.map((p, i) => (
                        <li key={i}>{p.nombre} x{p.cantidad}</li>
                      ))}
                    </ul>
                  </td>
                  <td>${order.total}</td>
                  <td><StatusBadge estado={order.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
