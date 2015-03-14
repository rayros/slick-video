$(function(){
  $('.hero_slider').slick({
    arrows: false,
    dots: true,
    customPaging: function() {
      return '<span nav-item data-role="none"></span>';
    }
  });
});