"use strict";
$(function() {
  $('.hero_slider').on('init', function(event, slick) {
    var currentVideos = slick.$slides[slick.currentSlide].querySelectorAll('video');
    $.each(currentVideos, function(){
      this.play();
    });
    var oldSwipeStart = slick.swipeStart.bind(slick);
    slick.swipeStart = function(event) {
      var currentVideos = this.$slides[this.currentSlide].querySelectorAll('video');
      $.each(currentVideos, function(){
        this.pause();
      });
      oldSwipeStart(event);
    };
    var oldSwipeEnd = slick.swipeEnd.bind(slick);
    slick.swipeEnd = function(event) {
      oldSwipeEnd(event);
      var currentVideos = this.$slides[this.currentSlide].querySelectorAll('video');
      $.each(currentVideos, function(){
        this.play();
      });
    }
  });
  $('.hero_slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var currentVideos = slick.$slides[currentSlide].querySelectorAll('video');
    var nextVideos = slick.$slides[nextSlide].querySelectorAll('video');
    $.each(currentVideos, function(){
      this.pause();
    });
    $.each(nextVideos, function(){
      this.play();
    });
    
  });
  $('.hero_slider').slick({
    arrows: false,
    dots: true,
    customPaging: function() {
      return '<span nav-item data-role="none"></span>';
    }
  });
});