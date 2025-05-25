import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    toast.info('👋 Sesión cerrada');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
      🔒 Cerrar sesión
    </button>
  );
}
