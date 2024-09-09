import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage {

  private readonly router: Router = inject(Router);

  public async redirectToRegister(): Promise<void> {
    await this.router.navigateByUrl('/register');
  }

  public async redirectToLogin(): Promise<void> {
    await this.router.navigateByUrl('/login');
  }

}
