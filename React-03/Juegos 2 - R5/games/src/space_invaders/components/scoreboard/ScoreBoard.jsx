import React, { useContext } from "react";
import { ScoreContext } from "./ScoreContext";
import "../../styles/Scoreboard.css";

export default function ScoreBoard() {
  const { scores } = useContext(ScoreContext);

  return (
    <div className="scoreboard-wrapper">
      <div className="scoreboard-card">
        <div className="scoreboard-header">
          <h5>HIGH SCORES</h5>
        </div>
        <ul className="scoreboard-list">
          {scores.slice(0, 10).map((s, idx) => (
            <li key={idx} className="scoreboard-item">
              <span className="score-rank">{idx + 1}.</span>
              <span className="score-user">{s.username}</span>
              <span className="score-points">{s.score}</span>
              <span className="score-level">Lvl {s.level}</span>
              <span className="score-time">{s.time}s</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}