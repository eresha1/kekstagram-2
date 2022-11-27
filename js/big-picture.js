import {isEscKey} from './util.js';
import { showModal, closeModal, addPopupCloseHandlers, removePopupCloseHandlers } from './popup.js';
import { createStartComments, updateCommentLoaderBtn } from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancelBtn = bigPicture.querySelector('.big-picture__cancel');

const createBigPicture = (picture) => {
  const {url, likes, comments, description } = picture;
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  createStartComments(comments);
  updateCommentLoaderBtn(comments);
};


const onBigPictureEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    bigPictureClose();
  }
};

const onBigPictureBtnClose = (evt) => {
  evt.preventDefault();
  bigPictureClose();
};


function bigPictureShow (picture) {
  showModal(bigPicture);
  addPopupCloseHandlers(bigPictureCancelBtn, onBigPictureBtnClose, onBigPictureEscKeydown );
  createBigPicture(picture);
}

function bigPictureClose() {
  closeModal(bigPicture);
  removePopupCloseHandlers(bigPictureCancelBtn, onBigPictureBtnClose, onBigPictureEscKeydown);
}

export { bigPictureShow };
