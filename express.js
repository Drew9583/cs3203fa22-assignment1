var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = [];
var userinfo = [];
var searchedinfo = [];


//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //store loaded data into a global variable for tweet data
    const info = JSON.parse(data);

    info.forEach(function (info) { //stores an id for the user rather than nesting a user array into it
      tweetinfo.push({
        id: info.id_str,
        userid: info.user.id_str,
        created_at: info.created_at,
        text: info.text,
      });
      userinfo.push({
        id: info.user.id,
        name: info.user.name,
        screen_name: info.user.screen_name,
      });
    });
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //send all users' IDs
  res.send({userinfo: userinfo});
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //send tweet info
  res.send({tweetinfo: tweetinfo});
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //send searched tweets
  res.send({searchedinfo: searchedinfo})
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //create a tweet.
  var tweetData = req.body.data;  //gets array containing [id, text]

  if(tweetData[0] !== '' && tweetData[1] !== '') {  //check for blank submissions
    tweetinfo.push({
      id: tweetData[0],
      text: tweetData[1],
      created_at: Date(),
    });
    res.send('Successfully created tweet');
  }else{
    res.send('You entered nothing');
  }
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //search a tweet
  var searchID = req.body.data;   //gets user id

  if (searchID !== '') {  //check for blank submissions
    tweetinfo.forEach(function (tweetinfo) {
      if (tweetinfo.userid === searchID) { //essentially copying array
        searchedinfo.push({
          id: tweetinfo.id,
          userid: tweetinfo.userid,
          text: tweetinfo.text,
          created_at: tweetinfo.created_at,
        });
      }
    });
    res.send('Successfully searched for tweet');
  }else {
    res.send('You entered nothing');
  }
});

//Update
app.put('/tweets/', function(req, res) {
  //update tweets
  var  searchName = req.body.data; //gets array containing [name, screen_name]

  if(searchName[0] !== '' && searchName[1] !== '') {  //check for blank submissions
    userinfo.forEach(function (userinfo) {
      if (userinfo.name === searchName[0]) {
        userinfo.screen_name = searchName[1];
      }
    });
    res.send('Successfully updated name');
  }else{
    res.send('You entered nothing');
  }
});

//Delete 
app.delete('/tweetinfo/', function(req, res) {
  //delete a tweet
  var  searchID = req.body.data;  //gets tweet id

  if(searchID !== '') { //check for blank submissions
    tweetinfo.forEach(function (tweet, index) {
      if (tweet.id === searchID) {
        tweetinfo.splice(index, 1);
      }
    });
    res.send('Successfully deleted tweet');
  }else {
    res.send('You entered nothing');
  }
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});