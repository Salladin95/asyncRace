import { stopCar } from './stopCar';
import { unblockMenuButtons } from './toggleStateForButtons';

export const reset = (): void => {
  document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.reset')) {
      return;
    }

    if (document.querySelector('.winner')) {
      (document.querySelector('.winner') as HTMLElement).remove();
    }

    const cars = document.querySelectorAll('.wrapper-car');
    cars.forEach(async (car) => {
      stopCar(car as HTMLElement);
    });
    unblockMenuButtons();
  });
};
