import { IsEnum } from "class-validator";

export class UpdateUserRoleDto {

  @IsEnum(['ADMIN', 'USER'])
  role: 'ADMIN' | 'USER';
}