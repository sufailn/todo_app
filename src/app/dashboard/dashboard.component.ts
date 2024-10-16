import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task, TodoService } from '../todo.service';
import { TaskListComponent } from "../task-list/task-list.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [TaskListComponent]
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  pendingTasksCount: number = 0;
  completedTasksCount: number = 0;
  today: string = new Date().toISOString().split('T')[0];

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit() {
    this.todoService.getTasks().subscribe(tasks => {
      this.tasks = tasks || [];
      this.filteredTasks = this.tasks.filter(task => task.dueDate === this.today);
      this.updateTaskCounts();
    });
  }

  updateTaskCounts() {
    this.pendingTasksCount = this.tasks.filter(task => task.status === 'Pending').length;
    this.completedTasksCount = this.tasks.filter(task => task.status === 'Complete').length;
  }

  showPendingTasks() {
    this.filteredTasks = this.tasks.filter(task => task.status === 'Pending');
  }

  showCompletedTasks() {
    this.filteredTasks = this.tasks.filter(task => task.status === 'Complete');
  }

  filterTasks(criteria: string) {
    let today = new Date();
    this.filteredTasks = this.tasks.filter(task => {
      let dueDate = new Date(task.dueDate);
      switch (criteria) {
        case 'today':
          return dueDate.toDateString() === today.toDateString();
        case 'week':
          let weekFromNow = new Date();
          weekFromNow.setDate(today.getDate() + 7);
          return task.status === 'Pending' && dueDate > today && dueDate <= weekFromNow;
        case 'month':
          let monthFromNow = new Date();
          monthFromNow.setMonth(today.getMonth() + 1);
          return task.status === 'Pending' && dueDate > today && dueDate <= monthFromNow;
        case 'all':
          return true;
        default:
          return false;
      }
    });
  }

  onFilterChange(event: Event) {
    let value = (event.target as HTMLSelectElement).value;
    this.filterTasks(value);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
