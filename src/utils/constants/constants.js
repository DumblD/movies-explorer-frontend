export const mobileWidthMediaQuery = window.matchMedia('(max-width: 620px)');
export const tabletWidthMediaQuery = window.matchMedia('(min-width: 620px) and (max-width: 1280px)');
export const desktopWidthMediaQuery = window.matchMedia('(min-width: 1280px)');
/* export const desktopWidthMediaQuery = window.matchMedia('(min-width: 1280px)'); */
export const errorGetMoviesRequestMessageText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const errorNotFoundMessageText = 'Ничего не найдено';
export const errorSearchTextInValidMessage = 'Корректное название фильма может содержать кириллицу или латинские символы, или цифры, пробелы, а также следующие спец. символы: %.,?!:()-';
export const errorUpdateInfoRequestMessageText = 'При обновлении данных аккаунта возникла ошибка'
export const errorLoginInfoRequestMessageText = 'При входе возникла ошибка'
export const errorRegisterInfoRequestMessageText = 'При регистрации возникла ошибка'
export const infoUpdateInfoRequestMessageText = 'Данные успешно обновлены'
export const checkSearchMoviesTextValidity = (searchText) => {
  // eslint-disable-next-line no-useless-escape
  const symbolsRegex = /^(?=[a-zа-яё0-9%\.,?!:\(\) \-]*$)(?!.*[<>'"/;`~@#$^*_+=\[\]{}|\\])/i;
  return symbolsRegex.test(searchText);
}
export const shortMovieDuration = 40;
export const searchFilterParams = [
  'nameRU',
  'nameEN',
];
export const isSearchTextValid = (searchText) => {
  const searchMovieText = searchText.trim().toLowerCase();
  const isSearchMovieTextValid = checkSearchMoviesTextValidity(searchMovieText);
  return isSearchMovieTextValid ? true : false;
}
