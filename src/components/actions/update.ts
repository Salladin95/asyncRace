import { Icar } from '../../system/contracts';
import { AppState } from '../controller/contracts';
import { Observer } from '../oberver';
import { getCarsRequest, updateRequest } from '../server';
import { togglePopupAppearance } from '../view/garage/popup/interructWithPopup';

export const updateCar = (oberver: Observer<Icar>, options: AppState): void => {
  document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.ok')) {
      return;
    }

    const popup = document.querySelector<HTMLElement>('.popup');
    const id = popup?.getAttribute('data-popup-id') as string;
    const inpName = document.getElementById('car-name') as HTMLInputElement;
    const inpColor = document.getElementById('car-color') as HTMLInputElement;

    try {
      await updateRequest(+id, inpName.value, inpColor.value);
      const newCars = await getCarsRequest();
      oberver.updateData(newCars, options);
      togglePopupAppearance();
    } catch (err) {
      console.log(err);
    }
  });
};
