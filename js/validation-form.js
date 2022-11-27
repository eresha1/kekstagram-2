const uploadForm = document.querySelector('.img-upload__form');

const hashtagField = document.querySelector('.text__hashtags');

const pristine = new Pristine(
  uploadForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextClass:  'form__error',
    errorClass: 'img-upload__field-wrapper--invalid',
    // successClass: 'has-success',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div'
  },
  true
);

const MAX_HASHTAG_COUNT = 5;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const isValidTag = (tag) => VALID_HASHTAG.test(tag);
const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const getHashtags = (value) => {
  const hashtags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hashtags;
};

const validateUniqueTags = (value) => hasUniqueTags(getHashtags(value));

const validateHashtags = (value) => getHashtags(value).every(isValidTag);

const validateValidCount = (value) => hasValidCount(getHashtags(value));

pristine.addValidator(hashtagField, validateUniqueTags, 'Хештег не должен повторяться');

pristine.addValidator(hashtagField, validateHashtags, 'Хештег должен начинаться с #; не может состоять только из одной #; максимальная длина одного хэш-тега 20 символов, включая #');

pristine.addValidator(hashtagField, validateValidCount, 'Нельзя указать больше пяти хэш-тегов');

export {pristine};
