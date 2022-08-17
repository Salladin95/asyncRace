import { addClasses, createHtmlEl } from '../../../helpers/dom';

const getPopupItem = (id: string, type: string): HTMLElement => {
  const wrapper = createHtmlEl('div', 'popup__item');

  const label = createHtmlEl('label') as HTMLLabelElement;
  label.innerText = `Input new ${type}`;
  label.htmlFor = id;

  const input = createHtmlEl('input') as HTMLInputElement;
  input.id = id;
  input.type = type;
  wrapper.appendChild(label);
  wrapper.appendChild(input);
  return wrapper;
};

export const getPopup = (): HTMLElement => {
  const outside = createHtmlEl('section', 'outside');
  const popup = createHtmlEl('div', 'popup');

  const close = createHtmlEl('div', 'popup__close', 'X');
  const content = createHtmlEl('div', 'popup__content');
  const title = createHtmlEl('div', 'popup__title', 'Update car');
  const firstItem = getPopupItem('car-name', 'text');
  const secondItem = getPopupItem('car-color', 'color');
  const ok = createHtmlEl('div', 'btn', 'Ok');
  addClasses(ok, ['btn-success', 'ok']);
  const cancel = createHtmlEl('div', 'btn', 'Cancel');
  addClasses(cancel, ['btn-danger', 'cancel']);

  popup.appendChild(close);
  content.appendChild(title);
  content.appendChild(firstItem);
  content.appendChild(secondItem);
  content.appendChild(ok);
  content.appendChild(cancel);
  popup.appendChild(content);
  outside.appendChild(popup);
  return outside;
};
