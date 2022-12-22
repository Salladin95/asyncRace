export const togglePopupAppearance = (): void => {
  const outside = document.querySelector<HTMLElement>('.outside');
  const popup = document.querySelector<HTMLElement>('.popup');
  outside?.classList.toggle('show');
  popup?.classList.toggle('show');
};

export const hidePopup = (): void => {
  document.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const outside = document.querySelector<HTMLElement>('.outside');
    const popup = document.querySelector<HTMLElement>('.popup');
    if (!outside?.classList.contains('show')) {
      return;
    }
    if (!target.closest('.popup') || target.matches('.cancel') || target.matches('.popup__close')) {
      togglePopupAppearance();
      popup?.removeAttribute('data-popup-id');
    }
  });
};

export const updatePopupValues = (name: string, color: string): void => {
  const inputName = document.getElementById('car-name') as HTMLInputElement;
  const inputColor = document.getElementById('car-color') as HTMLInputElement;
  inputName.value = name;
  inputColor.value = color;
};
