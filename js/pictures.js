import { getMatchPictures } from './match-pictures.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const renderPicture = ({url, likes, comments, id}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImgElement = pictureElement.querySelector('.picture__img');
  pictureImgElement.src = url;
  pictureImgElement.dataset.pic = 'picture-mini';
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.id = id;
  // pictureElement.addEventListener('click', () => bigPictureShow(picture)); //второй способ соответствия открытия большой картинки

  return pictureElement;
};
const clearPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  if (pictures.length > 0) {
    pictures.forEach((picture) => picture.remove());
  }
};


const renderPicturesList = (pictures) => {
  clearPictures();
  const listFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    listFragment.append(renderPicture(picture));
  });
  picturesContainer.append(listFragment);

  getMatchPictures(pictures);
};


export {renderPicturesList};


