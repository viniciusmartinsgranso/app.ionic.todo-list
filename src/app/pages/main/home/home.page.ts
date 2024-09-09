import { Component, inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { RoleEnum, translatedRoles } from "../../../modules/enums/roles.enum";
import { TaskProxy } from "../../../modules/proxies/task.proxy";
import { StatusEnum, translatedStatus } from "../../../modules/enums/status.enum";
import { NavbarEnum } from "../../../modules/enums/navbar.enum";
import { TaskService } from "../../../services/task.service";
import { HelperService } from "../../../services/helper.service";
import { UserProxy } from "../../../modules/proxies/user.proxy";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //#region Private Methods

  private readonly userService: UserService = inject(UserService);

  private readonly router: Router = inject(Router);

  private readonly taskService: TaskService = inject(TaskService);

  private readonly helperService: HelperService = inject(HelperService);

  //#endregion

  //#region Public Properties

  public isAdmin: boolean = false;

  public tasks: TaskProxy[] = [];

  public translatedTaskStatus: Record<StatusEnum, string> = translatedStatus;

  public currentNavbar: NavbarEnum = NavbarEnum.HOME;

  public NavbarEnum: typeof NavbarEnum = NavbarEnum;

  public user!: UserProxy;

  public taskStatus: typeof StatusEnum = StatusEnum;

  public roleStatus: typeof RoleEnum = RoleEnum;

  public translatedRole: Record<RoleEnum, string> = translatedRoles;

  public users: UserProxy[] = [];

  //#endregion

  //#region Public Methods

  public ionViewDidEnter(): void {
    this.loadTaskByUserRole();
  }

  public setCurrentNavbar(item: NavbarEnum): void {
    this.currentNavbar = item;
  }

  public async redirectToTask(): Promise<void> {
    return void await this.router.navigateByUrl('/task')
  }

  public onReload(): void {
    this.loadTaskByUserRole();
  }

  public async deleteTask(id: number): Promise<void> {
    const success = this.taskService.delete(id);

    if (!success)
      return void await this.helperService.showToast('Ocorreu um erro, tente novamente mais tarde.');

    this.loadTaskByUserRole();
    return void await this.helperService.showToast('Tarefa deletada com sucesso!');
  }

  public filterStatus(event: any): void {
    this.tasks = this.taskService.getTasks();

    if (event.target.value)
      this.tasks = this.tasks.filter(task => task.status === event.target.value);
    else
      this.tasks = this.tasks.filter(task => task.status);
  }

  public filterUsers(event: any): void {
    this.users = this.userService.getUsers();

    if (event.target.value)
      this.users = this.users.filter(us => us.role === event.target.value);
    else
      this.users = this.users.filter(us => us.role);
  }

  public async deleteUser(id: number): Promise<void> {
    const canDelete = this.userService.delete(id);

    if (!canDelete)
      return void await this.helperService.showToast('Ocorreu um erro!');

    this.onReload();
    return void await this.helperService.showToast('Usuário deletado.')
  }

  public logout(): void {
    this.userService.logout();
    return void this.router.navigateByUrl('/start');
  }

  //#endregion

  private loadTaskByUserRole(): void {
    const loggedUser = this.userService.getLoggedUser();

    if (!loggedUser)
      return void this.router.navigateByUrl('/start');

    this.user = loggedUser;

    if (this.user.role === RoleEnum.ADMIN)
      this.isAdmin = true;

    if (!this.isAdmin) {
      this.tasks = this.taskService.getTasksByUserId(this.user.id);
    } else {
      this.tasks = this.taskService.getTasks();
      this.users = this.userService.getUsers();
    }
  }

  //#endregion
}
