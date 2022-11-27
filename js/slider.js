const uploadForm = document.querySelector('.img-upload__form');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const levelValue = uploadForm.querySelector('.effect-level__value');
const imgPreview = uploadForm.querySelector('.img-upload__preview img');

const effectBox = uploadForm.querySelector('.img-upload__effects');
const sliderBox = uploadForm.querySelector('.effect-level');
const EFFECT_DEFAULT = 'none';

const effectsMap = {
  none: {
    filter: 'none',
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    start: 100,
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const resetEffectSlider = () => {
  sliderElement.setAttribute('disabled', true);
  imgPreview.style.filter = '';
  imgPreview.removeAttribute('class');
  sliderBox.style.display = 'none';
};


const addEffectSlider = () => {
  sliderElement.removeAttribute('disabled');
  sliderBox.style.display = 'block';
};


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  connect: 'lower',
  step: 1,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});


effectBox.addEventListener('change', (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const targetEffect = evt.target.value;

    if (targetEffect !== EFFECT_DEFAULT) {
      const { filter, min, max, step, unit = ''} = effectsMap[targetEffect];
      addEffectSlider();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: min,
          max: max,
        },
        step: step,
      });
      sliderElement.noUiSlider.set(max);

      sliderElement.noUiSlider.on('update', () => {
        levelValue.value = sliderElement.noUiSlider.get();
        imgPreview.style.filter = `${filter}(${levelValue.value}${unit})`;
      });
    } else {
      resetEffectSlider();
    }

  }
});

export { resetEffectSlider };
