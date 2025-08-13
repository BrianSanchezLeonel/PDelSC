import React, { useState } from 'react';

export default function Formulario() {
  const [nombre, setNombre] = useState('');
  const [bienvenida, setBienvenida] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre.trim() === '') return;
    setBienvenida(`Bienvenido/a, ${nombre}`);
    setNombre('');
  };

  return (
    <div className="container mt-4">
      <h2>Formulario de Bienvenida</h2>

      <form onSubmit={manejarEnvio} className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>

      {bienvenida && <h4 className="text-success">{bienvenida}</h4>}
    </div>
  );
}
