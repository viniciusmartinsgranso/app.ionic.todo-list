import { Component, inject } from '@angular/core';
import { UserService } from "../../../services/user.service";
import {  Router } from "@angular/router";
import { HelperService } from "../../../services/helper.service";
import { UserProxy } from "../../../modules/proxies/user.proxy";
import { RoleEnum, translatedRoles } from "../../../modules/enums/roles.enum";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage  {

  constructor() {
    this.formGroup = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  //#region Inject Properties

  private readonly userService: UserService = inject(UserService);

  private readonly router: Router = inject(Router);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  //#endregion

  //#region Public Properties

  public formGroup!: FormGroup;

  public role: typeof RoleEnum = RoleEnum;

  public translatedRole: Record<RoleEnum, string> = translatedRoles;

  //#endregion

  //#region Public Methods

  public async onSubmit(): Promise<void> {
    const payload = this.formGroup.getRawValue();
    const hasCreated = this.userService.createByAdmin(payload);

    if (!hasCreated) {
      return void this.helperService.showToast('Ocorreu um erro, tente novamente mais tarde.')
    }

    await this.helperService.showToast('Usuário ciado com sucesso!')

    return void this.redirectToHome();
  }

  public redirectToHome(): void {
    return void this.router.navigateByUrl('/home');
  }

  public roleChange(status: any) {
    this.formGroup.controls['role'].setValue(status.target.value);
  }

  //#endregion

}
