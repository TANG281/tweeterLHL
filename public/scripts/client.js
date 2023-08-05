/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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
  <p><b>${data.content.text}</b></p>
      <footer>
      <div>${data.created_at}</div>
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

const renderTweets = (data) => {
  data.forEach((tweetData) => {
    const newTweet = createTweetElement(tweetData);
    console.log(newTweet);
    $("#tweets-container").prepend(newTweet);
  });
};

// const getTweetData = () => {
//   $.ajax({
//     url: '/tweets',
//     type: 'GET',
//     dataType: 'json',
//     success: (result) => {
//       console.log(result);
//       renderTweets(result);
//     },
//     error: (error) => {
//       console.error('An error occured, ', error);
//     }
//   });
// };

const postTweetData = () => {
  const tweetData = $('#tweet-form').serialize();
  console.log("Printing: ", tweetData);
  $.post("/tweets", tweetData);
};

$(document).ready(function() {
  $("#tweet-form").on("submit", (event) => {
    event.preventDefault();
    alert("We submitted the form");
    postTweetData();
  });

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

  loadTweets();
});
