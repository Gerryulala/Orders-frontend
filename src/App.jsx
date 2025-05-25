import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import OrdersPage from './components/OrdersPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ RUTA PROTEGIDA */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
    <OrdersPage />
            </ProtectedRoute>
          }
        />

        {/* Redirige cualquier otra ruta */}
        <Route path="*" element={<Navigate to="/orders" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
