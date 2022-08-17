import { engine } from '../server';

export const stopCar = async (car: HTMLElement) => {
  try {
    const id: number = +(car.getAttribute('data-id') as string);
    await engine(id, 'stopped');
    car.style.left = '105px';
    if (document.querySelector('.error')) {
      (document.querySelector('.error') as HTMLElement).remove();
    }
  } catch (err) {
    console.log(err);
  }
};

export const onStopCar = (): void => {
  document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.stop')) {
      return;
    }
    const car = target.closest('.trackItem')?.querySelector('.wrapper-car') as HTMLElement;
    stopCar(car);
  });
};
