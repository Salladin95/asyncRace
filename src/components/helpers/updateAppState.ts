import { AppState } from '../controller/contracts';

export const updateAppState = <T>(data: T[], options: AppState) => {
  options.pages = Math.ceil(data.length / 10);
  options.size = data.length;
  options.page = +(localStorage.getItem(`${options.activePage}CurrentPage`) ?? '1');
};
