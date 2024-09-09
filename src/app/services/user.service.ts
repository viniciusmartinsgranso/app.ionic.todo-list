import { Injectable } from "@angular/core";
import { UserProxy, UserWithPassword } from "../modules/proxies/user.proxy";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginPayload } from "../modules/payloads/login.payload";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //#region Private Keys

  private readonly localStorageKey: string = 'users';
  private readonly loggedUserKey: string = 'loggedUser';

  //#endregion

  //#region Public Properties

  public getUsers(): UserWithPassword[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }

  public getUserById(id: number): UserProxy | undefined {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  public create(user: Omit<UserWithPassword, 'id'>): boolean {
    const users = this.getUsers();
    const userWithSameEmail = users.find(u => u.email === user.email);

    if (userWithSameEmail) {
      return false;
    }

    const newUser: UserWithPassword = {
      ...user,
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);

    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    this.setUser(newUser);
    return true;
  }

  public createByAdmin(user: Omit<UserWithPassword, 'id'>): boolean {
    const users = this.getUsers();
    const userWithSameEmail = users.find(u => u.email === user.email);

    if (userWithSameEmail) {
      return false;
    }

    const newUser: UserWithPassword = {
      ...user,
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);

    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return true;
  }

  public login(userPayload: LoginPayload): boolean {
    const users = this.getUsers();

    const user = users.find(u => u.email === userPayload.email && u.password);

    if (user) {
      this.setUser(user);
      return true;
    } else {
      return false;
    }
  }

  public update(id: number, userPayload: Partial<Omit<UserProxy, 'id'>>): boolean {
    const users = this.getUsers();
    const user = users.find(us => us.id === id);

    if (!user) {
      return false;
    }

    const hasSameEmail = users.some(us => us.email === userPayload.email && us.id !== id);

    if (hasSameEmail) {
      return false;
    }

    const updatedUser: UserWithPassword = {
      ...user,
      ...userPayload,
      updatedAt: new Date()
    };

    const updatedUsers = users.map(u => u.id === id ? updatedUser : u);

    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedUsers));
    return true;
  }

  public delete(id: number): boolean {
    const users = this.getUsers();
    const loggedUser = this.getLoggedUser();

    if (!loggedUser)
      return false;

    const index = users.findIndex(user => user.id === id);
    const us = users.find(us => us.id === id);

    if (us && us.id === loggedUser.id) {
      return false;
    }

    if (index === -1) {
      return false;
    }

    users.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return true;
  }

  public getLoggedUser(): UserProxy | null {
    const user = localStorage.getItem(this.loggedUserKey);
    return user ? JSON.parse(user) : null;
  }

  public logout(): void {
    localStorage.removeItem(this.loggedUserKey);
  }

  //#endregion

  //#region Private Methods

  private setUser(user: UserProxy): void {
    localStorage.setItem(this.loggedUserKey, JSON.stringify(user));
  }

  //#endregion

}