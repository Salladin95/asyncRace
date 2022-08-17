import { getGarageMenu, getToGarageBtn, getToWinnersBtn } from '../garage/garageMenu';
import { createHtmlEl } from '../../helpers/dom';
import { getPopup } from '../garage/popup/renderPopup';
import { hidePopup } from '../garage/popup/interructWithPopup';
import { getWrapperForCarsAndPagination } from '../garage/track/track';
import { getPagination } from '../garage/pagination/renderPagination';
import { Icar, IWinner } from '../../../system/contracts';
import { Observer } from '../../oberver';
import { AppState } from '../../controller/contracts';
import { onStartCar } from '../../actions/startCar';
import { onStopCar } from '../../actions/stopCar';
import { selectCar } from '../../actions/select';
import { onCreateCar } from '../../actions/createCar';
import { updateCar } from '../../actions/update';
import { deleteCar } from '../../actions/remove';
import { onGenerateCars } from '../../actions/generateCars';
import { reset } from '../../actions/reset';
import { onRace } from '../../actions/race';

export class AppView {
  public drawGarage(): void {
    const body = document.querySelector('.body') as HTMLBodyElement;
    body.innerHTML = '';

    const wrapper = createHtmlEl('div', 'wrapper');
    wrapper.appendChild(getToWinnersBtn());
    wrapper.appendChild(getGarageMenu());
    wrapper.appendChild(getWrapperForCarsAndPagination());
    wrapper.appendChild(getPopup());
    body.appendChild(wrapper);
    getPagination();
  }

  public drawWinners(): void {
    const body = document.querySelector('.body') as HTMLBodyElement;
    body.innerHTML = '';

    const wrapper = createHtmlEl('div', 'wrapper');

    wrapper.appendChild(getToGarageBtn());

    const title = createHtmlEl('h1', 'title', 'Winners');
    wrapper.appendChild(title);

    const table = createHtmlEl('table', 'winners');
    wrapper.appendChild(table);

    const pagination = createHtmlEl('section', 'pagination');
    wrapper.appendChild(pagination);
    body.appendChild(wrapper);
    getPagination();
  }

  public getActions(
    obserberGarage: Observer<Icar>,
    options: AppState,
    obeserverWinners: Observer<IWinner>,
  ): void {
    hidePopup();
    onStartCar();
    onStopCar();
    selectCar();
    onCreateCar(obserberGarage, options);
    updateCar(obserberGarage, options);
    deleteCar(obserberGarage, options);
    onGenerateCars(obserberGarage, options);
    reset();
    onRace(obeserverWinners);
  }
}
