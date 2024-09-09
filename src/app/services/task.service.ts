import { Injectable } from '@angular/core';
import { TaskProxy } from "../modules/proxies/task.proxy";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly localStorageKey: string = 'tasks';

  public getTasks(): TaskProxy[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  public getTaskById(id: number): TaskProxy | undefined {
    const tasks = this.getTasks();
    return tasks.find(task => task.id === id);
  }

  public getTasksByUserId(userId: number): TaskProxy[] {
    const tasks = this.getTasks();
    return tasks.filter(task => task.userId === userId);
  }

  public create(task: Omit<TaskProxy, 'id' | 'createdAt' | 'updatedAt'>): boolean {
    const tasks = this.getTasks();
    const newTask: TaskProxy = {
      ...task,
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    tasks.push(newTask);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    return true;
  }

  public update(id: number, updatedTask: Partial<Omit<TaskProxy, 'id'>>): boolean {
    const tasks = this.getTasks();
    const task = tasks.find(task => task.id === id);

    if (!task) {
      return false;
    }

    const updatedTaskData: TaskProxy = {
      ...task,
      ...updatedTask,
      updatedAt: new Date()
    };

    const updatedTasks = tasks.map(t => t.id === id ? updatedTaskData : t);

    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedTasks));
    return true;
  }

  public delete(id: number): boolean {
    const tasks = this.getTasks();
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
      return false;
    }

    tasks.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    return true;
  }

}
