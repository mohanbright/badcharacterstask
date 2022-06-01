export const responsiveWidth = (dimension, width) =>
  ((width / 375) * 100 * dimension.width) / 100;

export const responsiveHeight = (dimension, height) =>
  ((height / 812) * 100 * dimension.height) / 100;
