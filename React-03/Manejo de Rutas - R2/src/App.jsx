import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import PaginaInicio from './pages/PaginaInicio';
import PaginaDetalle from './pages/PaginaDetalle';
import PaginaCrear from './pages/PaginaCrear';
import PaginaEditar from './pages/PaginaEditar';
import { useTareas } from './hooks/useTareas';

function App() {
  const {
    tareas,
    agregarTarea,
    obtenerTarea,
    editarTarea,
    eliminarTarea
  } = useTareas();

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Tareas</Link>
          <div>
            <Link className="btn btn-outline-light me-2" to="/">Inicio</Link>
            <Link className="btn btn-outline-light" to="/crear">Crear</Link>
          </div>
        </div>
      </nav>
      
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={<PaginaInicio tareas={tareas} />}
          />
          <Route
            path="/tarea/:id"
            element={<PaginaDetalle obtenerTarea={obtenerTarea} eliminarTarea={eliminarTarea} />}
          />
          <Route
            path="/crear"
            element={<PaginaCrear agregarTarea={agregarTarea} />}
          />
          <Route
            path="/editar/:id"
            element={<PaginaEditar obtenerTarea={obtenerTarea} editarTarea={editarTarea} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;