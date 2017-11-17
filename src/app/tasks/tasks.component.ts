import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TaskService]
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  title: string;

  constructor(private taskService: TaskService) { }

  // Add Task
  addTask(event) {
    event.preventDefault();
    const newTask = {
      'title': this.title,
      'isDone': false
    };
    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
        this.taskService.getTasks()
        .subscribe(tasks => this.tasks = tasks);
      });
  }

  // Delete Task
  deleteTask(id: any) {
    const tasks = this.tasks;
      this.taskService.deleteTask(id)
        .subscribe(task => {
            if (task.n === 1) {
              for (let i = 0; i < tasks.length; i++) {
                if (tasks[i]._id === id) {
                  tasks.splice(i, 1);
                }
              }
            }
        });
  }

  // Update Task
  updateStatus(task) {
    const _task = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };
    this.taskService.updateStatus(_task)
      .subscribe(() => {
          task.isDone = !task.isDone;
      });
  }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

}
