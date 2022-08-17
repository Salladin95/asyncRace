export interface Icar {
  name: string;
  color: string;
  id: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export type PaginationOption = 'topLeft' | 'left' | 'right' | 'topRight';
