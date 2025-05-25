import { useEffect, useState } from 'react';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import api from '../services/api';
import '../OrdersPage.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch {
      console.error('Error al obtener órdenes');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-wrapper">
      <div className="orders-header">
        <h1>📦 Gestión de Órdenes</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            window.location.href = '/login';
          }}
        >
          🚪 Cerrar sesión
        </button>
      </div>

      <div className="orders-page">
        <div className="column left">
          <OrderForm onOrderCreated={fetchOrders} />
        </div>
        <div className="column right">
          <OrderList orders={orders} />
        </div>
      </div>
    </div>
  );
}
