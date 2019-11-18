
$(document).ready(function () {
  $('#pagepiling').pagepiling({
    anchors: ['hello', 'cool-stuff', 'about', 'contact'],
    menu: '#menu > ul',
    verticalCentered: false,
    navigation: false,
    touchSensitivity: 1
  });
});