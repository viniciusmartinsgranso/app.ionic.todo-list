export enum StatusEnum {
  TODO = 1,
  PROGRESS = 2,
  DONE = 3
}

export const translatedStatus: Record<StatusEnum, string> = {
  [StatusEnum.TODO]: 'Pendente',
  [StatusEnum.PROGRESS]: 'Em andamento',
  [StatusEnum.DONE]: 'Concluído',
}