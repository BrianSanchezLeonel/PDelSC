import React, { useState } from "react";

export default function Formulario() {
  const [nombre, setNombre] = useState("");
  const [bienvenida, setBienvenida] = useState("");
  const [error, setError] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (nombre.trim() === "") {
      setError("El nombre es obligatorio");
      setBienvenida("");
      return;
    }

    if (nombre.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      setBienvenida("");
      return;
    }

    setError("");
    setBienvenida(`Bienvenido/a, ${nombre.trim()}`);
    setNombre("");
  };

  return (
    <div className="container mt-4">
      <h2>Formulario de Bienvenida</h2>

      {/* Mensaje de error */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Mensaje de éxito */}
      {bienvenida && (
        <div className="alert alert-success" role="alert">
          {bienvenida}
        </div>
      )}

      <form onSubmit={manejarEnvio} className="mb-3">
        <div className="d-flex">
          <input
            type="text"
            className={`form-control me-2 ${error ? "is-invalid" : ""}`}
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}