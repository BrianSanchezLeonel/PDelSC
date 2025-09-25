import React, { useState } from "react";

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  const mostrarMensaje = (texto, tipo = "danger") => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje({ texto: "", tipo: "" }), 3000);
  };

  const agregarTarea = () => {
    if (nuevaTarea.trim() === "") {
      mostrarMensaje("La tarea no puede estar vacía");
      return;
    }
    if (
      tareas.some(
        (t) => t.texto.toLowerCase() === nuevaTarea.trim().toLowerCase()
      )
    ) {
      mostrarMensaje("La tarea ya existe");
      return;
    }
    setTareas([...tareas, { texto: nuevaTarea.trim(), completada: false }]);
    setNuevaTarea("");
    mostrarMensaje("Tarea agregada correctamente", "success");
  };

  const marcarCompletada = (index) => {
    const tareasActualizadas = [...tareas];
    tareasActualizadas[index].completada = !tareasActualizadas[index].completada;
    setTareas(tareasActualizadas);
  };

  const eliminarTarea = (index) => {
    if (!tareas[index].completada) {
      mostrarMensaje("Solo puedes eliminar tareas completadas");
      return;
    }
    setTareas(tareas.filter((_, i) => i !== index));
    mostrarMensaje("Tarea eliminada", "success");
  };

  const empezarEdicion = (index) => {
    setEditandoIndex(index);
    setTextoEditado(tareas[index].texto);
  };

  const guardarEdicion = (index) => {
    if (textoEditado.trim() === "") {
      mostrarMensaje("El texto no puede estar vacío");
      return;
    }
    if (
      tareas.some(
        (t, i) =>
          i !== index &&
          t.texto.toLowerCase() === textoEditado.trim().toLowerCase()
      )
    ) {
      mostrarMensaje("Ya existe otra tarea con ese nombre");
      return;
    }
    const tareasActualizadas = [...tareas];
    tareasActualizadas[index].texto = textoEditado.trim();
    setTareas(tareasActualizadas);
    setEditandoIndex(null);
    setTextoEditado("");
    mostrarMensaje("Tarea editada correctamente", "success");
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Tareas</h2>

      {/* Mensajes */}
      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo}`} role="alert">
          {mensaje.texto}
        </div>
      )}

      {/* Agregar nueva tarea */}
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

      {/* Lista de tareas */}
      <ul className="list-group">
        {tareas.map((tarea, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              tarea.completada ? "list-group-item-success" : ""
            }`}
          >
            {editandoIndex === index ? (
              <>
                <input
                  type="text"
                  className="form-control me-2"
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                />
                <button
                  className="btn btn-success btn-sm me-1"
                  onClick={() => guardarEdicion(index)}
                >
                  Guardar
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setEditandoIndex(null)}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: tarea.completada ? "line-through" : "none",
                  }}
                >
                  {tarea.texto}
                </span>
                <div>
                  <button
                    className="btn btn-success btn-sm me-1"
                    onClick={() => marcarCompletada(index)}
                  >
                    {tarea.completada ? "Desmarcar" : "Completar"}
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => empezarEdicion(index)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarTarea(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}