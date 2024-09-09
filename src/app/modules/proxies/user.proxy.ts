import { BaseProxy } from "./base.proxy";
import { RoleEnum } from "../enums/roles.enum";

export interface UserProxy extends BaseProxy {
  name: string;
  email: string;
  role: RoleEnum;
}

export type UserWithPassword = UserProxy & { password: string };