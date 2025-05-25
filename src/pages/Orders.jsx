import { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import LogoutButton from '../components/LogoutButton';
import api from '../services/api';

export default function Orders() {
  const [ordenes, setOrdenes] = useState([]);

  const fetchOrdenes = async () => {
    try {
      const res = await api.get('/orders');
      setOrdenes(res.data);
    } catch (err) {
      console.error('❌ Error al obtener órdenes:', err);
    }
  };

  useEffect(() => {
    fetchOrdenes();
  }, []);

  return (
    <div>
      <h1>📦 Gestión de Órdenes</h1>
      <LogoutButton />
      <OrderForm onOrderCreated={fetchOrdenes} />
      <OrderList ordenes={ordenes} />
    </div>
  );
}
