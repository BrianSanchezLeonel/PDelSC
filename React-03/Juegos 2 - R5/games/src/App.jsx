import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SpaceInvaders from "./space_invaders/App";
import Game from "./1942/App";
import Header from "./components/common/Header";

import spaceInvadersImg from "./assets/space-invaders-title.png";
import game1942Img from "./assets/1942-title.jpg";

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <Header setUser={setUser} user={user} logout={logout} />

      <Routes>
        <Route path="/space_invaders" element={<SpaceInvaders user={user} />} />
        <Route path="/1942" element={<Game user={user} />} />
        <Route
          path="*"
          element={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "80vh",
                padding: "20px",
              }}
            >
              <h2 style={{ color: "white", marginBottom: "40px", textAlign: "center" }}>
                Selecciona un juego
              </h2>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {/* Card Space Invaders */}
                <Link
                  to="/space_invaders"
                  style={{ textDecoration: "none", color: "white", textAlign: "center" }}
                >
                  <div
                    style={{
                      width: "250px",
                      height: "200px",
                      border: "2px solid #0ff",
                      borderRadius: "10px",
                      overflow: "hidden",
                      transition: "transform 0.2s",
                    }}
                    className="game-card"
                  >
                    <img
                      src={spaceInvadersImg}
                      alt="Space Invaders"
                      style={{ width: "100%", display: "block" }}
                    />
                    <div style={{ padding: "2px", fontFamily: "'Press Start 2P', cursive" }}>
                      👾 Space Invaders
                    </div>
                  </div>
                </Link>

                {/* Card 1942 */}
                <Link
                  to="/1942"
                  style={{ textDecoration: "none", color: "white", textAlign: "center" }}
                >
                  <div
                    style={{
                      width: "250px",
                      height: "200px",
                      border: "2px solid #ff0",
                      borderRadius: "10px",
                      overflow: "hidden",
                      transition: "transform 0.2s",
                    }}
                    className="game-card"
                  >
                    <img
                      src={game1942Img}
                      alt="1942"
                      style={{ width: "100%", display: "block" }}
                    />
                    <div style={{ padding: "30px", fontFamily: "'Press Start 2P', cursive" }}>
                      ✈️ 1942
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
