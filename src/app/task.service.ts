import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Task } from './task';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(private http: Http) { }

    // Retrieving TaskService
    getTasks() {
      return this.http.get('/api/tasks')
        .map(res => res.json());
    }

    // Add TaskService
    addTask(newTask) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      return this.http.post('/api/task', newTask, {headers: header})
        .map(res => res.json());
    }

    // Delete TaskService
    deleteTask(id) {
      return this.http.delete('/api/task/' + id)
        .map(res => res.json());
    }

    // Update TaskService
    updateStatus(task) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      return this.http.put('/api/task/' + task._id, task, {headers: header})
        .map(res => res.json());
    }
}
