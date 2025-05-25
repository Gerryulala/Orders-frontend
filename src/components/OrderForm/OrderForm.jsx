import { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import '../OrderForm/OrderForm.css'; // 🧠 Asegúrate de importar tu CSS

export default function OrderForm({ onOrderCreated }) {
  const [productos, setProductos] = useState([{ nombre: '', cantidad: 1, precio: 0 }]);
  const [total, setTotal] = useState('');
  const [estado, setEstado] = useState('PENDIENTE');

  // ✅ Calcula total automáticamente al cambiar cantidad/precio
  useEffect(() => {
    const suma = productos.reduce(
      (acc, p) => acc + (Number(p.cantidad) * Number(p.precio)),
      0
    );
    setTotal(suma.toFixed(2));
  }, [productos]);

  const handleChangeProducto = (index, field, value) => {
    const updated = [...productos];
    updated[index][field] = field === 'cantidad' || field === 'precio' ? Number(value) : value;
    setProductos(updated);
  };

  const agregarProducto = () => {
    setProductos([...productos, { nombre: '', cantidad: 1, precio: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        user_id: Number(localStorage.getItem('user_id')),
        productos,
        total: Number(total),
        estado,
      };
      await api.post('/orders', payload);

      toast.success('✅ Orden creada exitosamente');
      setProductos([{ nombre: '', cantidad: 1, precio: 0 }]);
      setTotal('');
      setEstado('PENDIENTE');
      onOrderCreated?.();
    } catch (err) {
      console.error(err);
      toast.error('❌ Error al crear la orden');
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>🛒 Crear nueva orden</h2>

        {productos.map((prod, index) => (
          <div key={index} className="product-group">
            <label>Nombre del producto</label>
            <input
              placeholder="Ej. Camiseta"
              value={prod.nombre}
              onChange={e => handleChangeProducto(index, 'nombre', e.target.value)}
              required
            />

            <label>Cantidad</label>
            <input
              type="number"
              placeholder="Cantidad"
              value={prod.cantidad}
              onChange={e => handleChangeProducto(index, 'cantidad', e.target.value)}
              required
            />

            <label>Precio unitario</label>
            <input
              type="number"
              placeholder="Precio"
              value={prod.precio}
              onChange={e => handleChangeProducto(index, 'precio', e.target.value)}
              required
            />
          </div>
        ))}

        <button type="button" className="secondary-button" onClick={agregarProducto}>
          ➕ Agregar producto
        </button>

        <label>Total</label>
        <input
          type="number"
          value={total}
          readOnly
        />

        <label>Estado</label>
        <select value={estado} onChange={e => setEstado(e.target.value)} className="estado-select">
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="PROCESADO">PROCESADO</option>
          <option value="ENVIADO">ENVIADO</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>

        <button type="submit">📝 Crear Orden</button>
      </form>
    </div>
  );
}
