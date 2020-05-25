const Twit = require('twit');
require('dotenv').config();

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

function BotRetweet() {
  T.get('search/tweets', { q: 'quarentena', count: 1, result_type: 'recent' }, BotGotLatestTweet)

  function BotGotLatestTweet (error, data, response) {
    console.log(data.statuses)
    if (error) {
      console.log('Bot não pôde achar o último tweet, : ' + error);
    }
    else {
      var id = {
        id : data.statuses[0].id_str
      }

      T.post('statuses/retweet/:id', id, BotRetweeted);
      
      function BotRetweeted(error, response) {
        if (error) {
          console.log('Bot não pode retweetar, : ' + error);
        }
        else {
          console.log('Bot retweetou : ' + id.id);
        }
      }
    }
  }
}

setInterval(BotRetweet, 30*60*1000);

BotRetweet();