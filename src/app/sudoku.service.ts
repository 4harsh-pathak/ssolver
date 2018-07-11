import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  private _grid;

  constructor() {
    this._grid = this.newGrid();
  }

  newGrid() {
    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
  }

  private findUn(grid: number[][]) {
    const coord = { x: 0, y: 0 };
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) {
          coord.x = i;
          coord.y = j;
          return coord;
        }
      }
    }
    return null;
  }

  private findFill(grid: number[][]) {
    const coord = new Coord();
    const arr = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] !== 0) {
          coord.x = i;
          coord.y = j;
          arr.push(coord);
        }
      }
    }
    return arr;
  }

  private checkGrid(grid: number[][], row: number, col: number, num: number) {
    row = row - (row % 3);
    col = col - (col % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + row][j + col] === num) {
          return false;
        }
      }
    }
    return true;
  }

  private checkRow(grid: number[][], row: number, num: number) {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num) {
        return false;
      }
    }
    return true;
  }

  private checkCol(grid: number[][], col: number, num: number) {
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num) {
        return false;
      }
    }
    return true;
  }

  private uniqueGrid(grid: number[][], row: number, col: number, num: number) {
    row = row - (row % 3);
    col = col - (col % 3);
    let count = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + row][j + col] === num) {
          count++;
        }
      }
    }
    return count === 1;
  }

  private uniqueRow(grid: number[][], row: number, num: number) {
    let count = 0;
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num) {
        count++;
      }
    }
    return count === 1;
  }

  private uniqueCol(grid: number[][], col: number, num: number) {
    let count = 0;
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num) {
        count++;
      }
    }
    return count === 1;
  }

  private isSafe(grid: number[][], row: number, col: number, num: number) {
    return this.checkCol(grid, col, num) && this.checkGrid(grid, row, col, num) && this.checkRow(grid, row, num);
  }

  private checkValid(grid: number[][]) {
    let valid = true;
    const arr = this.findFill(grid);
    arr.forEach(coord => {
      if (grid[coord.x][coord.y] !== 0 && !this.isSafe(grid, coord.x, coord.y, grid[coord.x][coord.y])) {
        console.log(grid[coord.x][coord.y]);
        valid = false;
      }
    });
    return valid;
  }

  isOkay(grid: number[][], row: number, col: number, num: number) {
    return this.uniqueCol(grid, col, num) && this.uniqueGrid(grid, row, col, num) && this.uniqueRow(grid, row, num);
  }

  solve(grid: number[][]) {
    const coord = this.findUn(grid);
    if (coord !== null) {
      const row = coord.x;
      const col = coord.y;
      for (let i = 1; i <= 9; i++) {
        if (this.isSafe(grid, row, col, i)) {
          grid[row][col] = i;
          if (this.solve(grid)) {
            this._grid = grid;
            return true;
          }
          grid[row][col] = 0;
        }
      }
    } else {
      this._grid = grid;
      return true;
    }
    return false;
  }

  getSolvedGrid() {
    return this._grid;
  }

}

class Coord {
  x: number;
  y: number;
}
