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

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(function() {
  renderTweets(data);

});
