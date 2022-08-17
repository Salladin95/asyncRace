import { PaginationOption } from '../../../../system/contracts';
import { addClasses, createHtmlEl } from '../../../helpers/dom';

export const getPagination = (): void => {
  const topLeft = createHtmlEl('button', 'btn-pagination', '<<');
  addClasses(topLeft, ['btn', 'btn-success']);
  topLeft.setAttribute('data-pagination', 'topLeft');

  const left = createHtmlEl('button', 'btn-pagination', '<');
  addClasses(left, ['btn', 'btn-success']);
  left.setAttribute('data-pagination', 'left');

  const right = createHtmlEl('button', 'btn-pagination', '>');
  addClasses(right, ['btn', 'btn-success']);
  right.setAttribute('data-pagination', 'right');

  const topRight = createHtmlEl('button', 'btn-pagination', '>>');
  addClasses(topRight, ['btn', 'btn-success']);
  topRight.setAttribute('data-pagination', 'topRight');

  const wrapper = document.querySelector('.pagination') as HTMLElement;
  wrapper.appendChild(topLeft);
  wrapper.appendChild(left);
  wrapper.appendChild(right);
  wrapper.appendChild(topRight);
};

export const toggleButtonsState = (page: number, lastPage: number) => {
  const toggleStateFunctions: Record<PaginationOption, () => boolean> = {
    topLeft: (): boolean => page <= 2,
    left: (): boolean => page <= 1,
    right: (): boolean => page >= lastPage,
    topRight: (): boolean => page + 1 >= lastPage,
  };

  const unaccessbleButtons = Object.keys(toggleStateFunctions)
    .filter((key) => toggleStateFunctions[key as PaginationOption]());

  const buttons = document.querySelectorAll('.btn-pagination');

  buttons.forEach((btn) => {
    const attr = btn.getAttribute('data-pagination') as PaginationOption;
    if (unaccessbleButtons.includes(attr)) {
      btn.setAttribute('disabled', 'disabled');
    } else if (btn.getAttribute('disabled')) {
      btn.removeAttribute('disabled');
    }
  });
};
