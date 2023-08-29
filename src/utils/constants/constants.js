export const mobileWidthMediaQuery = window.matchMedia('(max-width: 620px)');
export const tabletWidthMediaQuery = window.matchMedia('(min-width: 620px) and (max-width: 1280px)');
export const desktopWidthMediaQuery = window.matchMedia('(min-width: 1280px)');
export const errorGetMoviesRequestMessageText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const errorNotFoundMessageText = 'Ничего не найдено';
export const errorEmptyMessageText = 'Нужно ввести ключевое слово';
export const errorNotFoundOrEmpty = 'Пока нет сохраненных фильмов или во время запроса произошла ошибка.';
export const errorSearchTextInValidMessage = 'Корректное название фильма может содержать кириллицу или латинские символы, или цифры, пробелы, а также следующие спец. символы: %.,?!:()-';
export const errorUpdateInfoRequestMessageText = 'При обновлении данных аккаунта возникла ошибка'
export const errorLoginInfoRequestMessageText = 'При входе возникла ошибка'
export const errorRegisterInfoRequestMessageText = 'При регистрации возникла ошибка'
export const infoUpdateInfoRequestMessageText = 'Данные успешно обновлены'
export const checkSearchMoviesTextValidity = (searchText) => {
  // eslint-disable-next-line no-useless-escape
  const symbolsInvalidSearchTextRegex = /^(?=[a-zа-яё0-9%\.,?!:\(\) \-]*$)(?!.*[<>'"/;`~@#$^*_+=\[\]{}|\\])/i;
  return symbolsInvalidSearchTextRegex.test(searchText);
}
export const checkSearchMoviesTextIsEmpty = (searchText) => {
  // eslint-disable-next-line no-useless-escape
  const symbolsEmptySearchTextRegex = /^$/;
  return symbolsEmptySearchTextRegex.test(searchText);
}
export const defaultCardsNumRenderForMovies = 5;
export const defaultNumOfExtraCards = 0;
export const defaultArrayLength = 0;
export const numOfExtraCardsForMobiles = 2;
export const numOfExtraCardsForTablets = 2;
export const numOfExtraCardsForDesktop = 3;
export const cardsNumRenderForMobiles = 5;
export const cardsNumRenderForTablets = 8;
export const cardsNumRenderForDesktop = 12;
export const defaultValueLastNumCardsRenderForStorage = 'noSearch';
export const previewPage = -1;
const shortMovieDuration = 40;
const searchFilterParams = [
  'nameRU',
  'nameEN',
];
export const isSearchTextValid = (searchText) => {
  const searchMovieText = searchText.trim().toLowerCase();
  const isSearchMovieTextValid = checkSearchMoviesTextValidity(searchMovieText);
  return isSearchMovieTextValid ? true : false;
}

export const isSearchTextEmpty = (searchText) => {
  const searchMovieText = searchText.trim().toLowerCase();
  const isSearchMovieTextIsEmpty = checkSearchMoviesTextIsEmpty(searchMovieText);
  return isSearchMovieTextIsEmpty ? true : false;
}

export const sortMovieDataAddLike = (movie, ownId) => {
  const urlPrefix = `https://api.nomoreparties.co`;
  const {
    id,
    nameRU,
    nameEN,
    director,
    country,
    year,
    duration,
    description,
    trailerLink,
    image,
  } = movie;
  return {
    movieId: id,
    nameRU: nameRU,
    nameEN: nameEN,
    director: director,
    country: country,
    year: year,
    duration: duration,
    description: description,
    trailerLink: trailerLink,
    image: `${urlPrefix}${image.url}`,
    thumbnail: `${urlPrefix}${image.formats.thumbnail.url}`,
    owner: ownId,
  }
}
const amountMinutesInhour = 60;
export const minToHourMin = (min) => {
  let res;
  if (min % amountMinutesInhour === min) {
    res = `0ч ${min}м`;
  } else if (min % amountMinutesInhour === 0) {
    res = `${min / amountMinutesInhour}ч ${0}м`;
  } else {
    res = `${Math.trunc(min / amountMinutesInhour)}ч ${min % amountMinutesInhour}м`;
  }
  return res;
}

export const isInputErrorsNotEmpty = (errors) => {
  const errorsValues = Object.values(errors);
  const isNotEmpty = errorsValues.some((el) => {
    return el !== "";
  });
  return isNotEmpty;
}

export const filterByText = (moviesList, searchText) => {
  const textFilteredMoviesList = moviesList.map((cardElement) => {
    const isInclude = searchFilterParams.some((param) => {
      return cardElement[param].toLowerCase().includes(searchText.toLowerCase());
    });
    return isInclude ? cardElement : null;
  }).filter((el) => {
    return el !== null;
  });
  return textFilteredMoviesList;
}

export const filterByDuration = (moviesList) => {
  const shortFiltered = moviesList.filter((cardElement) => {
    return cardElement.duration <= shortMovieDuration;
  });
  return shortFiltered;
}

export const getFilteredItems = (moviesList, numCardsToRender) => {
  const filteredMovies = moviesList.filter((card, index) => {
    return index < numCardsToRender;
  });
  return filteredMovies;
}

export const filterMovies = (movies, searchText, isShort, setValues) => {
  let filtered = [];
  if (!searchText) {
    movies.forEach((el) => {
      return filtered.push(el);
    })
  }
  if (movies.length) {
    const textFiltered = filterByText(movies, searchText);
    if (textFiltered.length) {
      if (isShort && searchText) {
        const durationFiltered = filterByDuration(textFiltered);
        durationFiltered.forEach((el) => {
          filtered.push(el);
        });
      } else if (!isShort && searchText) {
        textFiltered.forEach((el) => {
          filtered.push(el);
        });
      } else if (isShort && !searchText) {
        movies.forEach((el) => {
          return filtered.push(el);
        })
      }
    } else {
      filtered = [];
    }
    setValues(filtered);
  } else {
    movies.forEach((el) => {
      return filtered.push(el);
    })
  }
}
