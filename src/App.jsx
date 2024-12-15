import React, { useState, useEffect } from 'react';
import './App.css';
import SudokuGrid from './Components/SudokuGrid';

function App() {
  const [sudoku, setSudoku] = useState([]);
  const [invalidCells, setInvalidCells] = useState(new Set());

  useEffect(() => {
    generateSudoku();
  }, []);

  const generateSudoku = () => {
    const isValid = (grid, row, col, num) => {
      for (let i = 0; i < 9; i++) {
        if (
          grid[row][i] === num || // Check row
          grid[i][col] === num || // Check column
          grid[
            Math.floor(row / 3) * 3 + Math.floor(i / 3)
          ][Math.floor(col / 3) * 3 + i % 3] === num // Check subgrid
        ) {
          return false;
        }
      }
      return true;
    };

    const fillSudoku = (grid) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === "") {
            for (let num = 1; num <= 9; num++) {
              if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (fillSudoku(grid)) return true;
                grid[row][col] = "";
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    const removeNumbers = (grid, emptyCells = 40) => {
      const positions = [];
      while (positions.length < emptyCells) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (grid[row][col] !== "") {
          grid[row][col] = "";
          positions.push([row, col]);
        }
      }
    };

    const sudokuGrid = Array.from({ length: 9 }, () => Array(9).fill(""));
    fillSudoku(sudokuGrid);
    removeNumbers(sudokuGrid);
    setSudoku(sudokuGrid);
    setInvalidCells(new Set());
  };

  const validateGrid = (row, col, value) => {
    const isValid = (grid, r, c, val) => {
      for (let i = 0; i < 9; i++) {
        if (
          (grid[r][i] === val && i !== c) || // Check row
          (grid[i][c] === val && i !== r) || // Check column
          grid[
            Math.floor(r / 3) * 3 + Math.floor(i / 3)
          ][Math.floor(c / 3) * 3 + i % 3] === val
        ) {
          return false;
        }
      }
      return true;
    };

    const updatedInvalidCells = new Set(invalidCells);
    if (!isValid(sudoku, row, col, value)) {
      updatedInvalidCells.add(`${row}-${col}`);
    } else {
      updatedInvalidCells.delete(`${row}-${col}`);
    }
    setInvalidCells(updatedInvalidCells);
  };

  const updateCell = (row, col, value) => {
    const newSudoku = sudoku.map((rowArr, rIdx) => 
      rowArr.map((cell, cIdx) => (rIdx === row && cIdx === col ? value : cell))
    );
    setSudoku(newSudoku);
    if (value) validateGrid(row, col, value);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Sudoku Game</h1>
      <SudokuGrid sudoku={sudoku} updateCell={updateCell} invalidCells={invalidCells} />
      <div className="buttons-container">
        <button className="button" onClick={generateSudoku}>New Game</button>
      </div>
    </div>
  );
}

export default App;