import { getWinnerRequest, updateWinnerRequest } from '../server';

export const updateWinner = async (
  winner: HTMLElement,
  id: number,
): Promise<void> => {
  const winnerBackground:
    { id: number, wins: number, time: number } = await getWinnerRequest(id);
  const time = winner.getAttribute('time') as string;
  let bestTime = +time > winnerBackground.time ? +time : winnerBackground.time;
  bestTime = +(+bestTime / 1000).toFixed(2);
  await updateWinnerRequest(winnerBackground.id, winnerBackground.wins + 1, bestTime);
};
