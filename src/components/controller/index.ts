import { Icar, IWinner } from '../../system/contracts';
import { sortBy } from '../actions/sort';
import { Observer } from '../oberver';
import { getCarsRequest, getWinnersRequest } from '../server';
import { AppView } from '../view/appView';
import { Pagination } from '../view/garage/pagination';
import { getGarageOfCars } from '../view/garage/track/track';
import { onToGarage, onToWinners } from '../view/onNavigation';
import { renderTable } from '../view/winners/renderTable';
import {
  ActivePageOption,
  AppState,
  SortOption,
} from './contracts';

export class AppController {
  cars: Icar[] = [];

  winners: IWinner[] = [];

  view = new AppView();

  pagination = new Pagination();

  obserberGarage: Observer<Icar> = new Observer();

  obserberWinners: Observer<IWinner> = new Observer();

  appState: AppState = {
    page: 1, pages: 1, size: 1, activePage: 'garage', sort: 'time',
  };

  private launchGarage = () => {
    this.appState.activePage = 'garage' as ActivePageOption;
    localStorage.setItem('activePage', this.appState.activePage);
    this.initialiseAppState(this.cars, 'garageCurrentPage');
    this.view.drawGarage();
    this.obserberGarage.updateData(this.cars, this.appState);
  };

  private launchWinners = async () => {
    this.appState.activePage = 'winners' as ActivePageOption;
    localStorage.setItem('activePage', this.appState.activePage);

    this.initialiseAppState(this.winners, 'winnersCurrentPage');
    this.view.drawWinners();
    this.obserberWinners.updateData(this.winners, this.appState);
  };

  public initialize = async () => {
    try {
      this.cars = await getCarsRequest();
      this.winners = await getWinnersRequest();

      this.winners = sortBy(this.winners, this.appState);

      this.obserberGarage.subscribe(getGarageOfCars);
      this.obserberWinners.subscribe(renderTable);

      this.view.getActions(
        this.obserberGarage,
        this.appState,
        this.obserberWinners,
      );

      this.pagination.onNavigation(this.obserberGarage, this.obserberWinners, this.appState);

      onToGarage(this.obserberGarage, this.appState, this.view.drawGarage);
      onToWinners(this.obserberWinners, this.appState, this.view.drawWinners);

      const activePageOption = (localStorage.getItem('activePage') ?? 'garage') as ActivePageOption;
      this.launchPage[activePageOption]();
    } catch (err) {
      alert('launch server');
    }
  };

  public initialiseAppState<T>(data: T[], activePageOption: string): void {
    this.appState.pages = Math.ceil(data.length / 10);
    this.appState.size = data.length;
    this.appState.sort = (localStorage.getItem('sort') ?? 'time') as SortOption;

    let localStoragePage = localStorage.getItem(activePageOption) ?? '1';
    if (+localStoragePage >= this.appState.pages) {
      localStoragePage = '1';
    }
    localStorage.setItem(activePageOption, localStoragePage);
    this.appState.page = +localStoragePage;
  }

  private launchPage: Record<ActivePageOption, () => void> = {
    garage: () => this.launchGarage(),
    winners: () => this.launchWinners(),
  };
}
