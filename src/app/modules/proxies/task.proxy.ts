import { BaseProxy } from "./base.proxy";
import { StatusEnum } from "../enums/status.enum";
import { UserProxy } from "./user.proxy";

export interface TaskProxy extends BaseProxy {
  title: string;
  description: string;
  endDate: Date;
  status: StatusEnum;
  userId: number;
  user: UserProxy;
}