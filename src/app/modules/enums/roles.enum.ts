export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export const translatedRoles: Record<RoleEnum, string> = {
  [RoleEnum.ADMIN]: 'Administrador',
  [RoleEnum.USER]: 'Usuário',
}