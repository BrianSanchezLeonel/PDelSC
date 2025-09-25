import React, { useState } from "react";
import axios from "axios";

export default function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        username,
        password,
      });

      const newUser = { id: res.data.id, username };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser)); // ✅ Persistir usuario
      setSuccess("Registro exitoso 🎉");

      // Cerrar modal tras 1 seg
      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("registerModal")
        );
        modal.hide();
      }, 1000);
    } catch (err) {
      setError("Error al registrar: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {error && <div className="alert alert-danger w-100">{error}</div>}
      {success && <div className="alert alert-success w-100">{success}</div>}

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
        className="form-control mb-2"
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="form-control mb-3"
      />
      <button onClick={handleRegister} className="btn btn-success w-100">
        Registrarse
      </button>
    </div>
  );
}
