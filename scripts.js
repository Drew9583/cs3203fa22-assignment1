
$(function() {

    function test_print(){

        console.log('test code');

    }

   //Get 
   $('#get-button').on('click', function() {
        //get all users' IDs & display it
       $.ajax({
           url: '/tweets',  //get reference to userinfo array
           contentType: 'application/json',
           success: function (response){

               var tbodyUsers = $('#namebody');

               tbodyUsers.html('');

               response.userinfo.forEach(function(userinfo){
                   tbodyUsers.append('' +
                       '<tr><td class="id">' + userinfo.id + '</td>' +
                       '<td><input type="text" class="screen_name" value="' + userinfo.screen_name + '"></td>' +
                       '<td><input type="text" class="name" value="' + userinfo.name + '"></td>');
               });
           }
       });
    });

    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //get tweet info and display it
        $.ajax({
            url: '/tweetinfo',  //get reference to tweetinfo array
            contentType: 'application/json',
            success: function (response) {

                var tbodyTweet = $('#tweetbody');

                tbodyTweet.html('');

                response.tweetinfo.forEach(function (tweetinfo) {
                    //fills in table with given userinfo
                    tbodyTweet.append('' +
                        '<tr><td class="id">' + tweetinfo.id + '</td>' +
                        '<td><input type="text" class="text" value="' + tweetinfo.text + '"></td>' +
                        '<td><input type="text" class="created_at" value="' + tweetinfo.created_at + '"></td>');
                });
            }
        });
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //get a searched tweet(s) & display it
        $.ajax({
            url: '/searchinfo',  //get reference to searchinfo array
            contentType: 'application/json',
            success: function (response) {

                var tbodySearch = $('#searchbody');

                tbodySearch.html('');

                response.searchedinfo.forEach(function (searchedinfo) {
                    //fills in table with given tweetinfo
                    tbodySearch.append('' +
                        '<tr><td class="id">' + searchedinfo.id + '</td>' +
                        '<td><input type="text" class="text" value="' + searchedinfo.text + '"></td>' +
                        '<td><input type="text" class="created_at" value="' + searchedinfo.created_at + '"></td>');
                });
            }
        });
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();
        var createInput = $('#create-input');
        var inputString = createInput.val();

        const parsedStrings = inputString.split(';');

        //create a tweet
      $.ajax({
          url: '/tweetinfo',    //pushes a new tweet into the tweetinfo array given data
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({data: parsedStrings}),  //passes array consisting of [id, text]
          success: function (response){
              console.log(response);    ////responds with success message
              createInput.val('');
              $('#get-tweets-button').click(); //updates page with new data
          }
      });
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
    
    //search a tweet and display it.
      $.ajax({
          url: '/searchinfo',   //pushes a copy of the searched tweet into the searchinfo array
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({data: userID.val()}),   //passes a user id
          success: function (response) {
              console.log(response); //responds with success message
              userID.val('');
              $('#get-searched-tweets').click(); //updates page with new data
          }
      });
  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    //update a tweet
      $.ajax({
          url: '/tweets/',  //scans userinfo array for id match and changes username to given data
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({data: parsedStrings}), //passes array consisting of [name, screen_name]
          success: function (response){
              console.log(response);    //responds with success message
              updateInput.val('');
              $('#get-button').click(); //updates page with new data
          }
      });
  });


  //DELETE
  $("#delete-form").on('submit', function() {
      event.preventDefault();
    var id = $('#delete-input')
    var tweetid = id.val();

    //delete a tweet
      $.ajax({
          url: '/tweetinfo/',   //scans tweetinfo array for id match and deletes(splices) array index
          method: 'DELETE',
          contentType: 'application/json',
          data: JSON.stringify({data: tweetid}),    //passes a tweet id
          success: function (response){
              console.log(response);    //responds with success message
              id.val('');
              $('#get-tweets-button').click();  //updates page with new data
          }
      });
  });

});


                    
   