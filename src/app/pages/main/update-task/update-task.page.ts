import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HelperService } from "../../../services/helper.service";
import { TaskService } from "../../../services/task.service";
import { UserService } from "../../../services/user.service";
import { UserProxy } from "../../../modules/proxies/user.proxy";
import { RoleEnum } from "../../../modules/enums/roles.enum";
import { StatusEnum, translatedStatus } from 'src/app/modules/enums/status.enum';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {

  constructor() {
    this.minDate.setHours(this.minDate.getHours() - 3);
    this.id = +this.route.snapshot.params['id'];

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

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private readonly router: Router = inject(Router);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly taskService: TaskService = inject(TaskService);

  private readonly userService: UserService = inject(UserService);

  //#endregion

  //#region Public Properties

  public formGroup!: FormGroup;

  public users: UserProxy[] = [];

  public isAdmin: boolean = false;

  public minDate: Date = new Date();

  public StatusEnum: typeof StatusEnum = StatusEnum;

  public translatedStatus: Record<StatusEnum, string> = translatedStatus;

  //#endregion

  //#region Private Properties

  private id: number = 0;

  //#endregion

  //#region Public Methods

  public async ngOnInit(): Promise<void> {
    const task = this.taskService.getTaskById(this.id);

    if (!task) {
      await this.helperService.showToast('A tarefa não existe.')
      return void this.redirectToHome();
    }

    const user = this.userService.getLoggedUser();

    if (!user)
      return void this.router.navigateByUrl('/start');

    if (user.role === RoleEnum.USER) {
      this.formGroup.controls['userId'].setValue(user.id);
      this.formGroup.controls['user'].setValue(user);
    } else {
      this.isAdmin = true;

      const users = this.userService.getUsers();

      this.users = users.filter(u => u.id !== user.id);
    }

    this.formGroup.setValue({
      title: task.title,
      description: task.description,
      endDate: task.endDate,
      status: task.status,
      userId: task.userId,
      user: task.user
    });
  }

  public userTaskChange(user: any) {
    this.formGroup.controls['userId'].setValue(user.target.value.id);
    this.formGroup.controls['user'].setValue(user.target.value);
  }

  public statusTaskChange(status: any) {
    this.formGroup.controls['status'].setValue(status.target.value);
  }

  public redirectToHome(): void {
    return void this.router.navigateByUrl('/home');
  }

  public async onSubmit(): Promise<void> {
    const payload = this.formGroup.getRawValue();

    if (payload.endDate <= this.minDate)
      return void this.helperService.showToast('Data de vencimento incorreta.')

    const hasCreated = this.taskService.update(this.id, payload);

    if (!hasCreated) {
      return void this.helperService.showToast('Ocorreu um erro, tente novamente mais tarde.')
    }

    await this.helperService.showToast('Tarefa atualizada com sucesso!')

    return void this.redirectToHome();
  }

  //#endregion

}
