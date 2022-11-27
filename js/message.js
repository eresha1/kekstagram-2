import { isEscKey } from './util.js';

let activeMessage;

const onMessageCloseKeydown = (evt) => {
  if(isEscKey(evt)) {
    // evt.stopImmediatePropagation();
    evt.stopPropagation();
    closeMessage();
  }
};

const onMessageCloseClick = (evt) => {
  if (evt.target === activeMessage) {
    closeMessage();
  }
};

function closeMessage() {
  activeMessage.remove();
  document.removeEventListener('keydown', onMessageCloseKeydown, true);
  document.removeEventListener('click',onMessageCloseClick);
}

const showMessage = (message, messageButton) => {
  activeMessage = message;
  document.body.append(activeMessage);
  messageButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onMessageCloseKeydown, true);
  document.addEventListener('click', onMessageCloseClick);
};

export { showMessage };
