import React, { useState, useEffect, useRef, useCallback } from "react";
import { useContext } from "react";
// import Target from "./logic/Target";
// context
import { AppContext } from "../context/AppContext";

const Game = () => {
  // context
  const { wormSpeed, updateWorm, drawWorm, drawTarget } = useContext(
    AppContext
  );
  // const { drawTarget, updateTarget } = Target();
  // inner state
  const gameBoard = useRef(null);
  const lastRenderTime = useRef(null);
  const [isGameOver] = useState(false);

  // helper
  const draw = useCallback(() => {
    gameBoard.current.innerHTML = "";
    drawWorm(gameBoard.current);
    drawTarget(gameBoard.current);
  }, [drawWorm, drawTarget]);

  // helper
  const update = useCallback(() => {
    updateWorm();
    // updateTarget();
    // checkGameOver();
  }, [updateWorm]);

  // main
  const main = useCallback(
    (currentTime) => {
      if (isGameOver) return;
      // happy flow
      window.requestAnimationFrame(main);
      const secondsSinceLastRender =
        (currentTime - lastRenderTime.current) / 1000;
      if (secondsSinceLastRender < 1 / wormSpeed) return;
      lastRenderTime.current = currentTime;
      update();
      draw();
      console.log("...");
    },
    [wormSpeed, lastRenderTime, isGameOver, update, draw]
  );

  useEffect(() => {
    requestAnimationFrame(main);
    return () => cancelAnimationFrame(main);
  }, [main]);

  return (
    <>
      <div ref={gameBoard} className="game-board"></div>
      {/* <button onClick={()=>setIsPaused(!isPaused)} className={`pause ${isPaused && "play"}`}>
        {isPaused ? "Play" : "Pause"}
      </button> */}
    </>
  );
};

export default Game;
