import { createWinnerRequest } from '../server';

export const createWinner = async (winner: HTMLElement, id: number): Promise<void> => {
  let time = winner.getAttribute('time') as string;
  time = (+time / 1000).toFixed(2);
  await createWinnerRequest(id, 1, +time);
};
