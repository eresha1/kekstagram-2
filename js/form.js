import { pristine } from './validation-form.js';
import {isEscKey} from './util.js';
import { showModal, closeModal, addPopupCloseHandlers, removePopupCloseHandlers } from './popup.js';
import { resetImg } from './effects.js';
import { resetEffectSlider } from './slider.js';
import { sendData } from './api.js';
import { showMessage } from './message.js';

const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const overlay = uploadForm.querySelector('.img-upload__overlay');
const closeFormBtn = uploadForm.querySelector('#upload-cancel');
const uploadFile = uploadForm.querySelector('#upload-file');

const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const blockMessage = 'Отправляю...';
const unblockMessage = 'Опубликовать';

const isTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

const onFormEscKeydown = (evt) => {
  if (isEscKey(evt) && !isTextFieldFocused()) {
    formClose();
  }
};

const onFormBtnClose = (evt) => {
  evt.preventDefault();
  formClose();
};

const onFileInputChange = (evt) => {
  evt.preventDefault();
  formOpen();
};

const resetForm = () => {
  uploadFile.value = '';
  uploadForm.reset();
  pristine.reset();
  resetImg();
  resetEffectSlider();
};

const toggleSubmitButton = (text ) => {
  submitButton.toggleAttribute ('disabled');
  submitButton.textContent = text;
};

function formOpen () {
  showModal(overlay);
  addPopupCloseHandlers(closeFormBtn, onFormBtnClose, onFormEscKeydown);
}

function formClose() {
  closeModal(overlay);
  removePopupCloseHandlers(closeFormBtn, onFormBtnClose, onFormEscKeydown);
  resetForm();
}

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      toggleSubmitButton(blockMessage);

      sendData(
        () => {
          toggleSubmitButton(unblockMessage);
          onSuccess();
          showMessage(successMessage, successButton);
        },
        () => {
          toggleSubmitButton(unblockMessage);
          showMessage(errorMessage, errorButton);
        }, new FormData(evt.target));
    }
  });
};

uploadFile.addEventListener('change', onFileInputChange);

resetForm();
setUserFormSubmit(formClose);
