import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import axios from "axios";

export default function HeaderGlobal({ setUser, user }) {
  const [showMenu, setShowMenu] = useState(false);
  const [bestScore, setBestScore] = useState(null);
  const [bestLevel, setBestLevel] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const currentGame =
    location.pathname.includes("space_invaders") ? "space-invaders" :
    location.pathname.includes("1942") ? "1942" :
    null;

  useEffect(() => {
    const fetchBest = async () => {
      if (!user || !currentGame) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/best-score/${currentGame}/${user.id}`
        );
        if (res.data.success && res.data.best) {
          setBestScore(res.data.best.score);
          setBestLevel(res.data.best.level);
          setBestTime(res.data.best.time);
        } else {
          setBestScore(null);
          setBestLevel(null);
          setBestTime(null);
        }
      } catch (err) {
        console.error("Error al obtener mejor partida:", err);
      }
    };
    fetchBest();
  }, [user, currentGame]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setShowMenu(false);
    setMenuOpen(false);
  };

  return (
    <header className="bg-dark text-white p-3 border-bottom border-info">
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        {/* Links principales */}
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <Link
            to="/"
            className="text-decoration-none"
            style={{ fontFamily: "'Press Start 2P', cursive", color: "#fff", fontSize: "0.9rem" }}
          >
            Inicio
          </Link>
          <Link
            to="/space_invaders"
            className="text-decoration-none"
            style={{ fontFamily: "'Press Start 2P', cursive", color: "#0ff", fontSize: "0.9rem" }}
          >
            Space Invaders
          </Link>
          <Link
            to="/1942"
            className="text-decoration-none"
            style={{ fontFamily: "'Press Start 2P', cursive", color: "#ff0", fontSize: "0.9rem" }}
          >
            1942
          </Link>
        </div>

        {/* Botón hamburguesa en móviles */}
        <button
          className="btn btn-outline-info d-md-none ms-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.7rem" }}
        >
          ☰
        </button>

        {/* Menú de usuario o login/register */}
        <div
          className={`d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2 mt-2 mt-md-0 ${
            menuOpen ? "d-flex" : "d-none d-md-flex"
          }`}
        >
          {!user ? (
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-info"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.7rem" }}
              >
                🔑 Iniciar Sesión
              </button>
              <button
                className="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.7rem" }}
              >
                🛸 Registrarse
              </button>
            </div>
          ) : (
            <div className="position-relative">
              <span
                className="btn btn-outline-light"
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "0.7rem",
                  cursor: "pointer",
                }}
              >
                🚀 {user.username}
              </span>

              {showMenu && (
                <div
                  className="position-absolute bg-dark border border-info rounded p-2 mt-1"
                  style={{
                    top: "100%",
                    right: 0,
                    zIndex: 1000,
                    minWidth: "220px",
                  }}
                >
                  <h6
                    className="text-warning text-center mb-2"
                    style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.6rem" }}
                  >
                    {currentGame === "space-invaders"
                      ? "👾 Space Invaders"
                      : currentGame === "1942"
                      ? "✈️ 1942"
                      : "🏆 Puntajes"}
                  </h6>
                  <p
                    className="m-0 text-info"
                    style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.6rem" }}
                  >
                    🏆 Mejor Puntaje: {bestScore ?? "..."}
                  </p>
                  <p
                    className="m-0 text-info"
                    style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.6rem" }}
                  >
                    ⭐ Mejor Nivel: {bestLevel ?? "..."}
                  </p>
                  <p
                    className="m-0 text-info"
                    style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.6rem" }}
                  >
                    ⏳ Mejor Tiempo: {bestTime ?? "..."} seg
                  </p>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger w-100 mt-2"
                    style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.6rem" }}
                  >
                    ❌ Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modales Login y Register */}
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-white border border-info">
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.8rem" }}
              >
                🔑 Iniciar Sesión
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Login setUser={setUser} />
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="registerModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-white border border-success">
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.8rem" }}
              >
                🛸 Registrarse
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Register setUser={setUser} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
