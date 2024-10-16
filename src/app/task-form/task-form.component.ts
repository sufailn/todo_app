import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task, TodoService } from '../todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task = {
    title: '',
    description: '',
    creationDate: '',
    dueDate: '',
    lastUpdatedDate: '',
    status: 'Pending'
  };
  @Input() isEdit: boolean = false;
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit() {
    if (!this.isEdit) {
      this.resetForm();
    }
  }

  resetForm() {
    this.task = {
      title: '',
      description: '',
      creationDate: '',
      dueDate: '',
      lastUpdatedDate: '',
      status: 'Pending'
    };
  }

  onSubmit() {
    let today = new Date().toISOString().split('T')[0];
    if (this.isEdit) {
      this.task.lastUpdatedDate = today;
      this.todoService.updateTask(this.task).subscribe(updatedTask => {
        this.taskUpdated.emit(updatedTask);
        alert('Task updated successfully');
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.task.creationDate = today;
      this.task.lastUpdatedDate = today;
      this.todoService.addTask(this.task).subscribe(newTask => {
        this.taskAdded.emit(newTask);
        alert('New task added successfully');
        this.router.navigate(['/dashboard']);
        this.resetForm();
      });
    }
  }
}
