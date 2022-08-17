import { AppState } from '../controller/contracts';
import { toggleButtonsState } from '../view/garage/pagination/renderPagination';
import { updateGarageTitle } from '../view/garage/track/track';

export class Observer<T> {
  obervers: Set<(data: T[]) => void> = new Set();

  data: T[] = [];

  public updateData(cars: T[], options: AppState) {
    this.data = cars;
    this.fire(this.getCurrentData(options), options);
  }

  public updatePage(options: AppState) {
    this.fire(this.getCurrentData(options), options);
  }

  private fire(cars: T[], options: AppState) {
    toggleButtonsState(options.page, options.pages);
    updateGarageTitle(options.size, options.page, options.activePage.toUpperCase());
    this.obervers.forEach((callaback) => callaback(cars));
  }

  public getCurrentData(options: AppState): T[] {
    return this.data.slice(this.startIndex(options), this.endIndex(options));
  }

  private startIndex(options: AppState): number {
    return (options.page - 1) * 10;
  }

  private endIndex(options: AppState): number {
    return options.page * 10;
  }

  public subscribe(callback: (data: T[]) => void) {
    this.obervers.add(callback);
  }

  public unSubscribe(callback: (data: T[]) => void) {
    this.obervers.delete(callback);
  }
}
