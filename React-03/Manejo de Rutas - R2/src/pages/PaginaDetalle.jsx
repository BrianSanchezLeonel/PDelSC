import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PaginaDetalle = ({ obtenerTarea, eliminarTarea }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tarea = obtenerTarea(id);

  if (!tarea) return <p>Tarea no encontrada.</p>;

  const handleEliminar = () => {
    if (confirm("¿Estás seguro de eliminar esta tarea?")) {
      eliminarTarea(tarea.id);
      navigate('/');
    }
  };

  return (
    <div>
      <h1>{tarea.titulo}</h1>
      <p>{tarea.descripcionCompleta}</p>
      <p><strong>Fecha:</strong> {tarea.fechaCreacion}</p>
      <p><strong>Estado:</strong> {tarea.completa ? "Completa" : "Incompleta"}</p>

      <Link to={`/editar/${tarea.id}`} className="btn btn-warning me-2">Editar</Link>
      <button onClick={handleEliminar} className="btn btn-danger">Eliminar</button>
      <br />
      <Link to="/" className="btn btn-secondary mt-3">Volver</Link>
    </div>
  );
};

export default PaginaDetalle;