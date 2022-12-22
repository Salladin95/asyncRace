import { Icar } from '../../system/contracts';
import { AppState } from '../controller/contracts';
import { Observer } from '../oberver';
import { getCarsRequest, requestForCreateCar } from '../server';

export const onCreateCar = (oberver: Observer<Icar>, options: AppState): void => {
  document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.create')) {
      return;
    }

    const name = target.closest<HTMLElement>('.menuItem')
      ?.querySelector('[type="text"]') as HTMLInputElement;
    const color = target.closest<HTMLElement>('.menuItem')
      ?.querySelector('[type="color"]') as HTMLInputElement;

    try {
      await requestForCreateCar(name.value, color.value);
      name.value = '';

      options.size += 1;
      options.pages = Math.ceil(options.size / 10);

      const newCars = await getCarsRequest();
      oberver.updateData(newCars, options);
    } catch (err) {
      console.log(err);
    }
  });
};
