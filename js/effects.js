const effectBox = document.querySelector('.img-upload__effects');
const effectTargetImg = document.querySelector('.img-upload__preview img');
const btnBigger = document.querySelector('.scale__control--bigger');
const btnSmaller = document.querySelector('.scale__control--smaller');
const controlScale = document.querySelector('.scale__control--value');

const size = {
  min: 25,
  max: 100,
  step: 25,
  default: 100,
};

const onFilterChange = (evt) => {
  effectTargetImg.removeAttribute('class');
  if (evt.target.matches('input[type="radio"]')) {
    effectTargetImg.classList.add(`effects__preview--${evt.target.value}`);
  }
};

const scaleImg = (value = size.default) => {
  effectTargetImg.style = `transform: scale(${value * 0.01})`;
  controlScale.value = `${value}%`;
};

const resizeImg = (sign) => {
  let newValue = parseInt(controlScale.value, 10);
  newValue = newValue + size.step * sign;
  if (newValue >= size.max) {
    newValue = size.max;
  } else if (newValue <= size.min) {
    newValue = size.min;
  }
  scaleImg(newValue);
};

const resetImg = () => {
  scaleImg();
};

const onBtnBiggerClick = function () {
  resizeImg(1);
};

const onBtnSmallerClick = function () {
  resizeImg(-1);
};

effectBox.addEventListener('change', onFilterChange);
btnBigger.addEventListener('click', onBtnBiggerClick);
btnSmaller.addEventListener('click', onBtnSmallerClick);

export { resetImg};
