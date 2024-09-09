import { Component, inject, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { UserWithPassword } from "../../../modules/proxies/user.proxy";
import { RoleEnum } from "../../../modules/enums/roles.enum";
import { HelperService } from "../../../services/helper.service";
import { CustomValidators } from "../../../utils/validators";
import isValidEmail = CustomValidators.isValidEmail;
import isValidPassword = CustomValidators.isValidPassword;
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //#region Inject Properties

  private readonly userService: UserService = inject(UserService);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly router: Router = inject(Router);

  //#endregion

  //#region Public Properties

  public loginPayload: UserWithPassword = {
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

  public async ngOnInit(): Promise<void> {
    const hasUser = this.userService.getLoggedUser();

    if (hasUser)
      return void await this.router.navigateByUrl('/home');
  }

  public async onSubmit(): Promise<void> {
    if (!this.canLogin())
      return;

    const success = this.userService.login(this.loginPayload);

    if (!success)
      return void await this.helperService.showToast('Usuário ou senha incorretos.');

    await this.helperService.showToast('Usuário logado com sucesso!');
    return void await this.router.navigateByUrl('/home');
  }

  public canLogin(): boolean {
    return isValidEmail(this.loginPayload.email) && isValidPassword(this.loginPayload.password);
  }

  public async redirectToRegister(): Promise<void> {
    return void await this.router.navigateByUrl('/register');
  }

  public async redirectToStart(): Promise<void> {
    return void await this.router.navigateByUrl('/start');
  }

  //#endregion

}
