import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() statusChange = new EventEmitter<Task>();
  @Output() taskUpdate = new EventEmitter<Task>();
  @Output() taskClone = new EventEmitter<Task>();
  @Output() taskDelete = new EventEmitter<number>();

  isEditing = false; // Flag to toggle edit mode

  toggleStatus() {
    let newStatus = this.task.status === 'Pending' ? 'Complete' : 'Pending';
    this.task.status = newStatus;
    this.task.lastUpdatedDate = new Date().toISOString().split('T')[0];
    this.statusChange.emit(this.task);
  }

  updateTask() {
    this.task.lastUpdatedDate = new Date().toISOString().split('T')[0];
    this.taskUpdate.emit(this.task);
  }

  cloneTask() {
    let clonedTask: Task = { 
      ...this.task, 
      id: undefined, 
      creationDate: new Date().toISOString().split('T')[0], 
      lastUpdatedDate: new Date().toISOString().split('T')[0] 
    };
    this.taskClone.emit(clonedTask);
  }

  deleteTask() {
    if (this.task.id !== undefined) {
      this.taskDelete.emit(this.task.id);
    }
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  saveTask() {
    this.updateTask(); // Save task updates
    this.toggleEditMode(); // Switch back to view mode
  }
}