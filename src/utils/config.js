const config = {
  hue: {
    min: 0,
    max: 359,
    step: 1,
    range: 30,
  },
  saturation: {
    a: {
      min: 0,
      max: 0.05,
      step: 0.001,
    },
    b: {
      min: 0,
      max: 100,
      step: 1,
    },
    c: {
      min: 0,
      max: 100,
      step: 1,
    },
  },
  lightness: {
    min: 0,
    max: 25,
    step: 1,
    range: 30,
  },
};

export default config;
