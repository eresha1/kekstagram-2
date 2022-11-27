import {bigPictureShow } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');

const getMatchPictures = ((pictures) => {
  const onClickPicture = (evt) => {
    if(evt.target.dataset.pic === 'picture-mini') {
      const targetParent = evt.target.closest('.picture');
      const pictureById = pictures.find((picture) => picture.id === +targetParent.dataset.id);
      bigPictureShow(pictureById);
    }
  };
  picturesContainer.addEventListener('click', onClickPicture);
});

export { getMatchPictures };
