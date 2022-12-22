import { selectRequest } from '../server';
import { togglePopupAppearance, updatePopupValues } from '../view/garage/popup/interructWithPopup';

export const selectCar = (): void => {
  document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.select')) {
      return;
    }

    const car = target.closest('.track')?.querySelector('.wrapper-car') as HTMLElement;
    const id = car.getAttribute('data-id') as string;

    try {
      const popup = document.querySelector<HTMLElement>('.popup');
      const res: { name: string, color: string, id: number } = await selectRequest(+id);
      updatePopupValues(res.name, res.color);
      togglePopupAppearance();
      popup?.setAttribute('data-popup-id', String(res.id));
    } catch (err) {
      console.log(err);
    }
  });
};
