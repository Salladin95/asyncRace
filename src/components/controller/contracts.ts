export type ActivePageOption = 'garage' | 'winners';

export type SortOption = 'wins' | 'winsReverse' | 'time' | 'timeReverse';

export type AppState = {
  page: number,
  pages: number,
  size: number,
  activePage: ActivePageOption,
  sort: SortOption,
}
