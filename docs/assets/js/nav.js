$(function() {
  logoClick();
});



function logoClick() {
  $('.PM2_logo').click(function () {
    $('body').toggleClass('close');
  });
}