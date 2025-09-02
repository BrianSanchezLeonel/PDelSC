import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PaginaEditar = ({ obtenerTarea, editarTarea }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tarea = obtenerTarea(id);

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [completa, setCompleta] = useState(false);

  useEffect(() => {
    if (tarea) {
      setTitulo(tarea.titulo);
      setDescripcion(tarea.descripcionCompleta);
      setCompleta(tarea.completa);
    }
  }, [tarea]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    const tareaActualizada = {
      ...tarea,
      titulo,
      descripcion,
      descripcionCompleta: descripcion,
      completa,
    };
    editarTarea(tareaActualizada);
    navigate(`/tarea/${id}`);
  };

  if (!tarea) return <p>Tarea no encontrada.</p>;

  return (
    <div>
      <h1>Editar Tarea</h1>
      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={completa}
            onChange={() => setCompleta(!completa)}
          />
          <label className="form-check-label">Marcar como completada</label>
        </div>

        <button type="submit" className="btn btn-success">Guardar cambios</button>
      </form>
    </div>
  );
};

export default PaginaEditar;