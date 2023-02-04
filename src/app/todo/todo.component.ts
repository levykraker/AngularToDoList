import { Component, OnInit } from '@angular/core';
import { TodoService } from './dane/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  toDoListArry!: any[];
  constructor(private TodoService: TodoService ) { }

  ngOnInit() {
    this.TodoService.getToDoList().snapshotChanges()
    .subscribe((item: any[]) => {
      this.toDoListArry = [];
      item.forEach((element: { payload: { toJSON: () => any; }; key: any; }) => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArry.push(x);
      })

      //sort array isChecked false  -> true
        this.toDoListArry.sort((a,b) => {
          return a.isChecked - b.isChecked;
        })
    });
  }

  onAdd(itemTitle: { value: any| null; }) {
    this.TodoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string,isChecked: any) {
    this.TodoService.checkTitle($key,!isChecked);
  }

  onDelete($key : string){
    this.TodoService.removeTitle($key);
  }

}
