import { Role } from "../Enums/role.enum";

export type AuthJwtPayload = {
  sub: number;
  
  role: string;
};

export class testbody {
  lol: string;
}
