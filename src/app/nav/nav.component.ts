import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() drawer: any;

  list = [
    {key: 'Home', value: ''},
    {key: 'Solve', value: 'game'},
    {key: 'About', value: 'about'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
