import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SudokuService } from 'src/app/sudoku.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() grid: number[][];
  @Input() solved: Boolean;
  @Output() dis = new EventEmitter();

  constructor(private service: SudokuService) { }

  ngOnInit() {
  }

  increment(row: number, col: number) {
    /*if (!this.solved) {
      this.grid[row][col] = (this.grid[row][col] + 1) % 10;
    }
    if (this.grid[row][col] !== 0 && !this.service.isOkay(this.grid, row, col, this.grid[row][col])) {
      this.dis.emit(true);
    } else {
      this.dis.emit(false);
    }*/
    while (true) {
      this.grid[row][col] = (this.grid[row][col] + 1) % 10;
      if (this.service.isOkay(this.grid, row, col, this.grid[row][col])) {
        break;
      }
    }
  }

  zero(row: number, col: number) {
    if (!this.solved) {
      this.grid[row][col] = 0;
    }
    if (this.grid[row][col] !== 0 && !this.service.isOkay(this.grid, row, col, this.grid[row][col])) {
      this.dis.emit(true);
    } else {
      this.dis.emit(false);
    }
  }

  checkBorder(row: number, col: number) {
    const arr = [];
    if (row === 0 || row === 3 || row === 6) {
      arr.push('top');
    } else {
      arr.push('ntop');
    }
    if (row === 8) {
      arr.push('bottom');
    }
    if (col === 0 || col === 3 || col === 6) {
      arr.push('left');
    } else {
      arr.push('nleft');
    }
    if (col === 8) {
      arr.push('right');
    }
    if (this.grid[row][col] !== 0 && !this.service.isOkay(this.grid, row, col, this.grid[row][col])) {
      arr.push('error');
    }
    return arr;
  }

}
