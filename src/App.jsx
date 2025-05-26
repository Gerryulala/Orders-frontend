import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

        <Route path="*" element={<Navigate to="/orders" />} />
      </Routes>

      {/* ✅ Notificaciones globales */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </BrowserRouter>
  );
}

export default App;
