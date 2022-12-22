import { createHtmlEl } from '../helpers/dom';
import { engine } from '../server';
import { animation } from './animation';
import { blockTrackButtnos, unblockTrackButtnos } from './toggleStateForButtons';

export const pauseCar = (car: HTMLElement, animate: Animation): void => {
  const pos = car.getBoundingClientRect().x - 20;
  car.style.left = `${pos}px`;
  animate.cancel();
  const error = createHtmlEl('h1', 'error', 'The car broke down');
  car.closest<HTMLElement>('.track')?.querySelector<HTMLElement>('.trackItem')?.appendChild(error);
};

export const startCar = async (car: HTMLElement) => {
  const id: number = +(car.getAttribute('data-id') as string);
  try {
    blockTrackButtnos(car, '');
    engine(id, 'started').then((response: { velocity: number, distance: number }) => {
      const stop = animation(car, response.distance / response.velocity);
      stop.finished.then(() => unblockTrackButtnos(car, 'start'));
      engine(id, 'drive').catch(() => {
        unblockTrackButtnos(car, 'start');
        pauseCar(car, stop);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const onStartCar = (): void => {
  document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.start')) {
      return;
    }
    const car = target.closest('.trackItem')?.querySelector('.wrapper-car') as HTMLElement;
    startCar(car);
  });
};
