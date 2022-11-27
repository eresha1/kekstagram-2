import { renderPicturesList } from './pictures.js';
import { shuffle } from './util.js';

const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const [ defaultBtn ] = filtersForm.children;

const FILTER_BUTTON = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

let activeBtn = defaultBtn;

const filtersShow = () => {
  filters.classList.remove('img-filters--inactive');
};

const getUniquePictures = (pictures) => {
  const picturesCopy = pictures.slice();
  return shuffle(picturesCopy).slice(0, 10);
};

const getCommentsLength = (pictures) => pictures.slice().sort((a, b) => b.comments.length - a.comments.length);

const changeFilter = (data) => {
  let newArr = [];
  switch (activeBtn.id) {
    case FILTER_BUTTON.default:
      newArr = data;
      break;
    case FILTER_BUTTON.random:
      newArr = getUniquePictures(data);
      break;
    case FILTER_BUTTON.discussed:
      newArr = getCommentsLength(data);
      break;
  }
  renderPicturesList(newArr);
};

const initFilters = (cb) => {
  filtersForm.addEventListener('click', (evt)=> {
    if (evt.target.tagName === 'BUTTON') {
    // if (evt.target.matches('.img-filters__button')) {
      activeBtn.classList.remove('img-filters__button--active');
      activeBtn = evt.target;
      activeBtn.classList.add('img-filters__button--active');
      cb();
    }
  });
};

export { initFilters, filtersShow, changeFilter };

