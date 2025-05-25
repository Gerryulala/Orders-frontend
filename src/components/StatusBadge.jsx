export default function StatusBadge({ estado }) {
  const color = {
    PENDIENTE: 'orange',
    PROCESADO: 'blue',
    ENVIADO: 'green',
    CANCELADO: 'red',
  }[estado?.toUpperCase()] || 'gray';

  return (
    <span style={{
      backgroundColor: color,
      color: 'white',
      padding: '4px 8px',
      borderRadius: '5px',
      fontWeight: 'bold',
    }}>
      {estado}
    </span>
  );
}
