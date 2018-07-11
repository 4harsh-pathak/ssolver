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
    if (!this.solved) {
      this.grid[row][col] = (this.grid[row][col] + 1) % 10;
    }
    if (this.grid[row][col] !== 0 && !this.service.isOkay(this.grid, row, col, this.grid[row][col])) {
      this.dis.emit(true);
    } else {
      this.dis.emit(false);
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
    if (row % 3 === 0) {
      arr.push('top');
    }
    if (row % 3 === 2) {
      arr.push('bottom');
    }
    if (col % 3 === 0) {
      arr.push('left');
    }
    if (col % 3 === 2) {
      arr.push('right');
    }
    if (this.grid[row][col] !== 0 && !this.service.isOkay(this.grid, row, col, this.grid[row][col])) {
      arr.push('error');
    }
    return arr;
  }

}
