import { Icar, IWinner } from '../../system/contracts';
import { sortBy } from '../actions/sort';
import { ActivePageOption, AppState } from '../controller/contracts';
import { updateAppState } from '../helpers/updateAppState';
import { Observer } from '../oberver';
import { getCarsRequest, getWinnersRequest } from '../server';

export const onToGarage = (
  observer: Observer<Icar>,
  options: AppState,
  callback: () => void,
): void => {
  document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.toGarage')) {
      return;
    }

    localStorage.setItem('activePage', 'garage');
    options.activePage = 'garage' as ActivePageOption;
    callback();

    const newCars = await getCarsRequest();
    updateAppState(newCars, options);
    observer.updateData(newCars, options);
  });
};

export const onToWinners = (
  observerWinners: Observer<IWinner>,
  options: AppState,
  callback: () => void,
): void => {
  document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.toWinners')) {
      return;
    }

    localStorage.setItem('activePage', 'winners');
    options.activePage = 'winners' as ActivePageOption;
    callback();

    const newWinners = await getWinnersRequest();
    updateAppState(newWinners, options);
    observerWinners.updateData(sortBy(newWinners, options), options);
  });
};
