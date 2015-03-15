/*
  Name: slick-video
  Version: 0.1.0
  Author: Paweł Łaski <plaski@raffine.eu>
*/

/* global window, document, define, jQuery */

(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
      module.exports = factory(require('jquery'));
  } else {
      factory(jQuery);
  }
}(function($) {
  var tmpSlick = $.fn.slick;
  // Overwrite slick function.
  $.fn.slick = function () {
    // Init all video on first slide. 
    // Overwrite slick.[swipeStart, swipeEnd] and add handler for event 'beforeChange' 
    $(this).on('init', function(event, slick) {
      // Play first slide all videos.
      $(slick.$slides[slick.currentSlide]).find('video').each(function(){
        this.play();
      });
      // Pause all videos when swipe start on current slide.
      var oldSwipeStart = slick.swipeStart.bind(slick);
      slick.swipeStart = function(event) {
        $(this.$slides[this.currentSlide]).find('video').each(function(){
          this.pause();
        });
        oldSwipeStart(event);
      };
      // Play all videos when swipe end on current slide.
      var oldSwipeEnd = slick.swipeEnd.bind(slick);
      slick.swipeEnd = function(event) {
        oldSwipeEnd(event);
        $(this.$slides[this.currentSlide]).find('video').each(function(){
          this.play();
        });
      };
    });
    // Pause all videos on current slide and play all videos on next slide.
    $(this).on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $(slick.$slides[currentSlide]).find('video').each(function(){
        this.pause();
      });
      $(slick.$slides[nextSlide]).find('video').each(function(){
        this.play();
      });
    });
    // Return called slick on this object.
    return (tmpSlick.bind(this))(arguments[0]);
  };
}));
