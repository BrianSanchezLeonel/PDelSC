import React, { useState } from "react";
import axios from "axios";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");

    if (!username || !password) {
      setError("Usuario y contraseña son obligatorios.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ Persistir usuario

      // Cerrar modal al loguearse
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
      );
      modal.hide();
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {error && <div className="alert alert-danger w-100">{error}</div>}

      <input
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="form-control mb-2"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control mb-3"
      />
      <button onClick={login} className="btn btn-info w-100">
        Iniciar Sesión
      </button>
    </div>
  );
}
