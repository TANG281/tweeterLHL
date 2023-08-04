$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    const counter = 140 - $(this).val().length;
    const selectCounter = $(this).siblings("footer").children(".counter");

    if (counter < 0) {
      selectCounter.css("color", "red");
    }

    if (counter >= 0) {
      selectCounter.css("color", "black");
    }
    
    selectCounter.html(counter);
  });


});