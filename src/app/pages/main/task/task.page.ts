import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StatusEnum, translatedStatus } from "../../../modules/enums/status.enum";
import { HelperService } from "../../../services/helper.service";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { RoleEnum } from "../../../modules/enums/roles.enum";
import { UserProxy } from "../../../modules/proxies/user.proxy";
import { TaskService } from "../../../services/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  constructor() {
    this.minDate.setHours(this.minDate.getHours() - 3);

    this.formGroup = this.formBuilder.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      endDate: [new Date().toISOString(), [Validators.required]],
      status: ['', [Validators.required]],
      userId: [null, [Validators.required]],
      user: [null, [Validators.required]],
    });
  }

  //#region Inject Properties

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly userService: UserService = inject(UserService);

  private readonly taskService: TaskService = inject(TaskService);

  private readonly router: Router = inject(Router);

  //#endregion

  //#region Public Properties

  public formGroup!: FormGroup;

  public users: UserProxy[] = [];

  public isAdmin: boolean = false;

  public minDate: Date = new Date();

  public StatusEnum: typeof StatusEnum = StatusEnum;

  public translatedStatus: Record<StatusEnum, string> = translatedStatus;

  //#endregion

  public async ngOnInit(): Promise<void> {
    const user = this.userService.getLoggedUser();

    if (!user)
      return void this.router.navigateByUrl('/start');

    if (user.role === RoleEnum.USER) {
      this.formGroup.controls['userId'].setValue(user.id);
      this.formGroup.controls['user'].setValue(user);
    } else {
      this.isAdmin = true;

      this.users = this.userService.getUsers();
    }
  }

  public userTaskChange(user: any) {
    this.formGroup.controls['userId'].setValue(user.target.value.id);
    this.formGroup.controls['user'].setValue(user.target.value);
  }

  public statusTaskChange(status: any) {
    this.formGroup.controls['status'].setValue(status.target.value);
  }

  public async redirectToHome(): Promise<void> {
    return void await this.router.navigateByUrl('/home');
  }

  public async onSubmit(): Promise<void> {
    const payload = this.formGroup.getRawValue();

    if (payload.endDate <= this.minDate)
      return void this.helperService.showToast('Data de vencimento incorreta.')

    const hasCreated = this.taskService.create(payload);

    if (!hasCreated) {
      return void this.helperService.showToast('Ocorreu um erro, tente novamente mais tarde.')
    }

    await this.helperService.showToast('Tarefa criada com sucesso!')

    return void this.router.navigateByUrl('/home');
  }

}
