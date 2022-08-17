import { Icar } from '../../system/contracts';
import { AppState } from '../controller/contracts';
import { Observer } from '../oberver';
import { deleteRequest, getCarsRequest } from '../server';

export const deleteCar = (oberver: Observer<Icar>, options: AppState): void => {
  document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.remove')) {
      return;
    }

    const car = target.closest('.track')?.querySelector('.wrapper-car') as HTMLElement;
    const id = car.getAttribute('data-id') as string;

    options.size -= 1;
    options.pages = Math.ceil(options.size / 10);
    if (options.page > options.pages) {
      options.page -= 1;
    }

    try {
      await deleteRequest(+id);
      const newCars = await getCarsRequest();
      oberver.updateData(newCars, options);
    } catch (err) {
      console.log(err);
    }
  });
};
