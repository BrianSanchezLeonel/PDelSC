import React, { useState } from "react";

export default function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div className="text-center mt-4">
      <h2>Contador: {contador}</h2>
      <div>
        <button
          className="btn btn-primary m-2"
          onClick={() => setContador(contador + 1)}
        >
          Incrementar
        </button>
        <button
          className="btn btn-danger m-2"
          onClick={() => setContador(contador - 1)}
        >
          Decrementar
        </button>
        <button
          className="btn btn-secondary m-2"
          onClick={() => setContador(0)}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}