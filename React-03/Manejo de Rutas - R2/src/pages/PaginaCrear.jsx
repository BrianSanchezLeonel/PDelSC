import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaginaCrear = ({ agregarTarea }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [completa, setCompleta] = useState(false);
  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();

    const nuevaTarea = {
      id: Date.now(),
      titulo,
      descripcion,
      descripcionCompleta: descripcion,
      fechaCreacion: new Date().toISOString().split('T')[0],
      completa
    };

    agregarTarea(nuevaTarea);
    navigate('/');
  };

  return (
    <div>
      <h1>Crear nueva tarea</h1>
      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </div>
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" checked={completa} onChange={() => setCompleta(!completa)} />
          <label className="form-check-label">Marcar como completada</label>
        </div>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
    </div>
  );
};

export default PaginaCrear;