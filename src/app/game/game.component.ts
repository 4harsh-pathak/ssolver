import { Component, OnInit } from '@angular/core';
import { SudokuService } from 'src/app/sudoku.service';
import { MatSnackBar, MatGridTile } from '@angular/material';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  grid: number[][];
  solved: Boolean;
  dis: Boolean;

  constructor(private service: SudokuService, private sb: MatSnackBar) { }

  ngOnInit() {
    this.reset();
    this.dis = false;
  }

  solve() {
    if (this.service.solve(this.grid)) {
      this.grid = this.service.getSolvedGrid();
      this.solved = true;
    } else {
      this.solved = false;
      this.sb.open('Not solvable', 'Okay');
    }
  }

  reset() {
    this.grid = this.service.newGrid();
    this.solved = false;
    this.dis = false;
  }

  disable(event: Boolean) {
    this.dis = event;
  }

}
