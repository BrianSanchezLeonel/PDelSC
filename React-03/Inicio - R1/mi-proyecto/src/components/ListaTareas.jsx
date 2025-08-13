import React, { useState } from 'react';

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return;
    setTareas([...tareas, { texto: nuevaTarea, completada: false }]);
    setNuevaTarea('');
  };

  const marcarCompletada = (index) => {
    const tareasActualizadas = [...tareas];
    tareasActualizadas[index].completada = !tareasActualizadas[index].completada;
    setTareas(tareasActualizadas);
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Tareas</h2>

      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nueva tarea..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
        />
        <button className="btn btn-primary" onClick={agregarTarea}>
          Agregar
        </button>
      </div>

      <ul className="list-group">
        {tareas.map((tarea, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              tarea.completada ? 'list-group-item-success' : ''
            }`}
          >
            <span
              onClick={() => marcarCompletada(index)}
              style={{
                cursor: 'pointer',
                textDecoration: tarea.completada ? 'line-through' : 'none'
              }}
            >
              {tarea.texto}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}