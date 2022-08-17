import { IWinner } from '../../system/contracts';
import { AppState, SortOption } from '../controller/contracts';

export const comparatorsByOption: Record<SortOption, (a: IWinner, b: IWinner) => number> = {
  wins: (a, b) => b.wins - a.wins,
  winsReverse: (a, b) => a.wins - b.wins,
  time: (a, b) => a.time - b.time,
  timeReverse: (a, b) => b.time - a.time,
};

export const sortBy = (data: IWinner[], options: AppState): IWinner[] => {
  const comparator = comparatorsByOption[options.sort];
  return data.sort(comparator);
};
