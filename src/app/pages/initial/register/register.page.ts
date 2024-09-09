import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { UserWithPassword } from "../../../modules/proxies/user.proxy";
import { RoleEnum } from "../../../modules/enums/roles.enum";
import { CustomValidators } from "../../../utils/validators";
import isValidEmail = CustomValidators.isValidEmail;
import isValidPassword = CustomValidators.isValidPassword;
import isValidName = CustomValidators.isValidName;
import { HelperService } from "../../../services/helper.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  //region Inject Properties

  private readonly router: Router = inject(Router);

  private readonly userService: UserService = inject(UserService);

  private readonly helperService: HelperService = inject(HelperService);

  //#endregion

  //#region Public Properties

  public registerPayload: UserWithPassword = {
    password: '',
    email: '',
    name: '',
    role: RoleEnum.USER,
    updatedAt: new Date(),
    createdAt: new Date(),
    id: 0,
  };

  //#endregion

  //#region Public Methods

  public async redirectToStart(): Promise<void> {
    return void await this.router.navigateByUrl('/start');
  }

  public canRegister(): boolean {
    return isValidEmail(this.registerPayload.email) &&
      isValidPassword(this.registerPayload.password) &&
      isValidName(this.registerPayload.name);
  }

  public async onSubmit(): Promise<void> {
    const success = this.userService.create(this.registerPayload);

    if (!success)
      return void await this.helperService.showToast('Usuário não foi criado, tente novamente mais tarde.');

    await this.helperService.showToast('Usuário criado com sucesso!');

    return void await this.router.navigateByUrl('/home');
  }

}
