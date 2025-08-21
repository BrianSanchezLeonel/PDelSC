import { useEffect, useState } from 'react';

export function useTareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const guardadas = localStorage.getItem('tareas');
    if (guardadas) {
      setTareas(JSON.parse(guardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (tarea) => {
    setTareas([...tareas, tarea]);
  };

  const obtenerTarea = (id) => {
    return tareas.find((t) => t.id === parseInt(id));
  };

  return {
    tareas,
    agregarTarea,
    obtenerTarea
  };
}