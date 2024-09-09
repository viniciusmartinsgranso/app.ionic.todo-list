import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, Subscription } from "rxjs";
import { UserWithPassword } from "../modules/proxies/user.proxy";
import { RoleEnum } from "../modules/enums/roles.enum";
import { UserService } from "../services/user.service";
import { NavbarInterface } from "../modules/interfaces/navbar.interface";
import { NavbarEnum } from "../modules/enums/navbar.enum";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  //Inject Properties

  private readonly router: Router = inject(Router);

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private readonly userService: UserService = inject(UserService);

  //#endregion

  constructor() {
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((route) => {
        const routerEvent = route as NavigationEnd;

        if (!this.routesWithoutNavbar.includes(routerEvent.url)) {
          if (!this.routesWithoutNavbar.includes(routerEvent.urlAfterRedirects))
            this.canShowNavbar = true;
        } else {
          this.canShowNavbar = false;
        }
      });
  }

  //#region Private Properties

  private routesWithoutNavbar: string[] = ['/login', '/register', '/start'];

  private routeSubscription: Subscription = new Subscription();

  //endregion

  //#region Public Properties

  public canShowNavbar: boolean = false;

  public routes: NavbarInterface[] = [
    {
      icon: 'assets/images/home.svg',
      iconActivated: 'assets/images/selected-home.svg',
      link: '/home',
      type: NavbarEnum.HOME
    },
    {
      icon: 'assets/images/user.svg',
      iconActivated: 'assets/images/selected-user.svg',
      link: '/profile',
      type: NavbarEnum.PROFILE
    }
  ];

  //#endregion

  //#region Public Methods

  public ngOnInit(): void {
    this.createAdmin();
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  //#enderegion

  //#region Private Methods

  private createAdmin(): void {
    const users = this.userService.getUsers();

    if (!users.length) {
      const data: UserWithPassword[] = [];

      const admin: UserWithPassword = {
        name: 'Admin',
        id: 1,
        email: 'admin@admin.com',
        password: '123456',
        role: RoleEnum.ADMIN,
        updatedAt: new Date(),
        createdAt: new Date(),
      }

      data.push(admin);

      localStorage.setItem('users', JSON.stringify(data));
    }

  }

  //#endregion

}
