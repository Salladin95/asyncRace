import { IWinner } from '../../system/contracts';
import { removeDocumentElements, createHtmlEl } from '../helpers/dom';
import { Observer } from '../oberver';
import { engine, getWinnersRequest } from '../server';
import { animationRace } from './animation';
import { createWinner } from './createWinner';
import { updateWinner } from './updateWinner';

export const race = async (): Promise<number> => {
  const cars = document.querySelectorAll('.wrapper-car');
  const promisesStart: Promise<unknown>[] = [];

  removeDocumentElements('error');
  removeDocumentElements('winner');

  cars.forEach((car) => {
    if (document.querySelector('.winner')) {
      (document.querySelector('.winner') as HTMLElement).remove();
    }
    (car as HTMLElement).style.left = '105px';
    const id: number = +(car.getAttribute('data-id') as string);
    promisesStart.push(engine(id, 'started'));
  });

  const responseStarted = await Promise.all(promisesStart).then((values) => {
    return values as { velocity: number, distance: number }[];
  });
  return animationRace(responseStarted);
};

export const onRace = (obserberWinners: Observer<IWinner>): void => {
  document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.race')) {
      return;
    }
    const winnerId = await race();

    const winner = Array.from(document.querySelectorAll('.wrapper-car')).filter((car) => {
      const id: number = +(car.getAttribute('data-id') as string);
      return +winnerId === id;
    })[0] as HTMLElement;

    const title = createHtmlEl('h1', 'winner', 'Winner');
    winner.closest<HTMLElement>('.track')
      ?.querySelector<HTMLElement>('.trackItem')?.appendChild(title);

    try {
      await updateWinner(winner, winnerId);
    } catch (err) {
      await createWinner(winner, winnerId);
    }
    const newWinners = await getWinnersRequest();
    obserberWinners.data = newWinners;
  });
};
