import { engine } from '../server';
import { pauseCar } from './startCar';

export const animation = (
  car: HTMLElement,
  duration: number,
) => {
  const flag = car.closest('.trackItem')?.querySelector('.flag') as HTMLElement;
  const frame = [
    { transform: `translateX(${car.getBoundingClientRect().x - 135}px)` },
    { transform: `translateX(${flag.getBoundingClientRect().x - 90}px)` },
  ];

  if (car.getAttribute('data-appAnimated') === 'true') {
    console.log('here');
  }

  const start = Date.now();
  car.setAttribute('data-appAnimated', 'true');
  const animate = car.animate(frame, { duration });
  animate.addEventListener('finish', () => {
    car.setAttribute('data-time', String(Date.now() - start));
    car.style.left = `${flag.getBoundingClientRect().x + 20}px`;
    car.setAttribute('data-appAnimated', 'false');
  });
  animate.addEventListener('cancel', () => {
    car.setAttribute('data-appAnimated', 'false');
  });
  return animate;
};

export const animationRace = async (
  values: { velocity: number, distance: number }[],
): Promise<number> => {
  const cars = Array.from(document.querySelectorAll('.wrapper-car'));

  const promises = cars.map((car, index) => {
    const id: number = +(car.getAttribute('data-id') as string);
    const flag = car.closest('.trackItem')?.querySelector('.flag') as HTMLElement;
    const frame = [
      { transform: `translateX(${car.getBoundingClientRect().x - 135}px)` },
      { transform: `translateX(${flag.getBoundingClientRect().x - 90}px)` },
    ];

    const duration = values[index].distance / values[index].velocity;
    const animate = car.animate(frame, duration);
    const start = Date.now();
    engine(id, 'drive').catch(() => pauseCar(car as HTMLElement, animate));
    return animate.finished
      .then(() => {
        (car as HTMLElement).style.left = `${flag.getBoundingClientRect().x + 20}px`;
        const finish = Date.now() - start;
        car.setAttribute('time', String(finish));
        return id;
      });
  });
  const winnerId = await Promise.any(promises);
  return winnerId;
};
