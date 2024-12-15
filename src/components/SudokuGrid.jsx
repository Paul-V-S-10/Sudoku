import React from 'react';
import './SudokuGrid.css';

const SudokuGrid = ({ sudoku, updateCell, invalidCells }) => {
  return (
    <div className="sudoku-grid">
      {sudoku.map((row, rIdx) => (
        <div key={rIdx} className="sudoku-row">
          {row.map((cell, cIdx) => (
            <input
              key={cIdx}
              type="text"
              maxLength="1"
              value={cell}
              className={`sudoku-cell ${invalidCells.has(`${rIdx}-${cIdx}`) ? 'invalid' : ''}`}
              onChange={(e) => {
                const value = e.target.value.replace(/[^1-9]/g, "");
                updateCell(rIdx, cIdx, value);
              }}
              disabled={cell !== ""}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
