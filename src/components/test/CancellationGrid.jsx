import React, { useState } from 'react';
import './CancellationGrid.css';

const CancellationGrid = ({ onComplete }) => {
  const [grid, setGrid] = useState(generateGrid());

  function generateGrid() {
    const size = 10;
    const totalCells = size * size;
    const targetLetters = Math.floor(totalCells * 0.3); // 30% delle celle contengono 'H'
    
    // Creiamo un array con tutte le posizioni possibili
    let positions = Array.from({ length: totalCells }, (_, i) => i);
    
    // Mescoliamo l'array
    positions = positions.sort(() => Math.random() - 0.5);
    
    // Prendiamo le prime 'targetLetters' posizioni per le 'H'
    const hPositions = new Set(positions.slice(0, targetLetters));
    
    // Creiamo la griglia
    return Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => ({
        value: hPositions.has(row * size + col) ? 'H' : getRandomLetter(),
        clicked: false
      }))
    );
  }

  function getRandomLetter() {
    const letters = 'ABCDEFGIJKLMNOPQRSTUVWXYZ'; // Escludiamo 'H'
    return letters[Math.floor(Math.random() * letters.length)];
  }

  const handleCellClick = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col].clicked = !newGrid[row][col].clicked;
    setGrid(newGrid);

    // Verifichiamo se tutte le 'H' sono state trovate
    const allHFound = grid.every(row =>
      row.every(cell => cell.value !== 'H' || cell.clicked)
    );

    if (allHFound) {
      onComplete && onComplete();
    }
  };

  return (
    <div className="cancellation-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`grid-cell ${cell.clicked ? 'clicked' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell.value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CancellationGrid; 