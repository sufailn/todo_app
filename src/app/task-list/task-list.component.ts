import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TodoService } from '../todo.service';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<Task>();
  @Output() taskCloned = new EventEmitter<Task>();

  constructor(private todoService: TodoService, private router: Router) {}

  updateTaskStatus(updatedTask: Task) {
    this.todoService.updateTask(updatedTask).subscribe(() => {
      this.taskUpdated.emit(updatedTask);
    });
  }

  cloneTask(task: Task) {
    let clonedTask: Task = { ...task, id: undefined, creationDate: new Date().toISOString().split('T')[0], lastUpdatedDate: new Date().toISOString().split('T')[0] };
    this.todoService.addTask(clonedTask).subscribe(newTask => {
      this.tasks.push(newTask);
      this.taskCloned.emit(newTask);
    });
  }

  deleteTask(taskId: number) {
    this.todoService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.taskDeleted.emit({ id: taskId } as Task); 
    });
  }

  addNewTask() {
    this.router.navigate(['/task-form']);
  }
}
