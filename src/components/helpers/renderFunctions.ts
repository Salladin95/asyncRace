export const createHtmlEl = (
  elName: string,
  className?: string,
  innxerText?: string,
): HTMLElement => {
  const el = document.createElement(elName);
  if (className) {
    el.classList.add(className);
  }
  if (innxerText) {
    el.innerHTML = innxerText;
  }
  return el;
};

export const addClasses = (
  el: HTMLElement,
  classNames: string[],
): void => {
  classNames.forEach((className) => el.classList.add(className));
};
