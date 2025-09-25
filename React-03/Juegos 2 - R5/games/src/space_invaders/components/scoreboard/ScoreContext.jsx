import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Creamos el contexto
export const ScoreContext = createContext();

export function ScoreProvider({ children }) {
  const [scores, setScores] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchScores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/scores");
      setScores(res.data);
    } catch (err) {
      console.error("Error cargando scores:", err);
    }
  };

  // Se ejecuta al montar y cada vez que refreshFlag cambia
  useEffect(() => {
    fetchScores();
  }, [refreshFlag]);

  // Función que disparan los componentes cuando hay un nuevo puntaje
  const updateScores = () => {
    setRefreshFlag(prev => !prev);
  };

  return (
    <ScoreContext.Provider value={{ scores, updateScores }}>
      {children}
    </ScoreContext.Provider>
  );
}