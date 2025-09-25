import React, { useState, useEffect } from "react";
import Game from "./Game";
import ScoreBoard from "./components/scoreboard/ScoreBoard";
import { ScoreProvider } from "./components/scoreboard/ScoreContext";
import "./styles/App.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  return (
    <div className="app-container">
      {/* Solo el fondo: estrellas y estrellas fugaces */}
      <div className="stars"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>

      {/* Todo lo demás encima del fondo */}
      <div className="app-content">

        {user ? (
          <>
            <div className="d-flex flex-row justify-content-center align-items-start"
             style={{ gap: "20px" }}>
              <ScoreProvider>
                <Game user={user} className="game-position"/>
                <ScoreBoard/>
              </ScoreProvider>
            </div>
          </>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <h2 className="text-white text-center arcade-title">
              👾 Bienvenido a Space Invaders 👾
            </h2>
            <p className="text-white text-center arcade-subtitle">
              Inicia sesión o regístrate para empezar a jugar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
