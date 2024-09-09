import { Component, inject, Input } from '@angular/core';
import { UserService } from "../../services/user.service";
import { UserProxy } from "../../modules/proxies/user.proxy";
import { RoleEnum } from "../../modules/enums/roles.enum";
import { HelperService } from "../../services/helper.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor() {
  }

  //#region Inject Properties

  private readonly userService: UserService = inject(UserService);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly router: Router = inject(Router);

  //#endregion

  //#region Public Properties

  @Input({ required: true })
  public user!: UserProxy;

  public isEdit: boolean = false;

  public roles: typeof RoleEnum = RoleEnum;

  //#endregion

  //#region Public Methods

  public async editUser(): Promise<void> {
    const canEdit = this.userService.update(this.user.id, this.user);

    if (!canEdit)
      await this.helperService.showToast('Ocorreu um erro.')

    await this.helperService.showToast('Atualizado com sucesso!');
  }

  public async logout(): Promise<void> {
    this.userService.logout();
    return void this.router.navigateByUrl('/start');
  }

  //#endregion

}
