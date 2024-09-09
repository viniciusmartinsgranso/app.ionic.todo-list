import { Component, inject, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { UserProxy } from "../../../modules/proxies/user.proxy";
import { ActivatedRoute, Router } from "@angular/router";
import { HelperService } from "../../../services/helper.service";
import { RoleEnum, translatedRoles } from "../../../modules/enums/roles.enum";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {

  constructor() {
    this.id = +this.route.snapshot.params['id'];
  }

  //#region Inject Properties

  private readonly userService: UserService = inject(UserService);

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private readonly router: Router = inject(Router);

  private readonly helperService: HelperService = inject(HelperService);

  //#endregion

  //#region Public Properties

  public user!: UserProxy;

  private id: number = 0;

  public role: typeof RoleEnum = RoleEnum;

  public translatedRole: Record<RoleEnum, string> = translatedRoles;

  //#endregion

  //#region Public Methods

  public async ngOnInit(): Promise<void> {
    const us = this.userService.getUserById(this.id);

    if (!us){
      await this.helperService.showToast('O usuário não existe.')
      return void this.redirectToHome();
    }

    this.user = us;
  }

  public async onSubmit(): Promise<void> {
    const hasCreated = this.userService.update(this.id, this.user);

    if (!hasCreated) {
      return void this.helperService.showToast('Ocorreu um erro, tente novamente mais tarde.')
    }

    await this.helperService.showToast('Usuário atualizado com sucesso!')

    return void this.redirectToHome();
  }

  public redirectToHome(): void {
    return void this.router.navigateByUrl('/home');
  }

  //#endregion

  //#region Private Methods

  //#endregion

}
