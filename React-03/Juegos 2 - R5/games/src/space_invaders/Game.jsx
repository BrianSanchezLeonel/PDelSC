import React, { useEffect, useRef, useState, useContext } from "react";
import Player from "./components/game/Player";
import EnemyController from "./components/game/EnemyController";
import BulletController from "./components/game/BulletController";
import { ScoreContext } from "./components/scoreboard/ScoreContext";
import axios from "axios";
import "./styles/Game.css";
import space from "./assets/images/space.png";
import title from "./assets/images/space_invaders.png";

export default function Game({ user }) {
  const canvasRef = useRef(null);
  const playerRef = useRef(null);
  const enemyControllerRef = useRef(null);
  const playerBulletControllerRef = useRef(null);
  const enemyBulletControllerRef = useRef(null);
  const gameIntervalRef = useRef(null);
  const { updateScores } = useContext(ScoreContext);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [startGame, setStartGame] = useState(false);

  const [bestScore, setBestScore] = useState(null);
  const [bestLevel, setBestLevel] = useState(null);
  const [bestTime, setBestTime] = useState(null);

  const timeStartRef = useRef(Date.now());
  const backgroundRef = useRef(new Image());
  const BASE_CANVAS_SIZE = 600;
  const gameStateRef = useRef({
    level: level,
    score: score,
    timeElapsed: timeElapsed,
  });

  useEffect(() => {
    if (!user) return;

    const fetchBest = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/best-score/space-invaders/${user.id}`);
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          console.error("Respuesta no es JSON:", text);
          return;
        }

        if (data.success && data.best) {
          setBestScore(data.best.score);
          setBestLevel(data.best.level);
          setBestTime(data.best.time);
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
  }, [user]);

  useEffect(() => {
    const bg = backgroundRef.current;
    bg.src = space;
    bg.onload = () => setBgLoaded(true);
  }, []);

  useEffect(() => {
    if (bgLoaded && startGame && canvasRef.current) {
      setupGameWithLevel(gameStateRef.current.level);
      const handleResize = () => setupGameWithLevel(gameStateRef.current.level);
      window.addEventListener("resize", handleResize);
      return () => {
        if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [bgLoaded, startGame]);

  const setupGameWithLevel = (levelForGame) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = Math.min(BASE_CANVAS_SIZE, window.innerWidth - 40);
    canvas.height = canvas.width;
    const scale = canvas.width / BASE_CANVAS_SIZE;

    playerBulletControllerRef.current = new BulletController(
      canvas,
      10,
      "red",
      true,
      scale
    );
    enemyBulletControllerRef.current = new BulletController(
      canvas,
      4 + levelForGame,
      "white",
      false,
      scale
    );
    enemyControllerRef.current = new EnemyController(
      canvas,
      enemyBulletControllerRef.current,
      playerBulletControllerRef.current,
      levelForGame,
      scale
    );
    playerRef.current = new Player(
      canvas,
      3 + levelForGame,
      playerBulletControllerRef.current,
      levelForGame,
      scale
    );

    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    gameIntervalRef.current = setInterval(
      () => gameLoop(canvas, scale),
      1000 / 60
    );
  };

  const gameLoop = (canvas, scale) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundRef.current, 0, 0, canvas.width, canvas.height);

    enemyControllerRef.current.draw(ctx, scale);
    playerRef.current.draw(ctx, scale);
    playerBulletControllerRef.current.draw(ctx, scale);
    enemyBulletControllerRef.current.draw(ctx, scale);

    let pointsGained = 0;
    enemyControllerRef.current.enemyRows.forEach((row) => {
      row.forEach((enemy) => {
        if (!enemy.isDying && playerBulletControllerRef.current.collideWith(enemy)) {
          enemy.isDying = true;
          pointsGained += enemy.points;
          const sound = enemyControllerRef.current.enemyDeathSound.cloneNode();
          sound.volume = enemyControllerRef.current.enemyDeathSound.volume;
          sound.play().catch(() => {});
        }
      });
    });

    enemyControllerRef.current.enemyRows = enemyControllerRef.current.enemyRows
      .map((row) => row.filter((enemy) => !(enemy.isDying && enemy.deathTimer <= 0)))
      .filter((row) => row.length > 0);

    if (pointsGained > 0) {
      gameStateRef.current.score += pointsGained;
      setScore(gameStateRef.current.score);
    }

    if (
      enemyBulletControllerRef.current.collideWith(playerRef.current) ||
      enemyControllerRef.current.collideWith(playerRef.current)
    ) {
      endGame(false);
      return;
    }

    if (enemyControllerRef.current.enemyRows.length === 0) {
      gameStateRef.current.level += 1;
      setLevel(gameStateRef.current.level);
      setupGameWithLevel(gameStateRef.current.level);
      return;
    }

    gameStateRef.current.timeElapsed = Math.floor(
      (Date.now() - timeStartRef.current) / 1000
    );
    setTimeElapsed(gameStateRef.current.timeElapsed);
  };

  const endGame = (didWin) => {
    const totalTime = Math.floor((Date.now() - timeStartRef.current) / 1000);
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    gameIntervalRef.current = null;
    setTimeElapsed(totalTime);
    setGameOver(!didWin);
    setWin(didWin);

    axios
      .post("http://localhost:5000/api/score", {
        userId: user.id,
        score: gameStateRef.current.score,
        level: gameStateRef.current.level,
        time: totalTime,
      })
      .then(() => {
        if (updateScores) updateScores();
      })
      .catch((err) => console.error(err));

    const ctx = canvasRef.current.getContext("2d");
    displayEndScreen(ctx, canvasRef.current, didWin);
  };

  const displayEndScreen = (ctx, canvas, didWin) => {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = `${50 * (canvas.width / BASE_CANVAS_SIZE)}px 'Press Start 2P', cursive`;
    ctx.textAlign = "center";
    ctx.fillText(
      didWin ? "¡Ganaste!" : "Game Over",
      canvas.width / 2,
      canvas.height / 2 - 50
    );
    ctx.font = `${25 * (canvas.width / BASE_CANVAS_SIZE)}px 'Press Start 2P', cursive`;
    ctx.fillText(`Puntaje: ${gameStateRef.current.score}`, canvas.width / 2, canvas.height / 2 + 10);
    ctx.fillText(`Tiempo: ${gameStateRef.current.timeElapsed}s`, canvas.width / 2, canvas.height / 2 + 40);
    ctx.fillText(`Nivel: ${gameStateRef.current.level}`, canvas.width / 2, canvas.height / 2 + 70);
  };

  const resetGame = () => {
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    gameIntervalRef.current = null;
    playerRef.current = null;
    enemyControllerRef.current = null;
    playerBulletControllerRef.current = null;
    enemyBulletControllerRef.current = null;
    gameStateRef.current = { level: 1, score: 0, timeElapsed: 0 };
    timeStartRef.current = Date.now();

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    setScore(0);
    setLevel(1);
    setTimeElapsed(0);
    setGameOver(false);
    setWin(false);

    setTimeout(() => {
      setupGameWithLevel(gameStateRef.current.level);
    }, 50);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyZ" && playerRef.current) playerRef.current.shootPressed = true;
    };
    const handleKeyUp = (e) => {
      if (e.code === "KeyZ" && playerRef.current) playerRef.current.shootPressed = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  if (showCover) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <img src={title} alt="Space Invaders" style={{ marginTop: "80px" }} />
        <button
          className="btn btn-success"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
          onClick={() => {
            setShowCover(false);
            setStartGame(true);
            timeStartRef.current = Date.now();
          }}
        >
          Empezar
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center game-position">
      <div
        className="d-flex justify-content-center gap-3 my-2 score-info"
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "0.8rem",
          color: "white",
        }}
      >
        <span className="text">Puntaje: {score}</span>
        <span className="text">Nivel: {level}</span>
        <span className="text">Tiempo: {timeElapsed}s</span>
      </div>

      {bestScore !== null && (
        <div
          className="d-flex justify-content-center gap-3 mb-2 score-info"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "0.7rem",
            color: "yellow",
          }}
        >
          <span className="text">🏆 Mejor Puntaje: {bestScore}</span>
          <span className="text">⭐ Nivel: {bestLevel}</span>
          <span className="text">⏳ Tiempo: {bestTime}s</span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{
          boxShadow: "black 20px 10px 50px",
          maxWidth: "100%",
          height: "auto",
        }}
      />

      <div className="d-flex gap-2 mt-2">
        <button
          className="btn btn-success"
          onClick={resetGame}
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
