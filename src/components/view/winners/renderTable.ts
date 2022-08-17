import { Icar, IWinner } from '../../../system/contracts';
import { createHtmlEl } from '../../helpers/renderFunctions';
import { getWinnerRequest, selectRequest } from '../../server';
import { getCar } from '../garage/track/track';

const getCol = async (id: number, number: number, table: HTMLElement): Promise<void> => {
  const winner: IWinner = await getWinnerRequest(id);
  const car: Icar = await selectRequest(id);
  const col = createHtmlEl('tr', 'listItem');

  const carImg = getCar(String(car.color));
  const colOfCar = createHtmlEl('td', 'table__value');
  colOfCar.appendChild(carImg);

  col.appendChild(createHtmlEl('td', 'table__value', String(number)));
  col.appendChild(colOfCar);
  col.appendChild(createHtmlEl('td', 'table__value', String(car.name)));
  col.appendChild(createHtmlEl('td', 'table__value', String(winner.wins)));
  col.appendChild(createHtmlEl('td', 'table__value', String(winner.time)));

  table.appendChild(col);
};

const fillTittles = (table: HTMLElement): void => {
  const col = createHtmlEl('tr', 'listItem');
  col.appendChild(createHtmlEl('th', 'table__title', '№'));
  col.appendChild(createHtmlEl('th', 'table__title', 'Image of the car'));
  col.appendChild(createHtmlEl('th', 'table__title', 'Name of the car'));
  col.appendChild(createHtmlEl('th', 'table__title', 'Wins number'));
  col.appendChild(createHtmlEl('th', 'table__title', 'Best time in seconds'));
  table.appendChild(col);
};

export const renderTable = (winners: IWinner[]): void => {
  const table = document.querySelector('.winners') as HTMLElement;
  table.innerHTML = '';

  fillTittles(table);
  winners.forEach((winner, index) => getCol(winner.id, index + 1, table));
};
