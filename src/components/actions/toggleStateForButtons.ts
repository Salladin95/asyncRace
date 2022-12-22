type AttributeOption = 'select' | 'remove' | 'start' | 'stop';

export const blockTrackButtnos = (target: HTMLElement, exception = ''): void => {
  const track = target.closest('.track');

  const setAttributeFunctions: Record<AttributeOption, () => void> = {
    select: (): void => track?.querySelector('.select')?.setAttribute('disabled', 'disabled'),
    remove: (): void => track?.querySelector('.remove')?.setAttribute('disabled', 'disabled'),
    start: (): void => track?.querySelector('.start')?.setAttribute('disabled', 'disabled'),
    stop: (): void => track?.querySelector('.stop')?.setAttribute('disabled', 'disabled'),
  };

  const availableFunctions = Object.keys(setAttributeFunctions)
    .filter((selecotor) => selecotor !== exception)
    .map((key) => setAttributeFunctions[key as AttributeOption]);
  availableFunctions.forEach((fn) => fn());
};

export const unblockTrackButtnos = (target: HTMLElement, exception = ''): void => {
  const track = target.closest('.track');
  const removeAttributeFunctions: Record<AttributeOption, () => void> = {
    select: (): void => track?.querySelector('.select')?.removeAttribute('disabled'),
    remove: (): void => track?.querySelector('.remove')?.removeAttribute('disabled'),
    start: (): void => track?.querySelector('.start')?.removeAttribute('disabled'),
    stop: (): void => track?.querySelector('.stop')?.removeAttribute('disabled'),
  };

  const availableFunctions = Object.keys(removeAttributeFunctions)
    .filter((selecotor) => selecotor !== exception)
    .map((key) => removeAttributeFunctions[key as AttributeOption]);
  availableFunctions.forEach((fn) => fn());
};

export const blockMenuButtons = () => {
  const buttonsNav = document.querySelector('.navigation')?.querySelectorAll('.btn');
  const buttonsMenu = document.querySelector('.menu')?.querySelectorAll('.btn');
  buttonsNav?.forEach((btn) => {
    btn.setAttribute('disabled', 'disabled');
  });
  buttonsMenu?.forEach((btn) => {
    btn.setAttribute('disabled', 'disabled');
  });
};

export const unblockMenuButtons = (exception?: string) => {
  const buttonsNav = document.querySelector('.navigation')?.querySelectorAll('.btn');
  const buttonsMenu = document.querySelector('.menu')?.querySelectorAll('.btn');
  buttonsNav?.forEach((btn) => {
    if (!btn.matches(`.${exception}`)) {
      btn.removeAttribute('disabled');
    }
  });
  buttonsMenu?.forEach((btn) => {
    if (!btn.matches(`.${exception}`)) {
      btn.removeAttribute('disabled');
    }
  });
};
