import { NavbarEnum } from "../enums/navbar.enum";

export interface NavbarInterface {
  type: NavbarEnum;
  link: string;
  icon: string;
  iconActivated: string;
}