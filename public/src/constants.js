define(['modules/browserWindow'], function (browserWindow) {
  return {
    WIDTH: 10000,
    HEIGHT: 1000,
    WINDOW_WIDTH: browserWindow.outerWidth,
    WINDOW_HEIGHT: browserWindow.innerHeight,
    GRAVITY: 200
  }
})
