import React from 'react';
import { Link } from 'react-router-dom';

const PaginaInicio = ({ tareas }) => {
  return (
    <div>
      <h1>Lista de Tareas</h1>
      <div className="list-group">
        {tareas.map((tarea) => (
          <Link key={tarea.id} to={`/tarea/${tarea.id}`} className="list-group-item list-group-item-action">
            <h5 className="mb-1">{tarea.titulo}</h5>
            <p className="mb-1">{tarea.descripcion}</p>
          </Link>
        ))}
      </div>
      <Link to="/crear" className="btn btn-primary mt-4">Crear nueva tarea</Link>
    </div>
  );
};

export default PaginaInicio;