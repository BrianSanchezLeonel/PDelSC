import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PaginaDetalle = ({ obtenerTarea }) => {
  const { id } = useParams();
  const tarea = obtenerTarea(id);

  if (!tarea) return <p>Tarea no encontrada.</p>;

  return (
    <div>
      <h1>{tarea.titulo}</h1>
      <p>{tarea.descripcionCompleta}</p>
      <p><strong>Fecha:</strong> {tarea.fechaCreacion}</p>
      <p><strong>Estado:</strong> {tarea.completa ? "Completa" : "Incompleta"}</p>
      <Link to="/" className="btn btn-secondary mt-3">Volver</Link>
    </div>
  );
};

export default PaginaDetalle;