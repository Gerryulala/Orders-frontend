import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../styles/App.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [redirigir, setRedirigir] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.user_id);
      toast.success('✅ Inicio de sesión exitoso');
      setTimeout(() => setRedirigir(true), 1500);
    } catch (err) {
      toast.error('❌ Error al iniciar sesión');
    }
  };

  useEffect(() => {
    if (redirigir) {
      navigate('/orders');
    }
  }, [redirigir, navigate]);

 return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleLogin}>
        <h2>🔐 Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
          ¿No tienes cuenta?{' '}
          <span
            style={{ color: '#ae66ff', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/register')}
          >
            Regístrate aquí
          </span>
        </p>
      </form>
    </div>
  );
}