/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/* create new tweet content */
const createTweetElement = (data) => {
  let $tweet = `
  <article class="tweet">
  <header>
  <div id="left-tweet-header">
  <img src=${data.user.avatars}> 
  <p>${data.user.name}</p >
  </div>
  <div id="handle"><b>${data.user.handle}</b></div>
  </header>
  <p><b>${escape(data.content.text)}</b></p>
      <footer>
      <div>${timeago.format(data.created_at)}</div>
      <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
      </div>
      </footer>
      </article>
      <br>
      `;
  return $tweet;
};

/* render tweet contents from database */
const renderTweets = (data) => {
  $("#tweets-container").empty();
  data.forEach((tweetData) => {
    const newTweet = createTweetElement(tweetData);
    console.log(newTweet);
    $("#tweets-container").prepend(newTweet);
  });
};

/* load all tweets from the database using renderTweets function */
const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    type: 'GET',
    datatype: 'json',
    success: (result) => {
      renderTweets(result);
    },
    error: (error) => {
      console.error('An error occured, ', error);
    }
  });
};

/* create new tweet content */
const postTweetData = () => {
  const tweetData = $('#tweet-form').serialize();
  console.log("Printing: ", tweetData);
  $.post("/tweets", tweetData).then(() => {
    loadTweets();
    /* Clear tweet data after posting a tweet */
    $('#tweet-text').val('');
  });
};

/* action after loading the page */
$(document).ready(function() {
  loadTweets();
  $("#tweet-form").on("submit", (event) => {
    event.preventDefault();

    /**Validate error */
    $(".validation").slideUp()
    if ($('#tweet-text').val().length > 140) {
      $(".validation").html('Exceeded length limit!');
      return $(".validation").slideDown();
    }
    if ($('#tweet-text').val().trim() === '' || $('#tweet-text').val().trim() === null) {
      $(".validation").html('Cannot tweet emptiness!');
      return $(".validation").slideDown();
    }

    postTweetData();
  });


  
});
