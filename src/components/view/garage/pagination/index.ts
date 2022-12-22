import { Icar, IWinner, PaginationOption } from '../../../../system/contracts';
import { AppState } from '../../../controller/contracts';
import { Observer } from '../../../oberver';

export class Pagination {
  public onNavigation(
    obserberGarage: Observer<Icar>,
    obserberWinners: Observer<IWinner>,
    options: AppState,
  ): void {
    document.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.matches('.btn-pagination')) {
        return;
      }

      const paginationOption = target.getAttribute('data-pagination') as PaginationOption;

      const paginationFunctions: Record<PaginationOption, () => void> = {
        left: () => this.preventPage(options),
        topLeft: () => this.firstPage(options),
        right: () => this.nextPage(options),
        topRight: () => this.lastPage(options),
      };

      paginationFunctions[paginationOption]();
      localStorage.setItem(`${options.activePage}CurrentPage`, String(options.page));

      if (options.activePage === 'garage') {
        obserberGarage.updatePage(options);
      } else {
        obserberWinners.updatePage(options);
      }
    });
  }

  private nextPage = (options: AppState): void => {
    if (options.page < options.pages) {
      options.page += 1;
    }
  };

  private preventPage(options: AppState) {
    if (options.page > 1) {
      options.page -= 1;
    }
  }

  private firstPage(options: AppState) {
    if (options.page > 2) {
      options.page = 1;
    }
  }

  private lastPage(options: AppState) {
    if (options.page + 1 < options.pages) {
      options.page = options.pages;
    }
  }
}
