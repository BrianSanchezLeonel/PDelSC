import { useState } from "react";

export default function HolaMundo() {
  const [color, setColor] = useState("blue");
  const [fuente, setFuente] = useState("Arial");
  const [tamano, setTamano] = useState("2rem");

  return (
    <div className="container mt-4 text-center">
      <h1 style={{ color, fontFamily: fuente, fontSize: tamano }}>
        Hola Mundo
      </h1>

      <div className="mt-3">
        {/* Botones para cambiar color */}
        <button className="btn btn-danger m-1" onClick={() => setColor("red")}>
          Rojo
        </button>
        <button
          className="btn btn-success m-1"
          onClick={() => setColor("green")}
        >
          Verde
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => setColor("blue")}
        >
          Azul
        </button>
      </div>

      <div className="mt-3">
        {/* Botones para cambiar fuente */}
        <button
          className="btn btn-secondary m-1"
          onClick={() => setFuente("Arial")}
        >
          Arial
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => setFuente("Courier New")}
        >
          Courier
        </button>
        <button
          className="btn btn-secondary m-1"
          onClick={() => setFuente("Times New Roman")}
        >
          Times
        </button>
      </div>

      <div className="mt-3">
        {/* Botones para cambiar tamaño */}
        <button
          className="btn btn-outline-dark m-1"
          onClick={() => setTamano("1.5rem")}
        >
          Pequeño
        </button>
        <button
          className="btn btn-outline-dark m-1"
          onClick={() => setTamano("2rem")}
        >
          Mediano
        </button>
        <button
          className="btn btn-outline-dark m-1"
          onClick={() => setTamano("3rem")}
        >
          Grande
        </button>
      </div>
    </div>
  );
}