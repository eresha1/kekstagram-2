import { getData } from './api.js';
import {showAlert, debounce } from './util.js';
import { filtersShow, initFilters, changeFilter } from './filters.js';
import { renderPicturesList } from './pictures.js';

getData((pictures) => {
  renderPicturesList(pictures);
  filtersShow();
  initFilters(debounce(() => changeFilter(pictures)));
}, showAlert);
