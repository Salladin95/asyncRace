import { Icar } from '../../../../system/contracts';
import { addClasses, createHtmlEl } from '../../../helpers/dom';

export const getCar = (color: string): HTMLElement => {
  const wrapper = createHtmlEl('div', 'wrapper-car');
  wrapper.innerHTML = `
    <svg display="none">
      <symbol xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
        xml:space="preserve" viewBox="0 0 256 256" id="sport-car-1768">
        <defs></defs>
        <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path
            d="M 83.748 56.42 h 3.311 c 1.624 0 2.941 -1.317 2.941 -2.941 v -7.145 c -0.8 -5.443 -12.12 -8.71 -22.414 -8.645 C 51.478 25.661 32.041 25.808 9.79 36.248 l -7.148 1.191 c -1.418 0.236 -2.458 1.463 -2.458 2.901 v 10.344 c 0 0.705 0.253 1.386 0.713 1.92 L 3.307 55.4 c 0.559 0.648 1.372 1.021 2.228 1.021 h 3.602 H 83.748 z"
            transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
          <path
            d="M 28.863 35.217 l 0.656 1.286 c 0.371 0.727 1.118 1.185 1.934 1.185 h 36.133 c -8.846 -8.04 -24.042 -10.686 -37.566 -5.493 C 28.816 32.659 28.278 34.068 28.863 35.217 z"
            transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
          <path
            d="M 37.65 43.459 h -2.022 c -0.542 0 -0.981 -0.439 -0.981 -0.981 s 0.439 -0.981 0.981 -0.981 h 2.022 c 0.542 0 0.981 0.439 0.981 0.981 S 38.192 43.459 37.65 43.459 z"
            transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
          <path
            d="M 89.886 45.806 c -1.913 0 -3.721 0 -5.031 0 c -1.721 -1.706 -2.784 -3.849 -3.533 -6.202 C 86.01 40.95 89.396 42.809 89.886 45.806 z"
            transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
          <circle cx="74.044" cy="53.474" r="7.994" transform="  matrix(1 0 0 1 0 0) "></circle>
          <circle cx="74.045" cy="53.464999999999996" r="2.665" transform="  matrix(1 0 0 1 0 0) "></circle>
          <circle cx="16.724" cy="53.474" r="7.994" transform="  matrix(1 0 0 1 0 0) "></circle>
          <circle cx="16.725" cy="53.464999999999996" r="2.665" transform="  matrix(1 0 0 1 0 0) "></circle>
          <path d="M 36.378 29.519" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
          <path
            d="M 0.184 41.242 h 2.934 c 0.916 0 1.659 0.743 1.659 1.659 v 0 c 0 0.916 -0.743 1.659 -1.659 1.659 H 0.184 C -0.061 43.454 -0.061 42.348 0.184 41.242 z"
            transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
        </g>
      </symbol>
    </svg>

    <svg class="icon" style="fill: ${color}">
      <use xlink:href="#sport-car-1768"></use>
    </svg>`;
  return wrapper;
};

export const getTrack = (carName: string, carColor: string, id: number): HTMLElement => {
  const selectBtn = createHtmlEl('button', 'btn', 'SELECT');
  addClasses(selectBtn, ['btn-success', 'select']);

  const removeBtn = createHtmlEl('button', 'btn', 'REMOVE');
  addClasses(removeBtn, ['btn-danger', 'remove']);

  const carTitle = createHtmlEl('div', 'car-title', carName);
  const trackItem1 = createHtmlEl('div', 'trackItem');
  trackItem1.appendChild(selectBtn);
  trackItem1.appendChild(removeBtn);
  trackItem1.appendChild(carTitle);

  const btnStartEngine = createHtmlEl('button', 'btn', 'A');
  addClasses(btnStartEngine, ['btn-success', 'start']);

  const btnStopEngine = createHtmlEl('button', 'btn', 'B');
  addClasses(btnStopEngine, ['btn-danger', 'stop']);
  btnStopEngine.setAttribute('disabled', 'disabled');

  const car = getCar(carColor) as HTMLElement;
  car.setAttribute('data-id', String(id));

  const trackItem2 = createHtmlEl('div', 'trackItem');
  const flag = createHtmlEl('div', 'flag');
  const flagImg = createHtmlEl('img', 'flagImg') as HTMLImageElement;
  flagImg.src = './assets/images/finish.png';
  flag.appendChild(flagImg);
  trackItem2.appendChild(btnStartEngine);
  trackItem2.appendChild(btnStopEngine);
  trackItem2.appendChild(car);
  trackItem2.appendChild(flag);

  const track = createHtmlEl('div', 'track');
  track.appendChild(trackItem1);
  track.appendChild(trackItem2);
  return track;
};

export const getWrapperForCarsAndPagination = (): HTMLElement => {
  const wrapper = createHtmlEl('main', 'wrapper');
  wrapper.classList.add('main');

  const title = createHtmlEl('h1', 'title', 'Garage');
  wrapper.appendChild(title);
  const cars = createHtmlEl('section', 'cars');
  wrapper.appendChild(cars);
  const pagination = createHtmlEl('section', 'pagination');
  wrapper.appendChild(pagination);
  return wrapper;
};

export const getGarageOfCars = (cars: Icar[]): void => {
  const wrapper = document.querySelector('.cars') as HTMLElement;
  wrapper.innerHTML = '';
  cars.forEach((car) => {
    wrapper.appendChild(getTrack(car.name, car.color, car.id));
  });
};

export const updateGarageTitle = (amountOfCars: number, page: number, pageTitle: string): void => {
  (document.querySelector('.title') as HTMLElement).innerHTML = `${pageTitle} (${amountOfCars}) - page #${page}`;
};
