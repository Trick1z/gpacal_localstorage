import { Component, OnInit } from '@angular/core';
import 'devextreme/data/odata/store';

@Component({
  templateUrl: 'tasks.component.html'
})

export class TasksComponent implements OnInit {

  getData :any = localStorage.getItem('student');
  display :any = JSON.parse(this.getData);


  ngOnInit(): void {

  }
}
