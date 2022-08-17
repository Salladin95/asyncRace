import { addClasses, createHtmlEl } from '../../helpers/renderFunctions';

const getInputColon = (btnName: string): HTMLElement => {
  const container = createHtmlEl('div', 'menuItem');
  const inputTxt = createHtmlEl('input') as HTMLInputElement;
  inputTxt.type = 'text';
  const inputColor = createHtmlEl('input') as HTMLInputElement;
  inputColor.type = 'color';
  inputColor.defaultValue = '#f8f9fa';

  const btn = createHtmlEl('button', 'btn', btnName.toUpperCase());
  addClasses(btn, ['btn-success', btnName.toLowerCase()]);
  container.appendChild(inputTxt);
  container.appendChild(inputColor);
  container.appendChild(btn);
  return container;
};

const getButtonsRaceResetGenerateCars = (): HTMLElement => {
  const container = createHtmlEl('div', 'menuItem');
  const race = createHtmlEl('button', 'btn', 'RACE');
  addClasses(race, ['btn-success', 'race']);
  const reset = createHtmlEl('button', 'btn', 'RESET');
  addClasses(reset, ['btn-danger', 'reset']);
  const generateCars = createHtmlEl('button', 'btn', 'GENERATE CARS');
  addClasses(generateCars, ['btn-success', 'generateCars']);
  container.appendChild(race);
  container.appendChild(reset);
  container.appendChild(generateCars);
  return container;
};

export const getToWinnersBtn = (): HTMLElement => {
  const navigation = createHtmlEl('div', 'navigation');
  const btnToWinners = createHtmlEl('button', 'btn', 'TO WINNERS');
  addClasses(btnToWinners, ['btn-success', 'toWinners']);
  navigation.appendChild(btnToWinners);
  return navigation;
};

export const getToGarageBtn = (): HTMLElement => {
  const navigation = createHtmlEl('div', 'navigation');
  const btnToGarage = createHtmlEl('button', 'btn', 'TO GARAGE');
  addClasses(btnToGarage, ['btn-success', 'toGarage']);
  navigation.appendChild(btnToGarage);
  return navigation;
};

export const getGarageMenu = (): HTMLElement => {
  const menu = createHtmlEl('div', 'menu');
  menu.appendChild(getInputColon('CREATE'));
  menu.appendChild(getButtonsRaceResetGenerateCars());
  return menu;
};
